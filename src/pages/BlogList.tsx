import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { articles, getLocalizedContent } from '../data/articles';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import './BlogList.css';

export default function BlogList() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter articles based on search query and selected tags
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const titleEn = article.title.en.toLowerCase();
      const titleZh = article.title.zh.toLowerCase();
      const excerptEn = article.excerpt.en.toLowerCase();
      const excerptZh = article.excerpt.zh.toLowerCase();
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        searchQuery === '' ||
        titleEn.includes(searchLower) ||
        titleZh.includes(searchLower) ||
        excerptEn.includes(searchLower) ||
        excerptZh.includes(searchLower);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => article.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="blog-list">
      <div className="container">
        <h1>{t('blog.title')}</h1>

        <SearchBar
          onSearch={setSearchQuery}
          placeholder={t('blog.searchPlaceholder')}
        />

        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />

        <p className="results-count">
          {t('blog.articlesFound', { count: filteredArticles.length })}
        </p>

        <div className="articles">
          {filteredArticles.map((article) => (
            <article key={article.id} className="blog-article">
              <Link to={`/blog/${article.id}`} className="blog-article-link">
                <h2>{getLocalizedContent(article.title, i18n.language)}</h2>
                <p className="excerpt">{getLocalizedContent(article.excerpt, i18n.language)}</p>
                <div className="meta">
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
              </Link>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="no-results">
            <p>{t('blog.noResults')}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
              }}
            >
              {t('blog.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
