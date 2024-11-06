import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";

export function getPkgType(): string | undefined {
	try {
		const pkg = JSON.parse(readFileSync(resolve("package.json"), "utf-8"));
		return pkg.type;
	}
	catch {}
}

export function guessFormat(inputFile: string, type = getPkgType()) {
	const ext = extname(inputFile);
	if (ext === ".js") {
		return type === "module" ? "esm" : "cjs";
	}
	else if (ext === ".ts" || ext === ".mts" || ext === ".mjs") {
		return "esm";
	}
	return "cjs";
}

export function tsconfigPathsToRegExp(paths: Record<string, unknown>) {
	return Object.keys(paths).map((key) => {
		return new RegExp(`^${key.replace(/\*/, ".*")}$`);
	});
}
