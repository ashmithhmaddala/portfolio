import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import "./alphaBeta.css";

/*
 * Alpha-beta pruning, stepped.
 *
 * The tree is the standard teaching example (leaves 3,12,8 / 2,4,6 / 14,5,2),
 * chosen because its cutoff is easy to follow and its result is easy to check
 * by hand: minimax value 3, with two leaves never evaluated.
 *
 * The trace below is written out rather than generated. A live search would
 * be less code but would make the narration generic; each step here says what
 * actually happened at that point and why.
 */

const NODES = {
	A: { x: 300, y: 40, kind: "max", label: "max" },
	B: { x: 110, y: 125, kind: "min", label: "min" },
	C: { x: 300, y: 125, kind: "min", label: "min" },
	D: { x: 490, y: 125, kind: "min", label: "min" },
};

const LEAVES = [
	{ id: "L1", parent: "B", x: 40, value: 3 },
	{ id: "L2", parent: "B", x: 110, value: 12 },
	{ id: "L3", parent: "B", x: 180, value: 8 },
	{ id: "L4", parent: "C", x: 230, value: 2 },
	{ id: "L5", parent: "C", x: 300, value: 4 },
	{ id: "L6", parent: "C", x: 370, value: 6 },
	{ id: "L7", parent: "D", x: 420, value: 14 },
	{ id: "L8", parent: "D", x: 490, value: 5 },
	{ id: "L9", parent: "D", x: 560, value: 2 },
];

const LEAF_Y = 215;

const STEPS = [
	{
		note: "Start at the root. It is a maximising node with no bounds yet.",
		active: "A",
		window: "α = −∞   β = +∞",
	},
	{
		note: "Descend into the first branch. It minimises.",
		active: "B",
		window: "α = −∞   β = +∞",
	},
	{
		note: "Evaluate the first leaf. This branch is now worth at most 3.",
		active: "L1",
		seen: ["L1"],
		vals: { B: "≤3" },
		window: "α = −∞   β = 3",
	},
	{
		note: "12 is worse for the minimiser, so the bound holds.",
		active: "L2",
		seen: ["L1", "L2"],
		vals: { B: "≤3" },
		window: "α = −∞   β = 3",
	},
	{
		note: "8 does not beat 3 either. This branch is settled.",
		active: "L3",
		seen: ["L1", "L2", "L3"],
		vals: { B: "3" },
		window: "α = −∞   β = 3",
	},
	{
		note: "The branch returns 3. The root can now guarantee at least 3.",
		active: "B",
		seen: ["L1", "L2", "L3"],
		vals: { B: "3", A: "≥3" },
		window: "α = 3   β = +∞",
	},
	{
		note: "Descend into the second branch, carrying α = 3 with us.",
		active: "C",
		seen: ["L1", "L2", "L3"],
		vals: { B: "3", A: "≥3" },
		window: "α = 3   β = +∞",
	},
	{
		note: "Evaluate 2. This branch is now worth at most 2, and the root already has 3.",
		active: "L4",
		seen: ["L1", "L2", "L3", "L4"],
		vals: { B: "3", A: "≥3", C: "≤2" },
		window: "α = 3   β = 2",
		cutoff: true,
	},
	{
		note: "β ≤ α, so this branch cannot beat what we hold. Its remaining leaves are never read.",
		active: "C",
		seen: ["L1", "L2", "L3", "L4"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "≥3", C: "≤2" },
		window: "α = 3   β = 2",
		cutoff: true,
	},
	{
		note: "Descend into the last branch, still carrying α = 3.",
		active: "D",
		seen: ["L1", "L2", "L3", "L4"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "≥3", C: "≤2" },
		window: "α = 3   β = +∞",
	},
	{
		note: "14 is high, so the minimiser keeps looking.",
		active: "L7",
		seen: ["L1", "L2", "L3", "L4", "L7"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "≥3", C: "≤2", D: "≤14" },
		window: "α = 3   β = 14",
	},
	{
		note: "5 lowers the bound, but still sits above α.",
		active: "L8",
		seen: ["L1", "L2", "L3", "L4", "L7", "L8"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "≥3", C: "≤2", D: "≤5" },
		window: "α = 3   β = 5",
	},
	{
		note: "2 settles this branch. It was the last child, so there was nothing left to cut.",
		active: "L9",
		seen: ["L1", "L2", "L3", "L4", "L7", "L8", "L9"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "≥3", C: "≤2", D: "2" },
		window: "α = 3   β = 2",
	},
	{
		note: "Root takes the best of 3, ≤2 and 2. The first branch wins.",
		active: "A",
		seen: ["L1", "L2", "L3", "L4", "L7", "L8", "L9"],
		cut: ["L5", "L6"],
		vals: { B: "3", A: "3", C: "≤2", D: "2" },
		window: "value = 3",
		done: true,
	},
];

