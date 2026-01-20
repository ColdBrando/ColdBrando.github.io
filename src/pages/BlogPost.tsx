import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { articles, getLocalizedContent } from '../data/articles';
import Paywall from '../components/Paywall';
import './BlogPost.css';
import 'highlight.js/styles/github-dark.css';

export default function BlogPost() {
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
  const isPaid = article.isPaid || false;

  // Use preview content for paid articles, full content for free articles
  // Preview is already truncated plain text, no decryption needed
  const displayContent = isPaid
    ? (currentLang === 'zh' ? article.contentPreviewZh : article.contentPreviewEn)
    : (currentLang === 'zh' ? article.contentZh : article.contentEn);

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
              <span className="views">
                <span className="busuanzi-container">
                  {t('blog.views')}: <span id="busuanzi_value_page_pv">-</span>
                </span>
              </span>
              {isPaid && <span className="paid-badge">付费内容</span>}
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
              {displayContent}
            </ReactMarkdown>
            {isPaid && <Paywall />}
          </div>
        </article>
      </div>
    </div>
  );
}
