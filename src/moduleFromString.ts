import type { BundleFormat } from "./types";
import { requireFromString, importFromString } from "import-from-string";

export interface ModuleFromStringOptions {
	format: BundleFormat;
	dirname: string;
	filename: string;
}

export async function moduleFromString(code: string, options: ModuleFromStringOptions) {
	const isESM = options.format === "esm";
	if (isESM) {
		return await importFromString(code, {
			filename: options.filename,
			dirname: options.dirname,
			skipBuild: false,
		});
	} else {
		return requireFromString(code, { filename: options.filename, dirname: options.dirname });
	}
}
