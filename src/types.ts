import type { buildBundler } from "import-from-string";

export type BundleFormat = "cjs" | "esm";

export interface BundleImportOptions {
	cwd?: string;
	/**
	 * The filepath to bundle and require
	 */
	filepath: string;
	/**
	 * esbuild options
	 *
	 */
	esbuildOptions?: Parameters<typeof buildBundler>[0];

	/** External packages */
	external?: (string | RegExp)[];

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
