import "./diagrams.css";

/*
 * Hand-authored technical diagrams, one per project.
 *
 * Inline SVG rather than images, so they inherit the page's CSS custom
 * properties and re-colour correctly in both themes. Each one is drawn on a
 * 640-unit-wide viewBox and scales to its container.
 *
 * Every diagram carries a <title> for the accessibility tree, and the prose
 * around it always states the same point, so nothing depends on being able to
 * see the picture.
 */

function Arrow({ id }) {
	return (
		<defs>
			<marker
				id={id}
				viewBox="0 0 10 10"
				refX="9"
				refY="5"
				markerWidth="6"
				markerHeight="6"
				orient="auto-start-reverse"
			>
				<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-3)" />
			</marker>
		</defs>
	);
}

/* ------------------------------------------------- 01 · cold-start handover */

function ColdStart() {
	return (
		<svg
			className="dgm"
			viewBox="0 0 640 190"
			role="img"
			aria-labelledby="dgm-cold-title"
		>
			<title id="dgm-cold-title">
				Recommendation path by interaction count: content-based below
				the handover threshold, collaborative filtering above it.
			</title>
			<Arrow id="ar-cold" />

			{/* region bands */}
			<rect
				x="40"
				y="34"
				width="260"
				height="62"
				fill="var(--paper-2)"
				stroke="var(--rule)"
			/>
			<rect
				x="340"
				y="34"
				width="260"
				height="62"
				fill="var(--paper-2)"
				stroke="var(--rule)"
			/>

			<text className="dgm__h" x="56" y="58">
				Content-based
			</text>
			<text className="dgm__t" x="56" y="78">
				Onboarding questionnaire
			</text>
			<text className="dgm__h" x="356" y="58">
				Collaborative filtering
			</text>
			<text className="dgm__t" x="356" y="78">
				Per-skill vector neighbourhood
			</text>

			{/* handover */}
			<line
				x1="320"
				y1="24"
				x2="320"
				y2="126"
				stroke="var(--signal)"
				strokeDasharray="3 3"
			/>
			<text className="dgm__sig" x="320" y="18" textAnchor="middle">
				handover threshold
			</text>

			{/* flow */}
			<line
				x1="40"
				y1="126"
				x2="600"
				y2="126"
				stroke="var(--ink-3)"
				markerEnd="url(#ar-cold)"
			/>
			<line x1="40" y1="122" x2="40" y2="130" stroke="var(--ink-3)" />
			<text className="dgm__t" x="40" y="148">
				new user
			</text>
			<text className="dgm__t" x="600" y="148" textAnchor="end">
				interaction history
			</text>

			<text className="dgm__n" x="320" y="176" textAnchor="middle">
				Threshold set empirically, not derived. See the retrospective.
			</text>
		</svg>
	);
}

/* ------------------------------------------------ 02 · authorisation boundary */

