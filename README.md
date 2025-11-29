# Ashmith Maddala – Personal Portfolio

Welcome to my personal portfolio website! This site showcases my skills, projects, and ways to connect with me. Built using modern web technologies, it is fully responsive and easy to customize.

[Live Demo](https://ashmithmaddala.dev/)

---

## Features

- Multi-page layout: Home, About, Projects, Articles, Contact
- Fully responsive and mobile-friendly
- Easy to configure and extend
- SEO optimized for discoverability
- Clean, modern design
- Automatic GitHub repository integration
- Dynamic project filtering

---

## Getting Started

**Clone this repository:**

```bash
git clone https://github.com/ashmithhmaddala/responsive-portfolio-website-Ashmith.git
cd responsive-portfolio-website-Ashmith
```

**Install dependencies:**

```bash
npm install
```

**Run locally:**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization

All major content and configuration are in `/src/data/`:

- `user.js`: Update your name, bio, skills, social links, and project info.
- `articles.js`: Add articles or blog posts.
- `seo.js`: Set SEO titles, descriptions, and keywords for each page.
- `styles.css`: Change color scheme and fonts.

**Images:**  
Place your images (profile, project screenshots, etc.) in the `/public` folder.

**GitHub Integration:**  
The portfolio automatically fetches your public repositories. Customize descriptions in `/src/services/githubService.js` under `REPO_DESCRIPTIONS`.

---

## Folder Structure

- `/public`: Static assets (images, favicon, resume, etc.)
- `/src/components`: Reusable React components
- `/src/data`: Site configuration and content
- `/src/pages`: Main site pages (Home, About, Projects, etc.)
- `/src/services`: GitHub API integration
- `/src/hooks`: Custom React hooks

---

## Deployment

To build the app for production:

```bash
npm run build
```

To deploy to GitHub Pages:

```bash
npm run deploy
```

Deploy the contents of the `build/` folder to your preferred hosting (GitHub Pages, Vercel, Netlify, etc.).

---

## About Me

Hi! I’m Ashmith Maddala, a passionate developer eager to showcase my work and connect with collaborators and employers.  
Feel free to reach out via the [Contact](ashmith.maddala@gmail.com) page or connect with me on [GitHub](https://github.com/ashmithhmaddala) and [LinkedIn](https://www.linkedin.com/in/ashmith-maddala/).

---

## License

This project is open source under the [MIT License](LICENSE).
