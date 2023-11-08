import { resolveOptions } from "#src";
import { describe, it } from "vitest";

describe(resolveOptions.name, () => {
	it(`${resolveOptions.name} - default options`, async ({ expect }) => {
		const resolved = resolveOptions({ filepath: "index.js" });
		expect(resolved.filepath).toBe("index.js");
		expect(resolved.esbuildOptions).toBeUndefined();
		expect(resolved.format).toBe("esm");
		expect(resolved.cwd).toMatch("bundle-import");
	});

	it(`${resolveOptions.name} - filepath option`, async ({ expect }) => {
		const resolved = resolveOptions({ filepath: "index.js" });
		expect(resolved.format).toBe("esm");
		const resolved1 = resolveOptions({ filepath: "index.cjs" });
		expect(resolved1.format).toBe("cjs");
		const resolved2 = resolveOptions({ filepath: "index.mjs" });
		expect(resolved2.format).toBe("esm");
		const resolved3 = resolveOptions({ filepath: "index.mts" });
		expect(resolved3.format).toBe("esm");
		const resolved4 = resolveOptions({ filepath: "index.cts" });
		expect(resolved4.format).toBe("cjs");
	});

	it(`${resolveOptions.name} - cwd option`, async ({ expect }) => {
		const resolved = resolveOptions({ filepath: "index.js", cwd: "xxx" });
		expect(resolved.cwd).toMatch("xxx");
	});

	it(`${resolveOptions.name} - format option`, async ({ expect }) => {
		const resolved = resolveOptions({ filepath: "index.js", format: "cjs" });
		expect(resolved.format).toBe("cjs");
		const resolved1 = resolveOptions({ filepath: "index.cjs", format: "cjs" });
		expect(resolved1.format).toBe("cjs");
		const resolved2 = resolveOptions({ filepath: "index.mjs", format: "cjs" });
		expect(resolved2.format).toBe("cjs");
	});
});
