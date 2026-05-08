import Fuse from 'fuse.js';
import type { ArticleSummary } from '@/types/article';

export function createSearchIndex(articles: ArticleSummary[]) {
  return new Fuse(articles, {
    keys: [
      { name: 'title',    weight: 0.4 },
      { name: 'summary',  weight: 0.3 },
      { name: 'tags',     weight: 0.2 },
      { name: 'category', weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 1,
  });
}

export function searchArticles(fuse: Fuse<ArticleSummary>, query: string): ArticleSummary[] {
  if (!query.trim()) return [];
  return fuse.search(query).map(r => r.item);
}
