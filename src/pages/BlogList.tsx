import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import './BlogList.css';

export function BlogList() {
  return (
    <div className="blog-list">
      <div className="container">
        <h1>All Articles</h1>
        <div className="articles">
          {articles.map((article) => (
            <article key={article.id} className="blog-article">
              <Link to={`/blog/${article.id}`} className="blog-article-link">
                <h2>{article.title}</h2>
                <p className="excerpt">{article.excerpt}</p>
                <div className="meta">
                  <span className="date">{article.date}</span>
                  <span className="read-time">{article.readTime} min read</span>
                </div>
                <div className="tags">
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
      </div>
    </div>
  );
}
