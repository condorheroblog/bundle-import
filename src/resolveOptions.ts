import type { BundleImportOptions } from "./types";
import { guessFormat } from "./utils";

export function resolveOptions(options: BundleImportOptions) {
	return {
		filepath: options.filepath,
		tsconfig: options.tsconfig ?? "tsconfig.json",
		external: options.external ?? [],
		cwd: options.cwd ?? process.cwd(),
		format: options.format ?? guessFormat(options.filepath),
		esbuildOptions: options.esbuildOptions,
	};
}

export type ResolveOptionsType = ReturnType<typeof resolveOptions>;
