import { JS_EXT_RE } from "#src";
import { describe, it } from "vitest";

describe("constants", () => {
	it("should match valid file extensions", async ({ expect }) => {
		expect(JS_EXT_RE.test(".js")).toBeTruthy();
		expect(JS_EXT_RE.test(".cjs")).toBeTruthy();
		expect(JS_EXT_RE.test(".jsx")).toBeTruthy();
		expect(JS_EXT_RE.test(".ts")).toBeTruthy();
		expect(JS_EXT_RE.test(".tsx")).toBeTruthy();
		expect(JS_EXT_RE.test(".mjs")).toBeTruthy();
		expect(JS_EXT_RE.test(".cts")).toBeTruthy();
		expect(JS_EXT_RE.test(".mts")).toBeTruthy();
	});

	it("should not match valid file extensions", async ({ expect }) => {
		expect(JS_EXT_RE.test(".mjsx")).toBeFalsy();
		expect(JS_EXT_RE.test(".cjsx")).toBeFalsy();
		expect(JS_EXT_RE.test(".jtsx")).toBeFalsy();
		expect(JS_EXT_RE.test(".txt")).toBeFalsy();
		expect(JS_EXT_RE.test(".html")).toBeFalsy();
		expect(JS_EXT_RE.test(".jts")).toBeFalsy();
	});
});