export default function AlphaBeta() {
	const [step, setStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const timer = useRef(null);

	const state = STEPS[step];
	const seen = state.seen || [];
	const cut = state.cut || [];
	const vals = state.vals || {};

	useEffect(() => {
		if (!playing) return;

		if (step >= STEPS.length - 1) {
			setPlaying(false);
			return;
		}

		timer.current = setTimeout(() => setStep((s) => s + 1), 1500);
		return () => clearTimeout(timer.current);
	}, [playing, step]);

	const go = (next) => {
		setPlaying(false);
		setStep(Math.min(Math.max(next, 0), STEPS.length - 1));
	};

	const nodeState = (id) => {
		if (state.active === id) return "is-active";
		if (vals[id] !== undefined) return "is-done";
		return "";
	};

	const leafState = (id) => {
		if (cut.includes(id)) return "is-cut";
		if (state.active === id) return "is-active";
		if (seen.includes(id)) return "is-seen";
		return "";
	};

	return (
		<div className="ab">
			<div className="ab__stage">
				<svg
					className="ab__svg"
					viewBox="0 0 600 250"
					role="img"
					aria-label={`Alpha-beta search, step ${step + 1} of ${
						STEPS.length
					}. ${state.note}`}
				>
					{/* edges root -> internal */}
					{Object.entries(NODES)
						.filter(([id]) => id !== "A")
						.map(([id, node]) => (
							<line
								key={`e-${id}`}
								x1={NODES.A.x}
								y1={NODES.A.y + 18}
								x2={node.x}
								y2={node.y - 17}
								className={`ab__edge ${
									cut.length && id === "C" ? "is-cut" : ""
								}`}
							/>
						))}

					{/* edges internal -> leaves */}
					{LEAVES.map((leaf) => (
						<line
							key={`e-${leaf.id}`}
							x1={NODES[leaf.parent].x}
							y1={NODES[leaf.parent].y + 17}
							x2={leaf.x}
							y2={LEAF_Y - 14}
							className={`ab__edge ${
								cut.includes(leaf.id) ? "is-cut" : ""
							}`}
						/>
					))}

					{/* internal nodes */}
					{Object.entries(NODES).map(([id, node]) => (
						<g key={id} className={`ab__node ${nodeState(id)}`}>
							<circle cx={node.x} cy={node.y} r="18" />
							<text x={node.x} y={node.y + 4} textAnchor="middle">
								{vals[id] !== undefined ? vals[id] : node.label}
							</text>
						</g>
					))}

					{/* leaves */}
					{LEAVES.map((leaf) => (
						<g key={leaf.id} className={`ab__leaf ${leafState(leaf.id)}`}>
							<rect
								x={leaf.x - 15}
								y={LEAF_Y - 14}
								width="30"
								height="28"
							/>
							<text x={leaf.x} y={LEAF_Y + 5} textAnchor="middle">
								{cut.includes(leaf.id) ? "—" : leaf.value}
							</text>
						</g>
					))}
				</svg>
			</div>

			<div className="ab__readout mono">
				<span className={`ab__window ${state.cutoff ? "is-cutoff" : ""}`}>
					{state.window}
				</span>
				<span className="ab__count">
					{seen.length}/9 leaves read
					{cut.length > 0 && `  ·  ${cut.length} pruned`}
				</span>
			</div>

			<p className="ab__note" aria-live="polite">
				{state.note}
			</p>

			<div className="ab__controls">
				<button
					type="button"
					className="ab__btn"
					onClick={() => go(0)}
					aria-label="Reset"
					disabled={step === 0 && !playing}
				>
					<RotateCcw size={14} strokeWidth={1.7} />
				</button>
				<button
					type="button"
					className="ab__btn"
					onClick={() => go(step - 1)}
					aria-label="Previous step"
					disabled={step === 0}
				>
					<SkipBack size={14} strokeWidth={1.7} />
				</button>
				<button
					type="button"
					className="ab__btn ab__btn--play"
					onClick={() => {
						if (step >= STEPS.length - 1) setStep(0);
						setPlaying((p) => !p);
					}}
					aria-label={playing ? "Pause" : "Play"}
				>
					{playing ? (
						<Pause size={14} strokeWidth={1.7} />
					) : (
						<Play size={14} strokeWidth={1.7} />
					)}
					{playing ? "Pause" : "Play"}
				</button>
				<button
					type="button"
					className="ab__btn"
					onClick={() => go(step + 1)}
					aria-label="Next step"
					disabled={step === STEPS.length - 1}
				>
					<SkipForward size={14} strokeWidth={1.7} />
				</button>

				<span className="ab__progress mono">
					{String(step + 1).padStart(2, "0")} / {STEPS.length}
				</span>
			</div>
		</div>
	);
}
