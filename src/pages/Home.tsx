import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articles, getLocalizedContent } from '../data/articles';
import './Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const featuredArticles = articles.slice(0, 3);
  const recentArticles = articles.slice(3, 8);
  const currentLang = i18n.language;

  return (
    <div className="home">
      <section className="hero">
        <h1>{t('home.welcome')}</h1>
        <p className="hero-subtitle">{t('home.subtitle')}</p>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>{t('home.featuredArticles')}</h2>
          <Link to="/blog" className="view-all-link">
            {t('home.viewAll')}
          </Link>
        </div>
        <div className="articles-grid">
          {featuredArticles.map((article) => (
            <article key={article.id} className="article-card featured">
              <Link to={`/blog/${article.id}`} className="article-link">
                <h3>{getLocalizedContent(article.title, currentLang)}</h3>
                <p className="article-excerpt">{getLocalizedContent(article.excerpt, currentLang)}</p>
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-read-time">{t('blog.readTime', { count: article.readTime })}</span>
                </div>
                <div className="article-tags">
                  {article.tags.slice(0, 3).map((tag) => (
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

      {recentArticles.length > 0 && (
        <section className="recent-section">
          <div className="section-header">
            <h2>{t('home.recentArticles')}</h2>
            <Link to="/blog" className="view-all-link">
              {t('home.viewAll')}
            </Link>
          </div>
          <div className="articles-list">
            {recentArticles.map((article) => (
              <article key={article.id} className="article-item">
                <Link to={`/blog/${article.id}`} className="article-link">
                  <h3>{getLocalizedContent(article.title, currentLang)}</h3>
                  <p className="article-excerpt">{getLocalizedContent(article.excerpt, currentLang)}</p>
                  <div className="article-meta">
                    <span className="article-date">{article.date}</span>
                    <span className="article-read-time">{t('blog.readTime', { count: article.readTime })}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
