import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						{/* You can leave this empty, or add a message */}
						<div className="no-work-message">
							Currently focusing on personal projects and learning. Excited to add professional experience soon!
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
