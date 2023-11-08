import { join } from "node:path";
import { describe, it } from "vitest";

const { bundleImport } = require("#dist/index.cjs");

describe(bundleImport.name + "in ESM Module", () => {
	it("should work with `export const greet`", async ({ expect }) => {
		const filepath = "./__tests__/esm/fixtures/namedExport.mjs";
		const { mod, dependencies } = await bundleImport({ filepath });
		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("__tests__/esm/fixtures/namedExport.mjs");
	});
	it("should work with cwd", async ({ expect }) => {
		const filepath = "./fixtures/namedExport.mjs";
		const { mod, dependencies } = await bundleImport({
			filepath,
			cwd: join(process.cwd(), "./__tests__/esm/"),
		});
		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("fixtures/namedExport.mjs");
	});
});
