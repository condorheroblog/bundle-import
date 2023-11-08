import { JS_EXT_RE } from "./constants";
import { moduleFromString } from "./moduleFromString";
import { resolveOptions } from "./resolveOptions";
import type { BundleImportOptions, DependenciesType } from "./types";
import { buildBundler, externalPlugin, injectFileScopePlugin } from "import-from-string";
import { dirname, basename, join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bundleImport<T = any>(
	options: BundleImportOptions,
): Promise<{
	mod: T;
	dependencies: DependenciesType;
}> {
	return new Promise(async (resolve, reject) => {
		if (!JS_EXT_RE.test(options.filepath)) {
			throw new Error(`${options.filepath} is not a valid JS file`);
		}

		const resolved = resolveOptions(options);

		try {
			const result = await buildBundler({
				entryPoints: [resolved.filepath],
				absWorkingDir: resolved.cwd,
				outfile: "out.js",
				format: resolved.format,
				platform: "node",
				bundle: true,
				metafile: true,
				write: false,
				...resolved.esbuildOptions,
				plugins: [externalPlugin(), injectFileScopePlugin(), ...(resolved.esbuildOptions?.plugins ?? [])],
			});

			if (result.outputFiles) {
				const absFilePath = join(resolved.cwd, resolved.filepath);
				const code = result.outputFiles[0].text;
				const mod = await moduleFromString(code, {
					format: resolved.format,
					dirname: dirname(absFilePath),
					filename: basename(absFilePath),
				});

				resolve({
					mod,
					dependencies: result.metafile?.inputs || {},
				});
			}
			resolve({
				mod: {} as T,
				dependencies: {},
			});
		} catch (e) {
			reject(e);
		}
	});
}
