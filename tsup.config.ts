import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts"],
	format: ["cjs", "esm"],
	dts: false,
	clean: true,
	tsconfig: "./tsconfig.json",
	splitting: false,
	minify: true,
	bundle: true,
	esbuildOptions(options) {
		options.outbase = "./src";
	},
});
