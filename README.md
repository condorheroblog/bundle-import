# Bundle-import

[![NPM version](https://img.shields.io/npm/v/bundle-import)](https://www.npmjs.com/package/bundle-import)
[![Downloads](https://img.shields.io/npm/dw/bundle-import)](https://www.npmjs.com/package/bundle-import)
[![License](https://img.shields.io/npm/l/bundle-import)](https://github.com/condorheroblog/bundle-import/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/bundle-import)](https://github.com/condorheroblog/bundle-import/blob/main/packages/bundle-import)

Bundle and load a file using the import-from-string.

## Features

- Support ESM and CJS environments
- Support dynamic import
- Support `import.meta.url`
- Support access to global variables
- No asynchronous IO operations
- No module cache

## Install

```bash
npm install bundle-import
```

## Usage

### ESM

```mjs
import { bundleImport } from "bundle-import";

const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: process.cwd() + "/playground" });
console.log(mod1);

const { mod: mod2 } = await bundleImport({ filepath: "./playground/fixtures/index.mjs" });
console.log(mod2.default, mod2);
```

### CJS

```cjs
const { bundleImport } = require("bundle-import");

async function main() {
	const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: process.cwd() + "/playground" });
	console.log(mod1);

	const { mod: mod2 } = await bundleImport({ filepath: "./playground/fixtures/index.mjs" });
	console.log(mod2.default, mod2);
}

main();
```

## API

### bundleImport(options)

#### options

##### filename

Type: `string`\
Required: `true`

The filepath to bundle and require.

##### esbuildOptions

Type: `BuildOptions`\
Required: `false`

esbuild options.

## Appreciation

- [import-from-string](https://github.com/condorheroblog/import-from-string)
- [bundle-require](https://github.com/egoist/bundle-require)
- [module-from-string](https://github.com/exuanbo/module-from-string)
- [require-from-string](https://github.com/floatdrop/require-from-string)

## License

[MIT](https://github.com/condorheroblog/bundle-import/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
