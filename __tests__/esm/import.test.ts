import { bundleImport } from "#dist/index.mjs";
import { join } from "node:path";
import { describe, it } from "vitest";

describe(bundleImport.name + "in ESM Module", () => {
	it("should work with `export const greet`", async ({ expect }) => {
		const filepath = "./__tests__/esm/fixtures/namedExport.mjs";
		const { mod, dependencies } = await bundleImport<{ greet: string }>({ filepath });
		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("__tests__/esm/fixtures/namedExport.mjs");
	});

	it("should work with cwd", async ({ expect }) => {
		const filepath = "./fixtures/namedExport.mjs";
		const { mod, dependencies } = await bundleImport<{ greet: string }>({
			filepath,
			cwd: join(process.cwd(), "./__tests__/esm/"),
		});

		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("fixtures/namedExport.mjs");
	});

	it("should work with import.meta.url", async ({ expect }) => {
		const filepath = "./__tests__/esm/fixtures/namedExport.mjs";
		const { mod } = await bundleImport<{ metaURL: string }>({ filepath });
		expect(mod.metaURL).toMatch("namedExport.mjs");
	});
});
