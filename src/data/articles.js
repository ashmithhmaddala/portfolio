import React from "react";

function article_fitness() {
  return {
    date: "November 2025",
    title: "Beyond the terminal: how I stay balanced outside of cybersecurity",
    description:
      "A glimpse into my life beyond work - fitness, football, personal growth, and the small adventures that keep me grounded.",
    keywords: [
      "Personal Growth",
      "Fitness",
      "Work-Life Balance",
      "Ashmith Maddala",
    ],
    style: `
      .article-content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        line-height: 1.8;
      }

      .article-content h2 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        margin-top: 30px;
        color: var(--primary-color);
        transition: color 0.3s ease;
      }

      .article-content p {
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 15px;
        color: var(--secondary-color);
        transition: color 0.3s ease;
      }

      .article-content strong {
        color: var(--primary-color);
        font-weight: 600;
        transition: color 0.3s ease;
      }
    `,
    body: (
      <React.Fragment>
        <div className="article-content">
          <h2>Fitness & Movement</h2>
          <p>
            When I'm not hunting vulnerabilities or analyzing security systems, you'll find me at the gym - mostly lifting, with some cardio when I need to reset my mind. There's something grounding about physical training that balances the mental intensity of security work.
          </p>
          <p>
            I also enjoy long evening walks around Bangalore. They're perfect for clearing my head after a day of deep focus. Football is another passion - I play whenever I can, and I'm a die-hard Barca supporter. Messi is my GOAT, no debate.
          </p>

          <h2>Food & Exploration</h2>
          <p>
            I like balanced eating, but I'm not strict about it. Food is meant to be enjoyed, not calculated. I love exploring new cafés and restaurants around the city, experimenting with different cuisines. It's less about following a fixed diet and more about discovering great food experiences.
          </p>

          <h2>Personal Growth</h2>
          <p>
            I lean toward self-growth and mindset books - things like <strong>Atomic Habits</strong> and <strong>The Subtle Art of Not Giving a F*ck</strong> really resonate with me. I also keep up with self-improvement and productivity creators on YouTube and Instagram. The goal is simple: become a better version of myself every year.
          </p>
          <p>
            Outside of work, I'm working on improving my communication skills, personal branding, and content creation. I enjoy designing small digital layouts and organizing things aesthetically. Call it productivity experiments or just finding what works for me.
          </p>

          <h2>Cybersecurity & Community</h2>
          <p>
            While I'm exploring cybersecurity certifications at my own pace (no rush to lock anything in), I stay connected to a few college tech groups and occasionally hop into CTF or cyber-related servers. I join CTFs when the vibe is fun - not as a serious grind, just for the learning and challenge.
          </p>
          <p>
            I'd love to attend <strong>DEF CON</strong> someday and more local Bengaluru tech/cyber meetups. There's always something valuable in connecting with people who share the same interests.
          </p>

          <h2>Travel & Life Goals</h2>
          <p>
            I'm drawn to discovering new cities. <strong>Goa, Dubai, and Singapore</strong> are on my list. I enjoy short, refreshing trips that break the routine. Travel isn't just about the destination - it's about the experience and perspective you gain.
          </p>
          <p>
            My bigger goals? Travel more, build a solid lifestyle routine, and shape a career I feel proud of. I want to keep growing in how I think, work, and carry myself.
          </p>

          <h2>How I Maintain Balance</h2>
          <p>
            Work-life balance for me means knowing when to unplug. I hit the gym, go for walks, watch feel-good movies, listen to chill music, and spend time with people who energize me. It's not about rigid routines - it's about doing what feels right in the moment.
          </p>
          <p>
            At the end of the day, I'm just someone who enjoys the small adventures in life, whether it's a new café, a pickup football game, or a deep conversation with friends. That balance keeps me sharp at work and happy outside of it.
          </p>
        </div>
      </React.Fragment>
    ),
  };
}

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

const myArticles = [article_fitness, article_medium];

export default myArticles;
