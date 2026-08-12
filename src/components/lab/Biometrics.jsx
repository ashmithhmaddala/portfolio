import { useCallback, useEffect, useRef, useState } from "react";
import { MousePointer2, Bot, RotateCcw } from "lucide-react";
import "./biometrics.css";

/*
 * Behavioural biometrics, run on the visitor.
 *
 * Turing Defense classifies humans against automation from 56 features across
 * kinematics, geometry, timing and micro-corrections. This is four of them,
 * computed live in the page, so the idea is something you do rather than
 * something you read.
 *
 * Honest about scope: four features and a weighted heuristic is not the
 * trained 56-dimension classifier, and the score here is illustrative. What
 * it does show truthfully is *why* the features separate — synthetic motion
 * is smooth, evenly timed and never corrects, and all three of those are
 * measurable.
 *
 * Nothing leaves the page. The buffer is pointer coordinates in local state.
 */

const BUFFER = 90;
const MIN_SAMPLES = 24;

/* Shannon entropy of a bucketed distribution, normalised to 0..1. */
function normalisedEntropy(values, buckets = 8) {
	if (values.length < 2) return 0;
	const min = Math.min(...values);
	const max = Math.max(...values);
	if (max - min < 1e-9) return 0;

	const counts = new Array(buckets).fill(0);
	values.forEach((v) => {
		const i = Math.min(
			Math.floor(((v - min) / (max - min)) * buckets),
			buckets - 1
		);
		counts[i] += 1;
	});

	const total = values.length;
	const h = counts.reduce((acc, c) => {
		if (!c) return acc;
		const p = c / total;
		return acc - p * Math.log2(p);
	}, 0);

	return h / Math.log2(buckets);
}

function extractFeatures(points) {
	if (points.length < MIN_SAMPLES) return null;

	const speeds = [];
	const intervals = [];
	const turns = [];
	let reversals = 0;

	for (let i = 1; i < points.length; i += 1) {
		const dx = points[i].x - points[i - 1].x;
		const dy = points[i].y - points[i - 1].y;
		const dt = Math.max(points[i].t - points[i - 1].t, 1);

		speeds.push(Math.hypot(dx, dy) / dt);
		intervals.push(dt);

		if (i > 1) {
			const px = points[i - 1].x - points[i - 2].x;
			const py = points[i - 1].y - points[i - 2].y;
			const a1 = Math.atan2(py, px);
			const a2 = Math.atan2(dy, dx);
			let turn = Math.abs(a2 - a1);
			if (turn > Math.PI) turn = 2 * Math.PI - turn;
			turns.push(turn);
			// A near-reversal is the signature of a correction movement.
			if (turn > Math.PI * 0.6) reversals += 1;
		}
	}

	const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
	const meanSpeed = mean(speeds);
	const sd = Math.sqrt(mean(speeds.map((s) => (s - meanSpeed) ** 2)));

	// Coefficient of variation: scale-free, so a slow careful mover and a
	// fast one are compared on the same footing.
	const jerk = meanSpeed > 1e-6 ? Math.min(sd / meanSpeed, 1.4) / 1.4 : 0;
	const curvature = Math.min(mean(turns) / (Math.PI * 0.45), 1);
	const timing = normalisedEntropy(intervals);
	const corrections = Math.min(reversals / (points.length * 0.12), 1);

	const score = Math.round(
		(jerk * 0.3 + curvature * 0.3 + timing * 0.25 + corrections * 0.15) * 100
	);

	return {
		score,
		features: [
			{ key: "Kinematics", label: "speed variation", value: jerk },
			{ key: "Geometry", label: "path curvature", value: curvature },
			{ key: "Temporal", label: "timing entropy", value: timing },
			{ key: "Micro", label: "corrections", value: corrections },
		],
	};
}

/*
 * A naive automation path: straight segments between waypoints, constant
 * speed, fixed sample interval. This is what a scripted pointer looks like
 * before anyone tries to hide it.
 */
function syntheticPath(width, height) {
	const points = [];
	const waypoints = [
		{ x: width * 0.1, y: height * 0.75 },
		{ x: width * 0.4, y: height * 0.2 },
		{ x: width * 0.72, y: height * 0.8 },
		{ x: width * 0.92, y: height * 0.3 },
	];

	let t = 0;
	for (let w = 0; w < waypoints.length - 1; w += 1) {
		const from = waypoints[w];
		const to = waypoints[w + 1];
		for (let s = 0; s < 22; s += 1) {
			const k = s / 22;
			points.push({
				x: from.x + (to.x - from.x) * k,
				y: from.y + (to.y - from.y) * k,
				t: (t += 16), // perfectly uniform sampling
			});
		}
	}

	return points;
}

