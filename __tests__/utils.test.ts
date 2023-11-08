import { getPkgType, guessFormat } from "#src";
import { describe, it } from "vitest";

describe(getPkgType.name, () => {
	it(`${getPkgType.name} - module`, async ({ expect }) => {
		expect(getPkgType()).toBe("module");
	});
});

describe(guessFormat.name, () => {
	it(`${guessFormat.name} - js file is esm`, async ({ expect }) => {
		expect(guessFormat("index.js")).toBe("esm");
		expect(guessFormat("index.js", "module")).toBe("esm");
	});

	it(`${guessFormat.name} - js file is cjs`, async ({ expect }) => {
		expect(guessFormat("index.js", "commonjs")).toBe("cjs");
	});

	it(`${guessFormat.name} - ts,mts,mjs file is esm`, async ({ expect }) => {
		expect(guessFormat("index.ts", "commonjs")).toBe("esm");
		expect(guessFormat("index.mts", "commonjs")).toBe("esm");
		expect(guessFormat("index.mjs", "commonjs")).toBe("esm");
		expect(guessFormat("index.ts", "module")).toBe("esm");
		expect(guessFormat("index.mts", "module")).toBe("esm");
		expect(guessFormat("index.mjs", "module")).toBe("esm");
	});

	it(`${guessFormat.name} - other file is cjs`, async ({ expect }) => {
		expect(guessFormat("index.cjs", "commonjs")).toBe("cjs");
		expect(guessFormat("index.cts", "commonjs")).toBe("cjs");
		expect(guessFormat("index.json", "commonjs")).toBe("cjs");
		expect(guessFormat("index.text", "module")).toBe("cjs");
		expect(guessFormat("index.cjs", "module")).toBe("cjs");
		expect(guessFormat("index.cts", "module")).toBe("cjs");
		expect(guessFormat("index.json", "module")).toBe("cjs");
		expect(guessFormat("index.text", "module")).toBe("cjs");
	});
});
