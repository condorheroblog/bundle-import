import { JS_EXT_RE } from "./constants";
import { moduleFromString } from "./moduleFromString";
import { externalPlugin, injectFileScopePlugin } from "./plugins";
import { resolveOptions } from "./resolveOptions";
import type { BundleImportOptions, DependenciesType } from "./types";
import { tsconfigPathsToRegExp } from "./utils";
import { getTsconfig } from "get-tsconfig";
import { buildBundler } from "import-from-string";
import { dirname, basename, join } from "node:path";

export function bundleImport<T = any>(
	options: BundleImportOptions,
): Promise<{
		mod: T
		dependencies: DependenciesType
	}> {
	return new Promise((resolve, reject) => {
		if (!JS_EXT_RE.test(options.filepath)) {
			throw new Error(`${options.filepath} is not a valid JS file`);
		}

		const resolved = resolveOptions(options);
		const tsconfig = getTsconfig(resolved.cwd, options.tsconfig) ?? getTsconfig(resolved.cwd, "jsconfig.json");

		buildBundler({
			entryPoints: [resolved.filepath],
			absWorkingDir: resolved.cwd,
			outfile: "out.js",
			format: resolved.format,
			platform: "node",
			bundle: true,
			metafile: true,
			write: false,
			...resolved.esbuildOptions,
			plugins: [
				externalPlugin({
					external: resolved.external,
					notExternal: tsconfigPathsToRegExp(tsconfig?.config.compilerOptions?.paths ?? {}),
				}),
				injectFileScopePlugin(),
				...(resolved.esbuildOptions?.plugins ?? []),
			],
		}).then(async (result) => {
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
		}).catch(reject);
	});
}
