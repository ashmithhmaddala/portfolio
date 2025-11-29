/**
 * GitHub API Service
 * Fetches public repositories from a GitHub user account
 */

const GITHUB_USERNAME = "ashmithhmaddala";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Custom descriptions for repos (override GitHub descriptions if they're null)
const REPO_DESCRIPTIONS = {
	"cli-packet-analyzer":
		"A powerful command-line packet analyzer optimized for Kali Linux. Captures live network traffic, analyzes PCAP files, and extracts protocol information with support for Ethernet, ARP, IPv4, TCP, UDP, ICMP, DNS, and HTTP protocols.",
	"crime-rate-predictor":
		"This project is a machine learning-powered dashboard for predicting and analyzing theft crimes in Bengaluru using real-world-inspired datasets. It includes model training, interactive analytics, and a Streamlit web app with an interactive map.",
	"portfolio":
		"A responsive personal portfolio built with React, showcasing projects, resume, and contact information. Features dark mode, smooth animations, and dynamic GitHub integration.",
	"ai-vulnerability-scanner":
		"An AI-powered security tool that automatically scans codebases for vulnerabilities, security flaws, and potential exploits using machine learning and pattern recognition.",
	"ashmithhmaddala.github.io":
		"Personal GitHub Pages website hosting portfolio content and project showcases.",
	"new-portfolio":
		"Modern portfolio website built with Astro, featuring fast performance, optimized loading, and contemporary design patterns.",
	"chef-game":
		"An interactive cooking game built with JavaScript, challenging players to prepare dishes under time pressure with dynamic gameplay mechanics.",
	"CivicPulse":
		"A civic engagement platform designed to connect citizens with local government initiatives, featuring real-time updates and community interaction tools.",
	"python-chess-engine":
		"A Python-based chess engine implementing the Universal Chess Interface (UCI) protocol, featuring a basic minimax search algorithm and modular design. Built for learning and experimentation.",
	"Red-vs-Blue-CTF-Platform":
		"A Capture The Flag (CTF) platform for cybersecurity training, enabling red team vs blue team competitions with real-world security challenges and scenarios.",
	"jamal":
		"JavaScript-based application for task management and productivity tracking with modern UI/UX design.",
};

// Language to logo mapping
const LANGUAGE_LOGOS = {
	Python: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
	JavaScript: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
	TypeScript: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/typescript/typescript.png",
	Java: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/java/java.png",
	"C++": "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png",
	C: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/c/c.png",
	Go: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/go/go.png",
	Rust: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/rust/rust.png",
	Ruby: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/ruby/ruby.png",
	PHP: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/php/php.png",
	Swift: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
	Kotlin: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/kotlin/kotlin.png",
	HTML: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
	CSS: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/css/css.png",
	default: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
};

// Topic to tag mapping for filtering
const TOPIC_TO_TAG = {
	security: "Security",
	"machine-learning": "ML",
	ml: "ML",
	ai: "ML",
	web: "Web",
	"web-development": "Web",
	python: "Python",
	javascript: "Web",
	react: "Web",
	flask: "Web",
	django: "Web",
};

// Repository name to category mapping (for repos without topics)
const REPO_CATEGORY_MAP = {
	"cli-packet-analyzer": ["Security", "Python"],
	"crime-rate-predictor": ["ML", "Python"],
	"ai-vulnerability-scanner": ["Security", "ML", "Python"],
	portfolio: ["Web"],
	"ashmithhmaddala.github.io": ["Web"],
	"new-portfolio": ["Web"],
	"chef-game": ["Web"],
	CivicPulse: ["Web"],
	"python-chess-engine": ["Python"],
	"Red-vs-Blue-CTF-Platform": ["Security", "Web"],
	jamal: ["Web"],
};

/**
 * Fetches all public repositories from GitHub
 * @returns {Promise<Array>} Array of formatted repository objects
 */
export const fetchGitHubRepos = async () => {
	try {
		// Fetch repositories with sorting by updated date
		const response = await fetch(
			`${GITHUB_API_URL}?sort=updated&per_page=100`,
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos = await response.json();

		// Filter out forks and private repos, then format the data
		const formattedRepos = repos
			.filter((repo) => !repo.fork && !repo.private)
			.map((repo) => {
				// Use custom description if available, otherwise use GitHub description
				const description =
					REPO_DESCRIPTIONS[repo.name] ||
					repo.description ||
					`A ${repo.language || "software"} project for ${repo.name
						.split("-")
						.join(" ")}`;

				return {
					title: repo.name
						.split("-")
						.map(
							(word) =>
								word.charAt(0).toUpperCase() + word.slice(1)
						)
						.join(" "),
					description: description,
					logo: LANGUAGE_LOGOS[repo.language] || LANGUAGE_LOGOS.default,
					linkText: "View Project",
					link: repo.html_url,
					tags: extractTags(repo),
					stars: repo.stargazers_count,
					language: repo.language,
					updated: repo.updated_at,
				};
			})
			.sort((a, b) => b.stars - a.stars); // Sort by stars

		return formattedRepos;
	} catch (error) {
		console.error("Error fetching GitHub repositories:", error);
		throw error;
	}
};

/**
 * Extracts tags from repository topics and language
 * @param {Object} repo - GitHub repository object
 * @returns {Array} Array of tags
 */
const extractTags = (repo) => {
	const tags = new Set();

	// Add predefined categories for known repos
	if (REPO_CATEGORY_MAP[repo.name]) {
		REPO_CATEGORY_MAP[repo.name].forEach((tag) => tags.add(tag));
	}

	// Add language as a tag if it's Python
	if (repo.language === "Python") {
		tags.add("Python");
	}

	// Map JavaScript/HTML/CSS to Web
	if (["JavaScript", "HTML", "CSS", "TypeScript"].includes(repo.language)) {
		tags.add("Web");
	}

	// Map topics to tags
	if (repo.topics && repo.topics.length > 0) {
		repo.topics.forEach((topic) => {
			const mappedTag = TOPIC_TO_TAG[topic.toLowerCase()];
			if (mappedTag) {
				tags.add(mappedTag);
			}
		});
	}

	return Array.from(tags);
};

/**
 * Fetches a single repository's details
 * @param {string} repoName - Name of the repository
 * @returns {Promise<Object>} Formatted repository object
 */
export const fetchSingleRepo = async (repoName) => {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`,
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repo = await response.json();

		return {
			title: repo.name
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" "),
			description: repo.description || "No description available",
			logo: LANGUAGE_LOGOS[repo.language] || LANGUAGE_LOGOS.default,
			linkText: "View Project",
			link: repo.html_url,
			tags: extractTags(repo),
			stars: repo.stargazers_count,
			language: repo.language,
			updated: repo.updated_at,
		};
	} catch (error) {
		console.error(`Error fetching repository ${repoName}:`, error);
		throw error;
	}
};

const githubService = { fetchGitHubRepos, fetchSingleRepo };
export default githubService;
