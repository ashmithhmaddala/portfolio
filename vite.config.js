import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * GitHub Pages has no server-side rewrite, and serves 404.html with a 404
 * status for any path it has no file for.
 *
 * The usual workaround is to copy index.html to 404.html. The app then renders
 * correctly, but every route except / answers with a 404 status, and search
 * engines will not index a page served that way. All six case studies would be
 * invisible.
 *
 * A JavaScript bounce off 404.html does not fix that either, because the first
 * response is still a 404 and that is what a crawler records.
 *
 * So instead every known route gets a real file: dist/work/theriac/index.html
 * and so on. Pages serves those as genuine 200s. 404.html stays a copy of the
 * app so an unknown path still renders the in-app not-found page, which is the
 * one case where a 404 status is the correct answer.
 */
async function staticRouteShells() {
	// Read the project slugs from the same data the app uses, so a new
	// featured project cannot silently lose its static shell.
	const { FEATURED } = await import("./src/data/projects.js");

	return [
		"work",
		"lab",
		"about",
		"contact",
		...FEATURED.map((p) => `work/${p.slug}`),
	];
}

function githubPagesRoutes() {
	return {
		name: "gh-pages-static-routes",
		async closeBundle() {
			const out = resolve(__dirname, "dist");
			const indexPath = resolve(out, "index.html");
			const html = readFileSync(indexPath, "utf8");
			const routes = await staticRouteShells();

			routes.forEach((route) => {
				const dir = resolve(out, route);
				mkdirSync(dir, { recursive: true });
				writeFileSync(resolve(dir, "index.html"), html, "utf8");
			});

			// Genuinely unknown paths: render the app's not-found page, and
			// let the 404 status stand because here it is accurate.
			copyFileSync(indexPath, resolve(out, "404.html"));

			// eslint-disable-next-line no-console
			console.log(
				`\n  static route shells: ${routes.length} written (${routes.join(", ")})`
			);
		},
	};
}

export default defineConfig({
	// Apex of a custom domain, so assets resolve from the root.
	// public/CNAME is copied into dist/ and keeps the domain bound.
	base: "/",
	plugins: [react(), githubPagesRoutes()],
	build: {
		outDir: "dist",
		target: "es2020",
	},
});
