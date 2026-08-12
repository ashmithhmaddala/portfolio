import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageTitle } from "../hooks/usePage";
import Reveal from "../components/Reveal";
import ToolPoisoning from "../components/lab/ToolPoisoning";
import Biometrics from "../components/lab/Biometrics";
import AttackChain from "../components/lab/AttackChain";
import Beaconing from "../components/lab/Beaconing";
import "./lab.css";

/*
 * One demo per security project. Each is the claim its case study can only
 * assert — the thing you have to do to believe.
 */
const DEMOS = [
	{
		id: "tool-poisoning",
		num: "01",
		title: "The document you never read",
		project: "theriac",
		to: "/work/theriac",
		blurb:
			"An MCP client shows a tool's name and a one-line summary. The model receives the entire description. Anything in the difference is acted on and never displayed. Switch between the two views and the gap is the whole attack.",
		Component: ToolPoisoning,
	},
	{
		id: "biometrics",
		num: "02",
		title: "How you move gives you away",
		project: "Turing Defense",
		to: "/work/turing-defense",
		blurb:
			"Move your pointer through the panel. Four behavioural features are extracted live from that motion, then compare them against a scripted path. The gap between the two is why bot detection can work without a CAPTCHA.",
		Component: Biometrics,
	},
	{
		id: "attack-chain",
		num: "03",
		title: "Five alerts nobody reads, or one nobody ignores",
		project: "TACTIC",
		to: "/work/tactic",
		blurb:
			"Play the stream. Every line is below the alerting threshold on its own, which is exactly why a signature-based system misses the intrusion. Correlated on subject and time, the same five lines are a complete kill chain.",
		Component: AttackChain,
	},
	{
		id: "beaconing",
		num: "04",
		title: "An implant can hide its payload, not its rhythm",
		project: "NetProbe",
		href: "https://github.com/ashmithhmaddala/NetProbe",
		blurb:
			"Three hosts, one calling home on a schedule. Detection is timing alone, with no payload inspected. Drag the jitter control to find the point where it stops working, because that boundary is what implants are tuned against.",
		Component: Beaconing,
	},
];

export default function Lab() {
	usePageTitle("Lab");

	return (
		<div className="page">
			<div className="wrap">
				<header className="page__head">
					<h1 className="lead page__title">
						Four ideas from the security work, running in the page.
					</h1>
					<p className="page__lede">
						Each one is the part of a project that is easier to do
						than to describe. Nothing here executes anything, no
						data leaves the page, and the demos are simplifications
						of the real tools rather than the tools themselves.
					</p>
				</header>

				{DEMOS.map(({ id, num, title, project, to, href, blurb, Component }) => (
					<section className="demo" id={id} key={id}>
						<Reveal>
							<h2 className="label">
								<span className="label__num">{num}</span>
								<span>{title}</span>
								<span className="label__rule" aria-hidden="true" />
							</h2>

							<p className="demo__blurb">{blurb}</p>

							<p className="demo__link mono">
								{to ? (
									<Link className="link" to={to}>
										{project}
										<ArrowUpRight size={11} strokeWidth={1.8} />
									</Link>
								) : (
									<a
										className="link"
										href={href}
										target="_blank"
										rel="noreferrer"
									>
										{project}
										<ArrowUpRight size={11} strokeWidth={1.8} />
									</a>
								)}
							</p>
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
