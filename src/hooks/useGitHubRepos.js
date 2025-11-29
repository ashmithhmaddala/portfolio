import { useState, useEffect } from "react";
import { fetchGitHubRepos } from "../services/githubService";

/**
 * Custom hook to fetch and manage GitHub repositories
 * @param {Array} fallbackProjects - Manual projects to use as fallback
 * @returns {Object} { projects, loading, error }
 */
const useGitHubRepos = (fallbackProjects = []) => {
	const [projects, setProjects] = useState(fallbackProjects);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const loadRepos = async () => {
			try {
				setLoading(true);
				setError(null);

				const repos = await fetchGitHubRepos();

				if (isMounted) {
					// If GitHub API returns repos, use them; otherwise use fallback
					if (repos && repos.length > 0) {
						setProjects(repos);
					} else {
						setProjects(fallbackProjects);
					}
					setLoading(false);
				}
			} catch (err) {
				console.error("Failed to fetch GitHub repos:", err);
				if (isMounted) {
					setError(err.message);
					// Use fallback projects on error
					setProjects(fallbackProjects);
					setLoading(false);
				}
			}
		};

		loadRepos();

		// Cleanup function to prevent state updates on unmounted component
		return () => {
			isMounted = false;
		};
	}, [fallbackProjects]); // eslint-disable-line react-hooks/exhaustive-deps

	return { projects, loading, error };
};

export default useGitHubRepos;
