import process from "node:process";
import { bundleImport } from "#src";

//  eslint-disable-next-line antfu/no-top-level-await
const { mod: mod1 } = await bundleImport({ filepath: "./fixtures/index.cjs", cwd: `${process.cwd()}/playground` });
// eslint-disable-next-line no-console
console.log(mod1);

//  eslint-disable-next-line antfu/no-top-level-await
const { mod: mod2 } = await bundleImport({
	filepath: "./fixtures/index.mjs",
	cwd: `${process.cwd()}/playground`,
});
// eslint-disable-next-line no-console
console.log(mod2.default, mod2);
