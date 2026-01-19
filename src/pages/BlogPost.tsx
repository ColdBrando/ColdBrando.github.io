import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { articles, getLocalizedContent } from '../data/articles';
import './BlogPost.css';
import 'highlight.js/styles/github-dark.css';

export function BlogPost() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="blog-post">
        <div className="container">
          <h1>{t('blog.articleNotFound')}</h1>
          <Link to="/blog">{t('blog.backToArticles')}</Link>
        </div>
      </div>
    );
  }

  const currentLang = i18n.language;

  return (
    <div className="blog-post">
      <div className="container">
        <Link to="/blog" className="back-link">
          {t('blog.backToArticles')}
        </Link>

        <article className="article-content">
          <header className="article-header">
            <h1>{getLocalizedContent(article.title, currentLang)}</h1>
            <div className="article-meta">
              <span className="date">{article.date}</span>
              <span className="read-time">{t('blog.readTime', { count: article.readTime })}</span>
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {getLocalizedContent(article.content, currentLang)}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
