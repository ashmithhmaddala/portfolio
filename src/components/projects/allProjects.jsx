import React, { useState } from "react";

import Project from "./project";
import ProjectFilter from "./projectFilter";

import INFO from "../../data/user";

import "./styles/allProjects.css";

const AllProjects = () => {
	const [activeFilter, setActiveFilter] = useState("All");

	const filteredProjects = INFO.projects.filter((project) => {
		if (activeFilter === "All") return true;
		return project.tags && project.tags.includes(activeFilter);
	});

	return (
		<div className="all-projects-container">
			<div className="projects-header">
				<div className="projects-title">Projects</div>
				<div className="projects-subtitle">
					Things I've built and worked on
				</div>
			</div>
			<ProjectFilter
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
			/>
			{filteredProjects.map((project, index) => (
				<div className="all-projects-project" key={index}>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllProjects;
