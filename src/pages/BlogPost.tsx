import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import './BlogPost.css';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="blog-post">
        <div className="container">
          <h1>Article Not Found</h1>
          <Link to="/blog">← Back to articles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to articles
        </Link>

        <article className="article-content">
          <header className="article-header">
            <h1>{article.title}</h1>
            <div className="article-meta">
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
          </header>

          <div className="article-body">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="markdown-h1">
                    {paragraph.slice(2)}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="markdown-h2">
                    {paragraph.slice(3)}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="markdown-h3">
                    {paragraph.slice(4)}
                  </h3>
                );
              }
              if (paragraph.trim().startsWith('- ')) {
                return (
                  <li key={index} className="markdown-li">
                    {paragraph.slice(2)}
                  </li>
                );
              }
              if (paragraph.trim().match(/^\d+\./)) {
                return (
                  <li key={index} className="markdown-li">
                    {paragraph}
                  </li>
                );
              }
              if (paragraph.includes('```')) {
                return null; // Skip code block markers for now
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} className="markdown-p">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
