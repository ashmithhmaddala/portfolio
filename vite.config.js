import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * GitHub Pages has no server-side rewrite. An unknown path gets 404.html
 * served with a 404 status.
 *
 * Copying index.html to 404.html renders the app correctly, but the response
 * is still a 404, and search engines will not index a page served that way.
 * Every case study would be invisible.
 *
 * So 404.html is a redirector instead: it rewrites /work/theriac to
 * /?/work/theriac, which is a genuine 200 for index.html. A small script in
 * index.html restores the real URL before the router reads it.
 */
const REDIRECT_404 = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Ashmith Maddala</title>
		<script>
			// Fold the path into a query string and bounce to the root, which
			// GitHub Pages serves as a 200. index.html unfolds it again.
			var l = window.location;
			l.replace(
				l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
				"/?/" +
				l.pathname.slice(1).replace(/&/g, "~and~") +
				(l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
				l.hash
			);
		</script>
	</head>
	<body></body>
</html>
`;

function githubPagesSpaFallback() {
	return {
		name: "gh-pages-spa-fallback",
		closeBundle() {
			writeFileSync(
				resolve(__dirname, "dist", "404.html"),
				REDIRECT_404,
				"utf8"
			);
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
