const INFO = {
	main: {
		title: "Portfolio by Ashmith Maddala",
		name: "Ashmith Maddala",
		email: "ashmith.maddala@gmail.com",
		logo: "../logo.png",
	},

	socials: {
		twitter: "https://x.com/axmxtxh",
		github: "https://github.com/ashmithhmaddala",
		linkedin: "https://www.linkedin.com/in/ashmith-maddala/",
		instagram: "https://www.instagram.com/ashmith.xd/",
	},

	homepage: {
		title: "Product Security Intern securing systems one vulnerability at a time (and lifting weights in between)",
		description:
			"I'm a cybersecurity enthusiast and Product Security Intern at Vontier, focused on identifying vulnerabilities, conducting security assessments, and building secure systems. My work involves threat modeling, penetration testing, secure code review, and developing security automation tools. I'm passionate about offensive and defensive security, constantly learning new attack vectors and defense mechanisms. I enjoy breaking things to understand how to better protect them, and I'm driven by the mission to make software more resilient against real-world threats.",
	},

	about: {
		title: "I'm Ashmith Maddala. I live in Bangalore, IN, where I secure systems and hunt for vulnerabilities.",
		description:
			"I'm a cybersecurity professional passionate about product security, application security, and building resilient systems. Currently working as a Product Security Intern at Vontier, I focus on identifying security vulnerabilities, conducting penetration tests, and implementing security best practices. My journey spans from developing security tools and automation scripts to understanding attack patterns and defense strategies. I enjoy the challenge of thinking like an attacker to build better defenses. Many of my security projects and tools are available on GitHub. I believe in continuous learning, responsible disclosure, and making the digital world a safer place. If you're interested in security collaboration, let's connect.",
	},

	articles: {
		title: "Life beyond the terminal: fitness, food, and finding balance.",
		description:
			"When I'm not hunting vulnerabilities or securing systems, I'm focused on personal growth, fitness, and staying balanced. Here's a glimpse into my life outside of cybersecurity - what I'm learning, reading, and exploring beyond the screen.",
	},

	works: [
		{
			company: "Vontier",
			position: "Product Security Intern",
			duration: "July 2025 - Present",
			logo: "Vontier_logo.svg.png",
			description: "I focus on identifying vulnerabilities early in the development lifecycle and helping engineering teams build safer, more resilient products. My work spans application security reviews, threat modelling, and contributing to secure SDLC practices that reduce risk before products ship.",
			responsibilities: [
				"Conduct application security reviews and vulnerability assessments across the product development lifecycle",
				"Perform threat modelling and analyze attack paths to identify security risks in system design",
				"Build internal security automation tools to streamline the product security pipeline and reduce repetitive manual tasks",
				"Collaborate with engineering teams to implement secure SDLC practices and provide actionable security guidance",
			],
		},
	],

	skills: {
		security: [
			"Application Security",
			"Threat Modelling",
			"Secure SDLC",
			"Vulnerability Assessment",
			"OWASP Top 10",
			"Security Code Review",
		],
		tools: [
			"Burp Suite",
			"Nmap",
			"Wireshark",
			"OWASP ZAP",
			"Metasploit",
		],
		languages: [
			"Python",
			"JavaScript",
			"Bash",
			"SQL",
		],
		platforms: [
			"Linux",
			"Git",
			"Docker",
			"AWS",
		],
	},

	projects: [
		{
			title: "CLI Packet Analyzer",
			description:
				"A powerful command-line packet analyzer optimized for Kali Linux. Captures live network traffic, analyzes PCAP files, and extracts protocol information with support for Ethernet, ARP, IPv4, TCP, UDP, ICMP, DNS, and HTTP protocols. Features BPF filtering, JSON output, and Python module API.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/cli-packet-analyzer",
			tags: ["Security", "Python"],
		},

		{
			title: "Crime Rate Prediction System",
			description:
				"This project is a machine learning-powered dashboard for predicting and analyzing theft crimes in Bengaluru using real-world-inspired datasets. It includes model training, interactive analytics, and a Streamlit web app with an interactive map.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/crime-rate-prediction",
			tags: ["ML", "Python"],
		},

		{
			title: "Portfolio Website",
			description:
				"A responsive personal portfolio built with HTML, CSS, and JavaScript, customized from an open-source template to showcase my projects, resume, and contact info.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/portfolio",
			tags: ["Web"],
		},

		{
			title: "Job Board Engineer",
			description:
				"A Flask web application to track job postings from top companies in India (Bangalore, Hyderabad, Mumbai) with user authentication, admin dashboard, and job management.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/job-board-app",
			tags: ["Web", "Python"],
		},

		{
			title: "Learnsmart Engineer",
			description:
				"LearnSmart is an AI-powered web app that analyzes student learning patterns and recommends personalized skill improvements based on past performance.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/learnsmart-engineer",
			tags: ["ML", "Web"],
		},

		{
			title: "Python Chess Engine",
			description:
				"A Python-based chess engine implementing the Universal Chess Interface (UCI) protocol, featuring a basic minimax search algorithm and modular design. Built for learning and experimentation, it can play legal chess games against GUIs like Cute Chess or other engines.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/ashmithhmaddala/python-chess-engine",
			tags: ["Python"],
		},

		// {
		// 	title: "Weather App (API Integration)",
		// 	description:
		// 		"A JavaScript-based weather app that fetches real-time data using the OpenWeatherMap API and displays it with dynamic UI components.",
		// 	logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
		// 	linkText: "View Project",
		// 	link: "https://github.com/ashmithhmaddala/Weather-App",
		// },
	],
};

export default INFO;
