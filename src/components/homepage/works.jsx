import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import INFO from "../../data/user";
import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						{INFO.works.map((work, index) => (
							<div className="work" key={index}>
								<img
									src={work.logo}
									alt=""
									className="work-image"
								/>
								<div className="work-content">
									<div className="work-title">{work.position}</div>
									<div className="work-subtitle">{work.duration}</div>
								</div>
							</div>
						))}
					</div>
				}
			/>
		</div>
	);
};

export default Works;
