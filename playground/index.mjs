import { bundleImport } from "#src";

const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: process.cwd() + "/playground" });
console.log(mod1);

const { mod: mod2 } = await bundleImport({ filepath: "./playground/fixtures/index.mjs" });
console.log(mod2.default, mod2);
