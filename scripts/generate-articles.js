import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/articles');
const outputFile = path.join(__dirname, '../src/data/articles-data.generated.ts');

// Article metadata configuration
const articlesConfig = {
  '1-edge-computing': {
    date: '2026-01-19',
    tags: ['Architecture', 'Cloud', 'Infrastructure'],
    readTime: 5,
  },
  '2-react-typescript': {
    date: '2026-01-18',
    tags: ['React', 'TypeScript', 'Frontend'],
    readTime: 7,
  },
  '3-distributed-systems': {
    date: '2026-01-17',
    tags: ['Distributed Systems', 'Architecture', 'Backend'],
    readTime: 8,
  },
  '4-dda-architecture': {
    date: '2026-01-20',
    tags: ['DDD', 'Android', 'Architecture', 'Proto'],
    readTime: 10,
  },
};

// Extract title from markdown (first h1)
function extractTitle(content, lang) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }
  return lang === 'en' ? 'Untitled' : '未命名';
}

// Extract excerpt (first paragraph after title)
function extractExcerpt(content, lang) {
  const lines = content.split('\n');
  let inTitle = true;
  for (const line of lines) {
    const trimmed = line.trim();
    if (inTitle) {
      if (!trimmed.startsWith('#')) {
        inTitle = false;
      } else {
        continue;
      }
    }
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```')) {
      return trimmed.substring(0, 150) + '...';
    }
  }
  return lang === 'en' ? 'No excerpt available' : '暂无摘要';
}

// Generate articles data
function generateArticlesData() {
  const articles = [];

  for (const [articleId, config] of Object.entries(articlesConfig)) {
    const articleDir = path.join(articlesDir, articleId);

    // Check if article directory exists
    if (!fs.existsSync(articleDir)) {
      console.warn(`Article directory not found: ${articleId}`);
      continue;
    }

    // Read English and Chinese content
    const enPath = path.join(articleDir, 'en.md');
    const zhPath = path.join(articleDir, 'zh.md');

    if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) {
      console.warn(`Missing language files for article: ${articleId}`);
      continue;
    }

    const contentEn = fs.readFileSync(enPath, 'utf-8');
    const contentZh = fs.readFileSync(zhPath, 'utf-8');

    const titleEn = extractTitle(contentEn, 'en');
    const titleZh = extractTitle(contentZh, 'zh');
    const excerptEn = extractExcerpt(contentEn, 'en');
    const excerptZh = extractExcerpt(contentZh, 'zh');

    articles.push({
      id: articleId,
      title: {
        en: titleEn,
        zh: titleZh,
      },
      excerpt: {
        en: excerptEn,
        zh: excerptZh,
      },
      contentEn,
      contentZh,
      date: config.date,
      tags: config.tags,
      readTime: config.readTime,
    });
  }

  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate TypeScript file
  const tsContent = `// Auto-generated at build time
import type { ArticleFile } from './articles';

export const articles: ArticleFile[] = ${JSON.stringify(articles, null, 2)} as any;
`;

  fs.writeFileSync(outputFile, tsContent, 'utf-8');
  console.log(`✅ Generated ${articles.length} articles`);
}

generateArticlesData();
