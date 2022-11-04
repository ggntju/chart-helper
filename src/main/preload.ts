import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
const fs = require('fs');

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openExportLocation: () => ipcRenderer.invoke('dialog:openExportLocation'),
  showFileMissingErrorBox: () => ipcRenderer.invoke('dialog:fileMissingError'),
  showInvalidInputErrorBox: () => ipcRenderer.invoke('dialog:invalidInputError'),
});

contextBridge.exposeInMainWorld('electronFS', {
  readFileSync: (path: string) => fs.readFileSync(path, {encoding:'utf8', flag:'r'}),
  writeFileSync: (path: string, data: any) => fs.writeFileSync(path, data),
  existsSync: (path: string) => fs.existsSync(path),
  createReadStream: (path: string) => fs.createReadStream(path),
  // Other fs methods here
});
