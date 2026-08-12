import "./mesh.css";

/*
 * Ambient gradient-mesh field behind the hero.
 *
 * Three heavily-blurred blobs drifting on transform only, so the whole thing
 * stays on the compositor and never triggers layout or paint. A faint grid
 * and a fade-to-background mask sit on top to keep it from reading as a
 * generic "AI startup" wash.
 */
export default function MeshBackground() {
	return (
		<div className="mesh" aria-hidden="true">
			<span className="mesh__blob mesh__blob--a" />
			<span className="mesh__blob mesh__blob--b" />
			<span className="mesh__blob mesh__blob--c" />
			<span className="mesh__grid" />
			<span className="mesh__fade" />
		</div>
	);
}
