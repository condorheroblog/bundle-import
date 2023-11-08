import { join } from "node:path";
import { describe, it } from "vitest";

const { bundleImport } = require("#dist/index.cjs");

describe(bundleImport.name + "in CJS Module", () => {
	it("should work with `exports.greet`", async ({ expect }) => {
		const filepath = "./__tests__/cjs/fixtures/namedExport.cjs";
		const { mod, dependencies } = await bundleImport({ filepath });

		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("__tests__/cjs/fixtures/namedExport.cjs");
	});

	it("should work with cwd", async ({ expect }) => {
		const filepath = "./fixtures/namedExport.cjs";
		const { mod, dependencies } = await bundleImport({
			filepath,
			cwd: join(process.cwd(), "./__tests__/cjs/"),
		});

		expect(mod.greet).toBe("hi");
		expect(Object.keys(dependencies)[0]).toBe("fixtures/namedExport.cjs");
	});
});
