import { name } from "../../package.json";
import { JS_EXT_RE } from "../constants";
import { inferLoader } from "import-from-string";
import type { Plugin } from "import-from-string";
import { promises } from "node:fs";
import { extname, dirname } from "node:path";
import { pathToFileURL } from "node:url";

export const DIRNAME_VAR_NAME = "__injected_dirname__";
export const FILENAME_VAR_NAME = "__injected_filename__";
export const IMPORT_META_URL_VAR_NAME = "__injected_import_meta_url__";

export function injectFileScopePlugin(): Plugin {
	return {
		name: `[${name}]:inject-file-scope`,
		setup(build) {
			build.initialOptions.define = {
				...build.initialOptions.define,
				__dirname: DIRNAME_VAR_NAME,
				__filename: FILENAME_VAR_NAME,
				"import.meta.url": IMPORT_META_URL_VAR_NAME,
			};

			build.onLoad({ filter: JS_EXT_RE }, async (args) => {
				const contents = await promises.readFile(args.path, "utf-8");
				const injectLines = [
					`const ${FILENAME_VAR_NAME} = ${JSON.stringify(args.path)};`,
					`const ${DIRNAME_VAR_NAME} = ${JSON.stringify(dirname(args.path))};`,
					`const ${IMPORT_META_URL_VAR_NAME} = ${JSON.stringify(pathToFileURL(args.path).href)};`,
				];
				return {
					contents: injectLines.join("") + contents,
					loader: inferLoader(extname(args.path)),
				};
			});
		},
	};
}
