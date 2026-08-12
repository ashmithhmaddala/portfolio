/*
 * Section shell: ruled top edge, then a small mono label carrying the
 * section's ordinal. Same treatment everywhere, so the page reads as one
 * document rather than a stack of unrelated blocks.
 */
export default function Section({ id, num, label, children }) {
	return (
		<section className="section" id={id}>
			<div className="wrap">
				<h2 className="label">
					<span className="label__num">{num}</span>
					<span>{label}</span>
					<span className="label__rule" aria-hidden="true" />
				</h2>
				{children}
			</div>
		</section>
	);
}
