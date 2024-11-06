import { join } from "node:path";
import { describe, it } from "vitest";

const { bundleImport } = require("#dist/index.cjs");

describe(`${bundleImport.name}in CJS Module`, () => {
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

	it("should work with __dirname", async ({ expect }) => {
		const filepath = "./__tests__/cjs/fixtures/namedExport.cjs";
		const { mod } = await bundleImport({ filepath });

		expect(mod.__dirname__).toBe(`${__dirname}/fixtures`);
	});

	it("should work with __filename", async ({ expect }) => {
		const filepath = "./__tests__/cjs/fixtures/namedExport.cjs";
		const { mod } = await bundleImport({ filepath });

		expect(mod.__filename__).toBe(`${__dirname}/fixtures/namedExport.cjs`);
	});

	it("should work with tsconfig", async ({ expect }) => {
		const filepath = "./fixtures/tsconfig.cjs";
		const { mod } = await bundleImport({ filepath, cwd: __dirname });

		expect(mod.alias).toBe("Hi Alias");
	});
});
