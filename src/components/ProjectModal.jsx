import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, X } from "lucide-react";
import "./projectModal.css";

const SECTIONS = [
	{ key: "problem", label: "The problem" },
	{ key: "approach", label: "How I built it" },
	{ key: "hardPart", label: "The hard part" },
	{ key: "result", label: "Where it landed" },
];

/*
 * Case-study dialog. Handles the three things a hand-rolled modal usually
 * gets wrong: Escape to close, background scroll lock, and moving focus into
 * the dialog (then back to where it came from on close).
 */
export default function ProjectModal({ project, onClose }) {
	const panelRef = useRef(null);
	const restoreFocusRef = useRef(null);

	useEffect(() => {
		if (!project) return;

		restoreFocusRef.current = document.activeElement;
		document.body.style.overflow = "hidden";
		// Defer so the panel exists before we reach for it.
		const focusTimer = setTimeout(
			() => panelRef.current?.focus(),
			30
		);

		const onKey = (e) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}

			// Minimal focus trap: cycle Tab within the panel.
			if (e.key !== "Tab" || !panelRef.current) return;
			const focusables = panelRef.current.querySelectorAll(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);
			if (!focusables.length) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		window.addEventListener("keydown", onKey);

		return () => {
			clearTimeout(focusTimer);
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			restoreFocusRef.current?.focus?.();
		};
	}, [project, onClose]);

	return (
		<AnimatePresence>
			{project && (
				<motion.div
					className="modal"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.22 }}
					onClick={onClose}
				>
					<motion.div
						ref={panelRef}
						tabIndex={-1}
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
						className="modal__panel"
						initial={{ opacity: 0, y: 26, scale: 0.985 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.99 }}
						transition={{
							duration: 0.34,
							ease: [0.22, 1, 0.36, 1],
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<span
							className="modal__wash"
							aria-hidden="true"
							style={{
								background: `linear-gradient(120deg, ${project.gradient[0]}, ${project.gradient[1]})`,
							}}
						/>

						<button
							className="modal__close"
							onClick={onClose}
							aria-label="Close case study"
						>
							<X size={18} />
						</button>

						<div className="modal__scroll">
							<header className="modal__head">
								<p className="modal__period mono">
									{project.period}
								</p>
								<h2 className="modal__title" id="modal-title">
									{project.title}
								</h2>
								<p className="modal__tagline">
									{project.tagline}
								</p>
							</header>

							<div className="modal__metrics">
								{project.metrics.map((m) => (
									<div className="modal__metric" key={m.label}>
										<span className="modal__metricValue">
											{m.value}
											{m.estimated && (
												<sup
													className="metric__est"
													title="Self-reported estimate, not an independently measured figure."
												>
													est.
												</sup>
											)}
										</span>
										<span className="modal__metricLabel">
											{m.label}
										</span>
									</div>
								))}
							</div>

							<div className="modal__sections">
								{SECTIONS.map(({ key, label }) => (
									<section className="modal__block" key={key}>
										<h3 className="modal__blockTitle">
											<span className="modal__blockRule" />
											{label}
										</h3>
										<p>{project.caseStudy[key]}</p>
									</section>
								))}
							</div>

							<footer className="modal__foot">
								<div className="modal__stack">
									{project.stack.map((tech) => (
										<span className="chip" key={tech}>
											{tech}
										</span>
									))}
								</div>

								{project.links.source && (
									<a
										className="btn btn--primary"
										href={project.links.source}
										target="_blank"
										rel="noreferrer"
									>
										<Github size={16} />
										View source
									</a>
								)}
							</footer>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