function AuthBoundary() {
	const routes = ["/admin/listings", "/admin/users", "/admin/export"];

	return (
		<svg
			className="dgm"
			viewBox="0 0 640 250"
			role="img"
			aria-labelledby="dgm-auth-title"
		>
			<title id="dgm-auth-title">
				Per-view decorators fail open when one is forgotten. A
				blueprint-level guard protects routes by construction.
			</title>
			<Arrow id="ar-auth" />

			{/* ---- before ---- */}
			<text className="dgm__h" x="20" y="20">
				Before
			</text>
			<text className="dgm__n" x="20" y="38">
				check repeated per route
			</text>

			{routes.map((route, i) => {
				const y = 58 + i * 46;
				// The third route is the forgotten one.
				const missing = i === 2;
				return (
					<g key={route}>
						<line
							x1="20"
							y1={y + 14}
							x2="60"
							y2={y + 14}
							stroke="var(--ink-3)"
							markerEnd="url(#ar-auth)"
						/>
						<rect
							x="64"
							y={y}
							width="66"
							height="28"
							fill={missing ? "none" : "var(--paper-2)"}
							stroke={missing ? "var(--signal)" : "var(--rule-2)"}
							strokeDasharray={missing ? "3 3" : undefined}
						/>
						<text
							className={missing ? "dgm__sig" : "dgm__t"}
							x="97"
							y={y + 18}
							textAnchor="middle"
						>
							{missing ? "no check" : "@admin"}
						</text>
						<line
							x1="130"
							y1={y + 14}
							x2="166"
							y2={y + 14}
							stroke="var(--ink-3)"
							markerEnd="url(#ar-auth)"
						/>
						<rect
							x="170"
							y={y}
							width="112"
							height="28"
							fill="var(--paper-2)"
							stroke="var(--rule-2)"
						/>
						<text className="dgm__t" x="226" y={y + 18} textAnchor="middle">
							{route}
						</text>
					</g>
				);
			})}

			<text className="dgm__sig" x="20" y="228">
				one omission ships a public admin route
			</text>

			{/* divider */}
			<line x1="310" y1="8" x2="310" y2="242" stroke="var(--rule)" />

			{/* ---- after ---- */}
			<text className="dgm__h" x="336" y="20">
				After
			</text>
			<text className="dgm__n" x="336" y="38">
				check owned by the blueprint
			</text>

			<line
				x1="336"
				y1="118"
				x2="376"
				y2="118"
				stroke="var(--ink-3)"
				markerEnd="url(#ar-auth)"
			/>

			{/* single guard bar spanning all routes */}
			<rect
				x="380"
				y="58"
				width="34"
				height="120"
				fill="var(--paper-3)"
				stroke="var(--signal)"
			/>
			<text
				className="dgm__sig"
				x="397"
				y="118"
				textAnchor="middle"
				transform="rotate(-90 397 118)"
			>
				before_request
			</text>

			{routes.map((route, i) => {
				const y = 58 + i * 46;
				return (
					<g key={route}>
						<line
							x1="414"
							y1={y + 14}
							x2="450"
							y2={y + 14}
							stroke="var(--ink-3)"
							markerEnd="url(#ar-auth)"
						/>
						<rect
							x="454"
							y={y}
							width="112"
							height="28"
							fill="var(--paper-2)"
							stroke="var(--rule-2)"
						/>
						<text className="dgm__t" x="510" y={y + 18} textAnchor="middle">
							{route}
						</text>
					</g>
				);
			})}

			<text className="dgm__n" x="336" y="228">
				a new route is protected because of where it lives
			</text>
		</svg>
	);
}

/* --------------------------------------------------- 03 · alpha-beta pruning */

function AlphaBeta() {
	return (
		<svg
			className="dgm"
			viewBox="0 0 640 250"
			role="img"
			aria-labelledby="dgm-ab-title"
		>
			<title id="dgm-ab-title">
				A minimax tree where one subtree is proven irrelevant and never
				visited.
			</title>

			{/* edges */}
			<g stroke="var(--rule-2)" fill="none">
				<path d="M320 44 L160 104" />
				<path d="M320 44 L320 104" />
				<path d="M160 104 L100 174" />
				<path d="M160 104 L220 174" />
				<path d="M320 104 L270 174" />
				<path d="M320 104 L370 174" />
			</g>
			{/* pruned edge, dashed */}
			<path
				d="M320 44 L490 104"
				stroke="var(--rule-2)"
				strokeDasharray="4 4"
				fill="none"
			/>
			<g stroke="var(--rule-2)" strokeDasharray="4 4" fill="none">
				<path d="M490 104 L440 174" />
				<path d="M490 104 L540 174" />
			</g>

			{/* root */}
			<circle cx="320" cy="44" r="17" fill="var(--paper-2)" stroke="var(--ink-2)" />
			<text className="dgm__v" x="320" y="49" textAnchor="middle">
				max
			</text>

			{/* min layer */}
			{[
				{ x: 160, v: "3" },
				{ x: 320, v: "5" },
			].map((n) => (
				<g key={n.x}>
					<circle
						cx={n.x}
						cy="104"
						r="15"
						fill="var(--paper-2)"
						stroke="var(--ink-2)"
					/>
					<text className="dgm__v" x={n.x} y="109" textAnchor="middle">
						{n.v}
					</text>
				</g>
			))}

			{/* pruned min node */}
			<circle
				cx="490"
				cy="104"
				r="15"
				fill="none"
				stroke="var(--signal)"
				strokeDasharray="3 3"
			/>
			<text className="dgm__sigv" x="490" y="109" textAnchor="middle">
				≤2
			</text>

			{/* leaves */}
			{[
				{ x: 100, v: "3" },
				{ x: 220, v: "7" },
				{ x: 270, v: "5" },
				{ x: 370, v: "8" },
			].map((n) => (
				<g key={n.x}>
					<rect
						x={n.x - 14}
						y="160"
						width="28"
						height="28"
						fill="var(--paper-2)"
						stroke="var(--rule-2)"
					/>
					<text className="dgm__v" x={n.x} y="179" textAnchor="middle">
						{n.v}
					</text>
				</g>
			))}

			{/* pruned leaves */}
			{[440, 540].map((x) => (
				<g key={x}>
					<rect
						x={x - 14}
						y="160"
						width="28"
						height="28"
						fill="none"
						stroke="var(--rule-2)"
						strokeDasharray="3 3"
					/>
					<line
						x1={x - 9}
						y1="165"
						x2={x + 9}
						y2="183"
						stroke="var(--signal)"
					/>
					<line
						x1={x + 9}
						y1="165"
						x2={x - 9}
						y2="183"
						stroke="var(--signal)"
					/>
				</g>
			))}

			<text className="dgm__sig" x="515" y="128">
				cut off
			</text>
			<text className="dgm__n" x="320" y="222" textAnchor="middle">
				Once this branch cannot beat 5, its remaining leaves cannot
				change the result and are never evaluated.
			</text>
		</svg>
	);
}

