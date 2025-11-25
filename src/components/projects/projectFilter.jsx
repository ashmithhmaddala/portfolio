import React from "react";
import "./styles/projectFilter.css";

const ProjectFilter = ({ activeFilter, onFilterChange }) => {
	const filters = ["All", "Security", "ML", "Web", "Python"];

	return (
		<div className="project-filter-container">
			{filters.map((filter) => (
				<button
					key={filter}
					className={`filter-button ${
						activeFilter === filter ? "active" : ""
					}`}
					onClick={() => onFilterChange(filter)}
				>
					{filter}
				</button>
			))}
		</div>
	);
};

export default ProjectFilter;
