import React from "react";

function article_medium() {
  return {
    date: "2 May 2025",
    title: "How my technical career changed the way I solve everyday problems",
    description:
      "Exploring how my journey in tech has influenced my approach to daily challenges.",
    keywords: [
      "Technical Career",
      "Problem Solving",
      "Ashmith Maddala",
      "Medium Article",
    ],
    style: `
      .article-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }

      .article-content h2 {
        font-size: 1.8rem;
        margin-bottom: 10px;
      }

      .article-content p {
        font-size: 1rem;
        line-height: 1.6;
        text-align: justify;
      }

      .article-content a {
        margin-top: 20px;
        font-weight: bold;
        color: #007acc;
        text-decoration: none;
      }

      .article-content a:hover {
        text-decoration: underline;
      }
    `,
    body: (
      <React.Fragment>
        <div className="article-content">
          <h2>
            How my technical career changed the way I solve everyday problems
          </h2>
          <p>
            In this article, I delve into how my experiences in the tech
            industry have reshaped my approach to tackling daily challenges.
            From adopting systematic problem-solving techniques to leveraging
            technology for efficiency, my journey offers insights into the
            transformative power of a technical career.
          </p>
          <a
            href="https://medium.com/@ashmith.maddala/how-my-technical-career-changed-the-way-i-solve-everyday-problems-8ca6757f1c48"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the full article on Medium
          </a>
        </div>
      </React.Fragment>
    ),
  };
}

const myArticles = [article_medium];

export default myArticles;
