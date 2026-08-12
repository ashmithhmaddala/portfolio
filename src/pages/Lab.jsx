import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageTitle } from "../hooks/usePage";
import Reveal from "../components/Reveal";
import ToolPoisoning from "../components/lab/ToolPoisoning";
import AlphaBeta from "../components/lab/AlphaBeta";
import JoinOrder from "../components/lab/JoinOrder";
import "./lab.css";

/*
 * Three ideas from the work, made touchable rather than described. Each one
 * is the thing a case study can only assert.
 */
const DEMOS = [
	{
		id: "tool-poisoning",
		num: "01",
		title: "The document you don't read",
		blurb:
			"An MCP client shows you a tool's name and a one-line summary. The model gets the whole description. Anything in the difference is acted on and never displayed. Switch between the two views and watch the gap.",
		link: { to: "/work/theriac", label: "theriac" },
		Component: ToolPoisoning,
	},
	{
		id: "alpha-beta",
		num: "02",
		title: "Why a search engine skips most of the tree",
		blurb:
			"Alpha-beta returns exactly the same answer as plain minimax while visiting a fraction of the positions. Step through it and watch two leaves get proven irrelevant before they are ever read.",
		link: {
			href: "https://github.com/ashmithhmaddala/python-chess-engine",
			label: "python-chess-engine",
		},
		Component: AlphaBeta,
	},
	{
		id: "join-order",
		num: "03",
		title: "Why join order is worth learning",
		blurb:
			"The same three-table query, six possible orders, and about four orders of magnitude between the best and the worst. Build an order and see what it costs. This is the search space my final-year research pointed reinforcement learning at.",
		Component: JoinOrder,
	},
];

export default function Lab() {
	usePageTitle("Lab");

	return (
		<div className="page">
			<div className="wrap">
				<header className="page__head">
					<h1 className="lead page__title">
						Three things from the work that are easier to show than
						to describe.
					</h1>
					<p className="page__lede">
						Everything below runs in the page. No data leaves it,
						and nothing here executes anything.
					</p>
				</header>

				{DEMOS.map(({ id, num, title, blurb, link, Component }) => (
					<section className="demo" id={id} key={id}>
						<Reveal>
							<h2 className="label">
								<span className="label__num">{num}</span>
								<span>{title}</span>
								<span
									className="label__rule"
									aria-hidden="true"
								/>
							</h2>

							<p className="demo__blurb">{blurb}</p>

							{link && (
								<p className="demo__link mono">
									{link.to ? (
										<Link className="link" to={link.to}>
											{link.label}
											<ArrowUpRight
												size={11}
												strokeWidth={1.8}
											/>
										</Link>
									) : (
										<a
											className="link"
											href={link.href}
											target="_blank"
											rel="noreferrer"
										>
											{link.label}
											<ArrowUpRight
												size={11}
												strokeWidth={1.8}
											/>
										</a>
									)}
								</p>
							)}
						</Reveal>

						<Reveal className="demo__stage">
							<Component />
						</Reveal>
					</section>
				))}
			</div>
		</div>
	);
}
