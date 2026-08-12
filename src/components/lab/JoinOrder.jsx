import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import "./joinOrder.css";

/*
 * Why join order matters, made touchable.
 *
 * Three tables, one query, six possible left-deep orders. The user builds an
 * order and sees what it costs. The spread between the best and worst plan is
 * roughly four orders of magnitude, which is the entire reason a query
 * planner exists — and the reason it's worth teaching one to choose for
 * itself.
 *
 * The cost model is deliberately simple: cost is the sum of intermediate
 * result sizes, cardinalities are estimated from uniform-distribution
 * assumptions, and physical operators are ignored. A real optimiser models
 * far more. The ranking it produces here is still the right ranking.
 */

const TABLES = {
	customers: { label: "customers", rows: 10_000, filtered: 500, filter: "country = 'IN'" },
	orders: { label: "orders", rows: 5_000_000, filtered: 5_000_000, filter: null },
	line_items: { label: "line_items", rows: 20_000_000, filtered: 20_000_000, filter: null },
};

// Pairwise join selectivity. A missing pair means no join predicate exists,
// so combining those two is a cartesian product.
const SELECTIVITY = {
	"customers|orders": 1e-4,
	"orders|line_items": 2e-7,
};

const KEYS = Object.keys(TABLES);

function selectivityBetween(a, b) {
	return (
		SELECTIVITY[`${a}|${b}`] ?? SELECTIVITY[`${b}|${a}`] ?? 1
	);
}

/* Cost of one left-deep order: the sum of its intermediate result sizes. */
function evaluatePlan(order) {
	const steps = [];
	let size = TABLES[order[0]].filtered;
	const joined = [order[0]];

    for (let i = 1; i < order.length; i += 1) {
		const next = order[i];
		const sel = joined.reduce(
			(acc, t) => acc * selectivityBetween(t, next),
			1
		);
		size = size * TABLES[next].filtered * sel;
		joined.push(next);
		steps.push({
			label: `${joined.slice(0, -1).join(" ⋈ ")} ⋈ ${next}`,
			rows: size,
			cartesian: sel === 1,
		});
	}

	return { steps, cost: steps.reduce((acc, s) => acc + s.rows, 0) };
}

function permutations(items) {
	if (items.length <= 1) return [items];
	return items.flatMap((item, i) =>
		permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [
			item,
			...rest,
		])
	);
}

function formatRows(n) {
	if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
	return Math.round(n).toLocaleString();
}

const ALL_PLANS = permutations(KEYS)
	.map((order) => ({ order, ...evaluatePlan(order) }))
	.sort((a, b) => a.cost - b.cost);

const BEST = ALL_PLANS[0];
const WORST = ALL_PLANS[ALL_PLANS.length - 1];

export default function JoinOrder() {
	const [order, setOrder] = useState([]);

	const complete = order.length === KEYS.length;
	const plan = useMemo(
		() => (complete ? evaluatePlan(order) : null),
		[order, complete]
	);

	const ratio = plan ? plan.cost / BEST.cost : 1;

	return (
		<div className="jo">
			<div className="jo__query mono">
				<span className="jo__kw">select</span> c.name,{" "}
				<span className="jo__kw">count</span>(*)
				<br />
				<span className="jo__kw">from</span> customers c
				<br />
				<span className="jo__kw">join</span> orders o{" "}
				<span className="jo__kw">on</span> o.customer_id = c.id
				<br />
				<span className="jo__kw">join</span> line_items l{" "}
				<span className="jo__kw">on</span> l.order_id = o.id
				<br />
				<span className="jo__kw">where</span> c.country ={" "}
				<span className="jo__str">'IN'</span>
			</div>

			<div className="jo__panel">
				<p className="jo__prompt mono">
					{complete
						? "Join order"
						: `Pick a join order — ${
								KEYS.length - order.length
						  } to go`}
				</p>

				<div className="jo__picker">
					{KEYS.map((key) => {
						const pos = order.indexOf(key);
						const picked = pos !== -1;
						return (
							<button
								key={key}
								type="button"
								className={`jo__table ${picked ? "is-picked" : ""}`}
								onClick={() =>
									!picked && setOrder([...order, key])
								}
								disabled={picked}
							>
								<span className="jo__tableName mono">
									{TABLES[key].label}
								</span>
								<span className="jo__tableRows mono">
									{formatRows(TABLES[key].rows)} rows
									{TABLES[key].filter && (
										<>
											{" → "}
											{formatRows(TABLES[key].filtered)}
										</>
									)}
								</span>
								{picked && (
									<span className="jo__order mono">
										{pos + 1}
									</span>
								)}
							</button>
						);
					})}

					{order.length > 0 && (
						<button
							type="button"
							className="jo__reset"
							onClick={() => setOrder([])}
							aria-label="Reset join order"
						>
							<RotateCcw size={13} strokeWidth={1.7} />
						</button>
					)}
				</div>

				{plan && (
					<div className="jo__result">
						<ol className="jo__steps">
							{plan.steps.map((step) => (
								<li className="jo__step" key={step.label}>
									<span className="jo__stepLabel mono">
										{step.label}
										{step.cartesian && (
											<span className="jo__warn">
												cartesian
											</span>
										)}
									</span>
									<span className="jo__bar" aria-hidden="true">
										<span
											className={`jo__barFill ${
												step.cartesian ? "is-bad" : ""
											}`}
											style={{
												// Log scale: linear would make
												// everything but the worst
												// step invisible.
												width: `${Math.max(
													(Math.log10(step.rows) /
														Math.log10(WORST.cost)) *
														100,
													3
												)}%`,
											}}
										/>
									</span>
									<span className="jo__stepRows mono">
										{formatRows(step.rows)}
									</span>
								</li>
							))}
						</ol>

						<p className="jo__verdict mono">
							<span className="jo__verdictCost">
								{formatRows(plan.cost)} rows
							</span>
							{ratio <= 1.001 ? (
								<span className="jo__badge is-good">
									optimal plan
								</span>
							) : (
								<span className="jo__badge is-bad">
									{ratio >= 100
										? `${formatRows(ratio)}×`
										: `${ratio.toFixed(1)}×`}{" "}
									the optimal plan
								</span>
							)}
						</p>
					</div>
				)}
			</div>

			<details className="jo__all">
				<summary className="mono">All six plans, ranked</summary>
				<ol className="jo__rank">
					{ALL_PLANS.map((p) => {
						const isCurrent =
							complete && p.order.join() === order.join();
						return (
							<li
								key={p.order.join()}
								className={isCurrent ? "is-current" : ""}
							>
								<span className="mono">
									{p.order.join(" → ")}
								</span>
								<span className="mono jo__rankCost">
									{formatRows(p.cost)}
								</span>
							</li>
						);
					})}
				</ol>
			</details>

			<p className="jo__caveat">
				Cost here is the sum of intermediate result sizes, with
				cardinalities estimated under uniform-distribution assumptions
				and physical operators ignored. A real optimiser models far
				more than this. The ranking it produces is still the right one,
				and the spread between best and worst is why the problem is
				worth solving.
			</p>
		</div>
	);
}
