import { useTranslation } from 'react-i18next';
import './TagFilter.css';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="tag-filter">
      <h3>{t('blog.filterByTags')}</h3>
      <div className="tag-list">
        <button
          className={`tag-button ${selectedTags.length === 0 ? 'active' : ''}`}
          onClick={() => {
            selectedTags.forEach(tag => onTagToggle(tag));
          }}
        >
          {t('blog.all')}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
