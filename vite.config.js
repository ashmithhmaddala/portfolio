import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * GitHub Pages has no server-side rewrite, so a direct hit on /work/chess
 * would 404 before React ever loads. Pages serves 404.html for any unmatched
 * path, so shipping a byte-identical copy of index.html under that name makes
 * it the SPA fallback: the app boots, the router reads location.pathname, and
 * the URL is preserved.
 */
function githubPagesSpaFallback() {
	return {
		name: "gh-pages-spa-fallback",
		closeBundle() {
			const out = resolve(__dirname, "dist");
			copyFileSync(resolve(out, "index.html"), resolve(out, "404.html"));
		},
	};
}

export default defineConfig({
	// Apex of a custom domain, so assets resolve from the root.
	// public/CNAME is copied into dist/ and keeps the domain bound.
	base: "/",
	plugins: [react(), githubPagesSpaFallback()],
	build: {
		outDir: "dist",
		target: "es2020",
	},
});
