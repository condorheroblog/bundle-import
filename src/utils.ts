import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";

export const getPkgType = (): string | undefined => {
	try {
		const pkg = JSON.parse(readFileSync(resolve("package.json"), "utf-8"));
		return pkg.type;
	} catch (error) {}
};

export function guessFormat(inputFile: string, type = getPkgType()) {
	const ext = extname(inputFile);
	if (ext === ".js") {
		return type === "module" ? "esm" : "cjs";
	} else if (ext === ".ts" || ext === ".mts" || ext === ".mjs") {
		return "esm";
	}
	return "cjs";
}
