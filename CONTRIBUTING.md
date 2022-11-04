### Setup Environment

You will need a recent version of [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

```
npm cache clear --force // this is optional
npm install
```

### Run from Source Code

After a successful installtion, all of the development dependencies should be ready to work. Then you can type the following command to run a dev version of this app with a developer tool on the right hand side.

```
npm run start
```

### Build Distributable Package

```
npm run package
```

### Code Structure

- `assets` folder contains some icons and images
- `examples` folder contains example data format files
- `release/app` folder contains configurations for release package
- `src/pages` folder contains most parts for this app
- `src/main` and `src/renderer` basically Electron settings
