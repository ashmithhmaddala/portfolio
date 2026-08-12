import { useMemo, useState } from "react";
import "./beaconing.css";

/*
 * Beaconing detection, the way NetProbe does it: from timing alone.
 *
 * Command-and-control implants call home on a schedule. The payload may be
 * encrypted and the destination may look ordinary, but the rhythm is a
 * signal, and it survives everything the implant does to hide the content.
 *
 * The measure is the coefficient of variation of inter-arrival intervals:
 * standard deviation over mean. Scale-free, so a 30-second beacon and an
 * hourly one are judged the same way. Human traffic clusters and idles, so
 * its CV sits near or above 1. A scheduled callback sits near 0.
 *
 * Drag the jitter control to see where the detection stops working. That
 * boundary is the honest part — implants add jitter precisely to cross it.
 */

const WINDOW = 1800; // seconds on screen (30 min)
const W = 620;

/* Deterministic PRNG, so the traffic doesn't reshuffle on every render. */
function rng(seed) {
	let s = seed;
	return () => {
		s |= 0;
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/* Bursty, idle-prone traffic: what a person actually generates. */
function humanTraffic(seed) {
	const rand = rng(seed);
	const times = [];
	let t = rand() * 60;

	while (t < WINDOW) {
		// Occasional burst of activity, then a long idle gap.
		const burst = 2 + Math.floor(rand() * 5);
		for (let i = 0; i < burst && t < WINDOW; i += 1) {
			times.push(t);
			t += 1 + rand() * 9;
		}
		t += 60 + rand() * 260;
	}

	return times;
}

/* A scheduled callback with proportional jitter. */
function beaconTraffic(seed, period, jitter) {
	const rand = rng(seed);
	const times = [];
	let t = rand() * period;

	while (t < WINDOW) {
		times.push(t);
		t += period * (1 + (rand() * 2 - 1) * jitter);
	}

	return times;
}

function coefficientOfVariation(times) {
	if (times.length < 4) return null;
	const gaps = times.slice(1).map((t, i) => t - times[i]);
	const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
	if (mean <= 0) return null;
	const sd = Math.sqrt(
		gaps.reduce((acc, g) => acc + (g - mean) ** 2, 0) / gaps.length
	);
	return { cv: sd / mean, mean, count: times.length };
}

const THRESHOLD = 0.3;

export default function Beaconing() {
	const [jitter, setJitter] = useState(0.05);

	const hosts = useMemo(
		() => [
			{
				name: "10.0.4.12 → cdn.example.net",
				kind: "human",
				times: humanTraffic(7),
			},
			{
				name: "10.0.4.31 → mail.example.com",
				kind: "human",
				times: humanTraffic(19),
			},
			{
				name: "10.0.4.77 → api-sync.cdn-metrics.io",
				kind: "beacon",
				times: beaconTraffic(41, 55, jitter),
			},
		],
		[jitter]
	);

	return (
		<div className="bc">
			<div className="bc__hosts">
				{hosts.map((host) => {
					const stats = coefficientOfVariation(host.times);
					const flagged = stats && stats.cv < THRESHOLD;

					return (
						<div
							className={`bc__host ${flagged ? "is-flagged" : ""}`}
							key={host.name}
						>
							<div className="bc__hostHead">
								<span className="bc__hostName mono">
									{host.name}
								</span>
								<span className="bc__hostStat mono">
									CV{" "}
									<span className="bc__cv">
										{stats ? stats.cv.toFixed(2) : "—"}
									</span>
								</span>
							</div>

							<svg
								className="bc__strip"
								viewBox={`0 0 ${W} 26`}
								preserveAspectRatio="none"
								role="img"
								aria-label={`${host.name}, ${
									host.times.length
								} connections, coefficient of variation ${
									stats ? stats.cv.toFixed(2) : "unknown"
								}`}
							>
								<line
									x1="0"
									y1="13"
									x2={W}
									y2="13"
									className="bc__axis"
								/>
								{host.times.map((t, i) => (
									<line
										key={i}
										x1={(t / WINDOW) * W}
										y1="4"
										x2={(t / WINDOW) * W}
										y2="22"
										className="bc__tick"
									/>
								))}
							</svg>

							<p className="bc__verdict mono">
								{flagged ? (
									<>
										<span className="bc__flag">
											beaconing
										</span>
										<span className="bc__detail">
											{stats.count} connections, mean
											interval{" "}
											{Math.round(stats.mean)}s
										</span>
									</>
								) : (
									<span className="bc__detail">
										{host.times.length} connections, irregular
									</span>
								)}
							</p>
						</div>
					);
				})}
			</div>

			<div className="bc__control">
				<label className="bc__label mono" htmlFor="bc-jitter">
					Implant jitter
					<span className="bc__value">
						±{Math.round(jitter * 100)}%
					</span>
				</label>
				<input
					id="bc-jitter"
					className="bc__slider"
					type="range"
					min="0"
					max="80"
					step="1"
					value={jitter * 100}
					onChange={(e) => setJitter(Number(e.target.value) / 100)}
				/>
				<p className="bc__hint mono">
					Detection gate: CV &lt; {THRESHOLD}. Push jitter past
					roughly 50% and the third host stops looking scheduled.
				</p>
			</div>

			<p className="bc__caveat">
				Metadata only. No payload is inspected, which is what makes this
				usable where privacy rules forbid deep packet inspection. It is
				also the limitation: a sufficiently jittered implant defeats a
				timing test, and the answer to that is correlating it with other
				weak signals rather than tuning this threshold further.
			</p>
		</div>
	);
}
