'use client';

import { useState, useEffect } from 'react';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks';

interface Props {
  slug: string;
}

export function BookmarkButton({ slug }: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(slug));
  }, [slug]);

  function handleClick() {
    const next = toggleBookmark(slug);
    setBookmarked(next);
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
        ${bookmarked
          ? 'bg-terracotta-50 border-terracotta-300 text-terracotta-600'
          : 'bg-linen-100 border-linen-300 text-sage-600 hover:border-terracotta-300 hover:text-terracotta-500'
        }`}
      aria-label={bookmarked ? 'ブックマークを解除' : 'ブックマークに追加'}
    >
      <span>{bookmarked ? '♥' : '♡'}</span>
      <span>{bookmarked ? 'ブックマーク済み' : 'ブックマークに追加'}</span>
    </button>
  );
}
