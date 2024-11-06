import { name } from "../../package.json";
import type { Plugin } from "import-from-string";
import { isAbsolute } from "node:path";

export function match(id: string, patterns?: (string | RegExp)[]) {
	if (!patterns)
		return false;
	return patterns.some((p) => {
		if (p instanceof RegExp) {
			return p.test(id);
		}
		return id === p || id.startsWith(`${p}/`);
	});
}

export function externalPlugin({
	external,
	notExternal,
}: {
	external?: (string | RegExp)[]
	notExternal?: (string | RegExp)[]
} = {}): Plugin {
	return {
		name: `${name}:external`,
		setup(ctx) {
			ctx.onResolve({ filter: /.*/ }, async (args) => {
				if (args.path[0] === "." || isAbsolute(args.path)) {
					// Fallback to default
					return;
				}

				if (match(args.path, external)) {
					return {
						external: true,
					};
				}

				if (match(args.path, notExternal)) {
					// Should be resolved by esbuild(https://github.com/evanw/esbuild/issues/38)
					return;
				}

				// Most like importing from node_modules, mark external
				return {
					external: true,
				};
			});
		},
	};
}
