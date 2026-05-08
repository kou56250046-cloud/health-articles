'use client';

const STORAGE_KEY = 'health-articles-bookmarks';

export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}

export function toggleBookmark(slug: string): boolean {
  const current = getBookmarks();
  const idx = current.indexOf(slug);
  let next: string[];
  if (idx >= 0) {
    next = current.filter(s => s !== slug);
  } else {
    next = [...current, slug];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next.includes(slug);
}
