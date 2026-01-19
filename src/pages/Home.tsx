import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import './Home.css';

export function Home() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to My Blog</h1>
        <p className="hero-subtitle">Exploring Technology, Architecture, and Engineering</p>
      </section>

      <section className="featured-section">
        <h2>Featured Articles</h2>
        <div className="articles-grid">
          {featuredArticles.map((article) => (
            <article key={article.id} className="article-card">
              <Link to={`/blog/${article.id}`} className="article-link">
                <h3>{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">{article.readTime} min read</span>
                </div>
                <div className="article-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="tech-stack">
        <h2>Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">React</div>
          <div className="tech-item">TypeScript</div>
          <div className="tech-item">Vite</div>
          <div className="tech-item">React Router</div>
        </div>
      </section>
    </div>
  );
}
