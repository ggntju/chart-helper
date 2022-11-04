import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };

    electronAPI: {
      openFile(): string;
      openExportLocation(): string;
      showFileMissingErrorBox(): void;
      showInvalidInputErrorBox(): void;
    };

    electronFS: {
      readFileSync(path: string): any;
      writeFileSync(path: string, data: any): any;
      existsSync(path: string): any;
      createReadStream(path: string): any;
    }
  }
}

export {};
