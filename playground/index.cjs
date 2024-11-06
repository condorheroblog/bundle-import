const { bundleImport } = require("#src");
const process = require("node:process");

async function main() {
	// eslint-disable-next-line no-console
	console.log(await bundleImport({ filepath: "./fixtures/index.cjs", cwd: `${process.cwd()}/playground` }));
	// eslint-disable-next-line no-console
	console.log(await bundleImport({ filepath: "./playground/fixtures/index.mjs" }));
}

main();
