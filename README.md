# Bundle-import

[![NPM version](https://img.shields.io/npm/v/bundle-import)](https://www.npmjs.com/package/bundle-import)
[![Downloads](https://img.shields.io/npm/dw/bundle-import)](https://www.npmjs.com/package/bundle-import)
[![License](https://img.shields.io/npm/l/bundle-import)](https://github.com/condorheroblog/bundle-import/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/condorheroblog/bundle-import)](https://github.com/condorheroblog/bundle-import/blob/main/packages/bundle-import)

Bundle and load a file using the import-from-string.

## Difference from bundle-require

Most of the code of Bundle-import comes from bundle-require. There is no objection to this, but Bundle-import does not generate temporary files when reading module contents, which can avoid conflicts with other tools. For example, the following two issues:

1. [Tmp .mjs file in the current directory breaks other tools](https://github.com/egoist/bundle-require/issues/33)
2. [vite 运行时，修改mock文件会生成很多个xxx.mjs文件](https://github.com/vbenjs/vite-plugin-mock/issues/98#issuecomment-1782467433)

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

const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: `${process.cwd()}/playground` });
console.log(mod1);

const { mod: mod2 } = await bundleImport({ filepath: "./playground/fixtures/index.mjs" });
console.log(mod2.default, mod2);
```

### CJS

```cjs
const { bundleImport } = require("bundle-import");

async function main() {
	const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: `${process.cwd()}/playground` });
	console.log(mod1);

	const { mod: mod2 } = await bundleImport({ filepath: "./playground/fixtures/index.mjs" });
	console.log(mod2.default, mod2);
}

main();
```

## API

### bundleImport(options)

#### options

##### cwd

Type: `string`\
Default: `process.cwd()`

Project root directory.

##### filename

Type: `string`\
Required: `true`

The filepath to bundle and require.

##### external

Type: `(string | RegExp)[]`\
Required: `[]`

External packages.

##### tsconfig

Type: `string`\
Required: `tsconfig.json`

A custom tsconfig path to read `paths` option.

##### format

Type: `"cjs" | "esm"`\

Provide bundle format explicitly to skip the default format inference.

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