/* --------------------------------------------------------- 04 · ML pipeline */

function Pipeline() {
	const stages = [
		{ x: 16, label: "Raw incidents", sub: "reported data" },
		{ x: 146, label: "Clean", sub: "features" },
		{ x: 276, label: "Split", sub: "train / held-out" },
		{ x: 406, label: "Model", sub: "fitted" },
		{ x: 536, label: "Streamlit", sub: "map + filters" },
	];

	return (
		<svg
			className="dgm"
			viewBox="0 0 640 200"
			role="img"
			aria-labelledby="dgm-pipe-title"
		>
			<title id="dgm-pipe-title">
				Training and serving path, with evaluation held outside the
				application layer.
			</title>
			<Arrow id="ar-pipe" />

			{stages.map((stage, i) => (
				<g key={stage.label}>
					<rect
						x={stage.x}
						y="56"
						width="88"
						height="46"
						fill="var(--paper-2)"
						stroke={i === 4 ? "var(--ink-2)" : "var(--rule-2)"}
					/>
					<text className="dgm__h" x={stage.x + 44} y="76" textAnchor="middle">
						{stage.label}
					</text>
					<text className="dgm__n" x={stage.x + 44} y="92" textAnchor="middle">
						{stage.sub}
					</text>
					{i < stages.length - 1 && (
						<line
							x1={stage.x + 88}
							y1="79"
							x2={stage.x + 126}
							y2="79"
							stroke="var(--ink-3)"
							markerEnd="url(#ar-pipe)"
						/>
					)}
				</g>
			))}

			{/* evaluation branch, deliberately off the serving path */}
			<line
				x1="320"
				y1="102"
				x2="320"
				y2="140"
				stroke="var(--signal)"
				strokeDasharray="3 3"
			/>
			<line
				x1="320"
				y1="140"
				x2="404"
				y2="140"
				stroke="var(--signal)"
				strokeDasharray="3 3"
				markerEnd="url(#ar-pipe)"
			/>
			<rect
				x="408"
				y="126"
				width="88"
				height="28"
				fill="none"
				stroke="var(--signal)"
				strokeDasharray="3 3"
			/>
			<text className="dgm__sig" x="452" y="144" textAnchor="middle">
				evaluation
			</text>

			<text className="dgm__n" x="16" y="182">
				The app loads a fitted model and never sees training data, so
				leakage into reported scores is structurally harder.
			</text>
		</svg>
	);
}

const DIAGRAMS = {
	coldStart: ColdStart,
	authBoundary: AuthBoundary,
	alphaBeta: AlphaBeta,
	pipeline: Pipeline,
};

export default function Diagram({ id, caption }) {
	const Component = DIAGRAMS[id];
	if (!Component) return null;

	return (
		<figure className="dgm__figure">
			<div className="dgm__frame">
				<Component />
			</div>
			{caption && (
				<figcaption className="dgm__caption mono">{caption}</figcaption>
			)}
		</figure>
	);
}