const W = 620;
const H = 200;

export default function Biometrics() {
	const [points, setPoints] = useState([]);
	const [mode, setMode] = useState("idle"); // idle | human | bot
	const surface = useRef(null);
	const pending = useRef(null);
	const frame = useRef(null);

	const result = extractFeatures(points);

	const onPointerMove = useCallback(
		(e) => {
			if (mode === "bot") return;
			const rect = surface.current?.getBoundingClientRect();
			if (!rect) return;

			// Store the event, commit at most once per frame. Pointer events
			// fire far faster than React should re-render.
			pending.current = {
				x: ((e.clientX - rect.left) / rect.width) * W,
				y: ((e.clientY - rect.top) / rect.height) * H,
				t: performance.now(),
			};

			if (frame.current !== null) return;
			frame.current = requestAnimationFrame(() => {
				frame.current = null;
				const p = pending.current;
				if (!p) return;
				setPoints((prev) => [...prev, p].slice(-BUFFER));
				setMode("human");
			});
		},
		[mode]
	);

	useEffect(
		() => () => {
			if (frame.current !== null) cancelAnimationFrame(frame.current);
		},
		[]
	);

	const runBot = () => {
		setMode("bot");
		setPoints(syntheticPath(W, H));
	};

	const reset = () => {
		setMode("idle");
		setPoints([]);
	};

	const path = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

	return (
		<div className="bio">
			<div
				className="bio__surface"
				ref={surface}
				onPointerMove={onPointerMove}
				role="img"
				aria-label={
					result
						? `Movement trace. Human-likeness score ${result.score} out of 100.`
						: "Move a pointer across this area to trace movement."
				}
			>
				<svg viewBox={`0 0 ${W} ${H}`} className="bio__svg">
					{points.length > 1 && (
						<polyline
							className={`bio__trace ${
								mode === "bot" ? "is-bot" : ""
							}`}
							points={path}
						/>
					)}
					{points.length > 0 && (
						<circle
							className={`bio__head ${
								mode === "bot" ? "is-bot" : ""
							}`}
							cx={points[points.length - 1].x}
							cy={points[points.length - 1].y}
							r="3.5"
						/>
					)}
				</svg>

				{mode === "idle" && (
					<p className="bio__hint mono">
						<MousePointer2 size={13} strokeWidth={1.7} />
						Move your pointer through here
					</p>
				)}
			</div>

			<div className="bio__controls">
				<button type="button" className="bio__btn" onClick={runBot}>
					<Bot size={13} strokeWidth={1.7} />
					Simulate automation
				</button>
				<button
					type="button"
					className="bio__btn"
					onClick={reset}
					disabled={mode === "idle"}
				>
					<RotateCcw size={13} strokeWidth={1.7} />
					Clear
				</button>
				<span className="bio__samples mono">
					{points.length}/{BUFFER} samples
				</span>
			</div>

			<div className="bio__readout">
				{result ? (
					<>
						<ul className="bio__features">
							{result.features.map((f) => (
								<li className="bio__feature" key={f.key}>
									<span className="bio__featureKey mono">
										{f.key}
									</span>
									<span className="bio__meter" aria-hidden="true">
										<span
											className={`bio__meterFill ${
												mode === "bot" ? "is-bot" : ""
											}`}
											style={{
												width: `${Math.round(
													f.value * 100
												)}%`,
											}}
										/>
									</span>
									<span className="bio__featureLabel mono">
										{f.label}
									</span>
								</li>
							))}
						</ul>

						<p className="bio__verdict mono">
							<span className="bio__score">{result.score}</span>
							<span className="bio__scoreLabel">/100 human-like</span>
							<span
								className={`bio__badge ${
									result.score < 35 ? "is-bot" : "is-human"
								}`}
							>
								{result.score < 35
									? "automation"
									: "human"}
							</span>
						</p>
					</>
				) : (
					<p className="bio__waiting mono">
						Collecting samples — {MIN_SAMPLES} needed before the
						features mean anything.
					</p>
				)}
			</div>

			<p className="bio__caveat">
				Four features and a weighted heuristic, not the trained
				56-dimension classifier. It still shows the thing that matters:
				synthetic motion is smooth, evenly timed and never corrects
				itself, and each of those is measurable. Everything runs in this
				page and nothing is sent anywhere.
			</p>
		</div>
	);
}
