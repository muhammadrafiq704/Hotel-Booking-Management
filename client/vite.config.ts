import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/test/setup.ts",
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
} as UserConfig);
