const { bundleImport } = require("#src");

async function main() {
	console.log(await bundleImport({ filepath: "./fixtures/index.cjs", cwd: process.cwd() + "/playground" }));
	console.log(await bundleImport({ filepath: "./playground/fixtures/index.mjs" }));
}

main();
