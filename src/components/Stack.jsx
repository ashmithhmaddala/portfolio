import { SECTIONS, STACK } from "../data/profile";
import Section from "./Section";
import "./stack.css";

const META = SECTIONS.find((s) => s.id === "stack");

export default function Stack() {
	return (
		<Section id={META.id} num={META.num} label={META.label}>
			<dl className="stack">
				{STACK.map((group) => (
					<div className="stack__row" key={group.group}>
						<dt className="stack__group mono">{group.group}</dt>
						<dd className="stack__items">
							{group.items.join(", ")}
						</dd>
					</div>
				))}
			</dl>
		</Section>
	);
}
