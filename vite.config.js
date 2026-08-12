import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from the apex of a custom domain (ashmithmaddala.dev), so assets
// resolve from the root. public/CNAME is copied into dist/ automatically,
// which is what keeps the custom domain bound across gh-pages deploys.
export default defineConfig({
	base: "/",
	plugins: [react()],
	build: {
		outDir: "dist",
		target: "es2020",
		cssMinify: true,
		rollupOptions: {
			output: {
				manualChunks: {
					motion: ["framer-motion"],
				},
			},
		},
	},
});
