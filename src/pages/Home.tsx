import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articles, getLocalizedContent } from '../data/articles';
import './Home.css';

export function Home() {
  const { t, i18n } = useTranslation();
  const featuredArticles = articles.slice(0, 3);
  const currentLang = i18n.language;

  return (
    <div className="home">
      <section className="hero">
        <h1>{t('home.welcome')}</h1>
        <p className="hero-subtitle">{t('home.subtitle')}</p>
      </section>

      <section className="featured-section">
        <h2>{t('home.featuredArticles')}</h2>
        <div className="articles-grid">
          {featuredArticles.map((article) => (
            <article key={article.id} className="article-card">
              <Link to={`/blog/${article.id}`} className="article-link">
                <h3>{getLocalizedContent(article.title, currentLang)}</h3>
                <p className="article-excerpt">{getLocalizedContent(article.excerpt, currentLang)}</p>
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">{t('blog.readTime', { count: article.readTime })}</span>
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
        <h2>{t('home.techStack')}</h2>
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
