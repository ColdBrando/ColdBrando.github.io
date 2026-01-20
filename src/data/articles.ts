// This file will be populated at build time
export interface ArticleFile {
  id: string;
  title: LocalizedContent;
  excerpt: LocalizedContent;
  contentEn: string;
  contentZh: string;
  contentPreviewEn: string;
  contentPreviewZh: string;
  date: string;
  tags: string[];
  readTime: number;
  isPaid?: boolean;
}

export interface LocalizedContent {
  en: string;
  zh: string;
}

// Helper function to get localized content
export function getLocalizedContent(localizedContent: LocalizedContent, language: string): string {
  return localizedContent[language as keyof LocalizedContent] || localizedContent.en;
}

// Articles will be loaded dynamically
import { articles as loadedArticles } from './articles-data.generated';

export const articles: ArticleFile[] = loadedArticles;
