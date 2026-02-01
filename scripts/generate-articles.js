import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { encrypt } from './crypto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/articles');
const outputFile = path.join(__dirname, '../src/data/articles-data.generated.ts');

// Article metadata configuration
// Key is the directory name (slug), no numbering needed
const articlesConfig = {
  'edge-computing': {
    date: '2026-01-15',
    tags: ['Architecture', 'Cloud', 'Infrastructure'],
    readTime: 5,
    isPaid: false,
  },
  'distributed-systems': {
    date: '2026-01-10',
    tags: ['Distributed Systems', 'Architecture', 'Backend'],
    readTime: 8,
    isPaid: true,  // 技术文章 - 付费
  },
  'dda-architecture': {
    date: '2026-01-12',
    tags: ['DDD', 'Android', 'Architecture', 'Proto'],
    readTime: 10,
    isPaid: true,  // 技术文章 - 付费
  },
  'print-stability': {
    date: '2026-01-14',
    tags: ['Print', 'Stability', 'Distributed Systems', 'Hardware'],
    readTime: 12,
    isPaid: true,  // 技术文章 - 付费
  },
  'building-with-claude': {
    date: '2026-01-16',
    tags: ['AI', 'Claude Code', 'Productivity', 'Development'],
    readTime: 8,
    isPaid: false,
  },
  'domestic-ai-api': {
    date: '2026-01-19',
    tags: ['AI', 'API', 'LLM', 'Guide', 'Tutorial'],
    readTime: 15,
    isPaid: false,  // AI API 指南，免费
  },
  'ai-era-containers': {
    date: '2026-01-20',
    tags: ['AI', 'Agent', 'Container', 'Future', 'Paradigm Shift'],
    readTime: 10,
    isPaid: false,  // AI时代容器技术，免费
  },
  'talent-reflection': {
    date: '2026-01-21',
    tags: ['Talent', 'Self-Discovery', 'Career', 'Growth'],
    readTime: 8,
    isPaid: false,  // 天赋发现反思，免费
  },
  'unemployment-and-info-cocoon': {
    date: '2026-01-24',
    tags: ['Career', 'Life', 'Finance', 'Reflection'],
    readTime: 5,
    isPaid: false,  // 失业与信息茧房，免费
  },
  'getting-started-with-clawdbot': {
    date: '2026-01-26',
    tags: ['AI', 'Clawdbot', 'Tutorial', 'Personal Assistant'],
    readTime: 10,
    isPaid: false,  // Clawdbot入门指南，免费
  },
  'life-wisdom-from-livestream': {
    date: '2026-02-01',
    tags: ['Life', 'Wisdom', 'Growth', 'Reflection'],
    readTime: 8,
    isPaid: false,  // 人生智慧，免费
  }
};

// Remove numeric prefix from directory name (for backward compatibility)
function normalizeSlug(dirName) {
  return dirName.replace(/^\d+-/, '');
}

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

// Truncate content for preview (show first ~30%)
function truncateContent(content) {
  const lines = content.split('\n');
  const truncateAt = Math.floor(lines.length * 0.3);
  const minLines = 20; // At least 20 lines
  const maxLines = 50; // At most 50 lines
  const targetLines = Math.max(minLines, Math.min(truncateAt, maxLines));
  return lines.slice(0, targetLines).join('\n');
}

// Generate articles data
function generateArticlesData() {
  const articles = [];

  // Scan articles directory automatically
  const articleDirs = fs.readdirSync(articlesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dirName of articleDirs) {
    // Normalize directory name to slug (remove number prefix if exists)
    const slug = normalizeSlug(dirName);
    const articleDir = path.join(articlesDir, dirName);

    // Read English and Chinese content
    const enPath = path.join(articleDir, 'en.md');
    const zhPath = path.join(articleDir, 'zh.md');

    if (!fs.existsSync(enPath) || !fs.existsSync(zhPath)) {
      console.warn(`Missing language files for article: ${dirName}`);
      continue;
    }

    const contentEn = fs.readFileSync(enPath, 'utf-8');
    const contentZh = fs.readFileSync(zhPath, 'utf-8');

    // Get config or use defaults
    const config = articlesConfig[slug] || {
      date: new Date().toISOString().split('T')[0],
      tags: ['General'],
      readTime: 5,
    };

    const titleEn = extractTitle(contentEn, 'en');
    const titleZh = extractTitle(contentZh, 'zh');
    const excerptEn = extractExcerpt(contentEn, 'en');
    const excerptZh = extractExcerpt(contentZh, 'zh');

    // For paid articles: preview is plain text, full content is encrypted
    // For free articles: both are plain text
    const previewEn = truncateContent(contentEn);
    const previewZh = truncateContent(contentZh);
    const fullContentEn = config.isPaid ? encrypt(contentEn) : contentEn;
    const fullContentZh = config.isPaid ? encrypt(contentZh) : contentZh;

    articles.push({
      id: slug,
      title: {
        en: titleEn,
        zh: titleZh,
      },
      excerpt: {
        en: excerptEn,
        zh: excerptZh,
      },
      contentEn: fullContentEn,
      contentZh: fullContentZh,
      contentPreviewEn: previewEn,
      contentPreviewZh: previewZh,
      date: config.date,
      tags: config.tags,
      readTime: config.readTime,
      isPaid: config.isPaid || false,
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
