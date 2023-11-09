import type { BuildOptions } from "import-from-string";

export type BundleFormat = "cjs" | "esm";

export interface BundleImportOptions {
	/**
	 * Project root directory
	 */
	cwd?: string;

	/**
	 * The filepath to bundle and require
	 */
	filepath: string;

	/**
	 * External packages
	 */
	external?: (string | RegExp)[];

	/**
	 * A custom tsconfig path to read `paths` option
	 */
	tsconfig?: string;

	/**
	 * esbuild options
	 *
	 */
	esbuildOptions?: BuildOptions;

	/**
	 * Provide bundle format explicitly
	 * to skip the default format inference
	 */
	format?: BundleFormat;
}

export interface DependenciesType {
	[path: string]: {
		bytes: number;
		imports: {
			path: string;
			kind:
				| "entry-point"
				| "import-statement"
				| "require-call"
				| "dynamic-import"
				| "require-resolve"
				| "import-rule"
				| "composes-from"
				| "url-token";
			external?: boolean;
			original?: string;
		}[];
		format?: "cjs" | "esm";
	};
}
