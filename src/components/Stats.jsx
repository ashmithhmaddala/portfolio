import { STATS } from "../data/profile";
import { useGitHubStats } from "../hooks/useGitHubStats";
import Counter from "./ui/Counter";
import Reveal from "./ui/Reveal";
import "./stats.css";

export default function Stats() {
	const github = useGitHubStats();

	return (
		<section className="section section--tight statsSection">
			<div className="container">
				<div className="stats">
					{STATS.map((stat, i) => {
						// Swap in the live figure when GitHub answered.
						const isLive = stat.live && github?.[stat.live] != null;
						const value = isLive
							? github[stat.live]
							: stat.value;

						return (
							<Reveal
								key={stat.label}
								delay={i * 0.07}
								className="stat"
							>
								<div className="stat__value">
									<Counter
										value={value}
										suffix={stat.suffix}
									/>
								</div>
								<div className="stat__label">
									{stat.label}
									{isLive && (
										<span
											className="stat__live"
											title="Pulled live from the GitHub API"
										>
											live
										</span>
									)}
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
