import './TagFilter.css';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="tag-filter">
      <h3>Filter by tags</h3>
      <div className="tag-list">
        <button
          className={`tag-button ${selectedTags.length === 0 ? 'active' : ''}`}
          onClick={() => {
            selectedTags.forEach(tag => onTagToggle(tag));
          }}
        >
          All
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
