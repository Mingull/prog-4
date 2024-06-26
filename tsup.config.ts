import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/**/*.ts"],
	format: ["cjs"],
	dts: false,
	clean: true,
	tsconfig: "./tsconfig.json",
	splitting: false,
	minify: false,
	bundle: false,
	esbuildOptions(options) {
		options.outbase = "./src";
	},
});
