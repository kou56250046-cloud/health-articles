'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createSearchIndex, searchArticles } from '@/lib/search';
import type { ArticleSummary } from '@/types/article';
import type { CategoryConfig } from '@/lib/categories';
import { ArticleCard } from '@/components/article/ArticleCard';

interface Props {
  articles: ArticleSummary[];
  activeCategory: string;
  categories: CategoryConfig[];
}

export function SearchAndFilter({ articles, activeCategory, categories }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => createSearchIndex(articles), [articles]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    return searchArticles(fuse, query);
  }, [fuse, query]);

  function handleCategoryClick(categoryId: string) {
    if (categoryId === 'all') {
      router.push('/');
    } else {
      router.push(`/?category=${categoryId}`);
    }
  }

  return (
    <div>
      {/* 検索バー */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400">🔍</span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="記事を検索…（タイトル・要約・タグ）"
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-linen-300 bg-white text-forest-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* 検索結果 */}
      {searchResults !== null && (
        <div className="mb-8">
          <p className="text-sm text-sage-600 mb-4">
            「{query}」の検索結果: {searchResults.length}件
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {searchResults.length > 0 ? (
              searchResults.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-sage-400">
                <p>該当する記事が見つかりませんでした</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* カテゴリーフィルター（検索中は非表示） */}
      {searchResults === null && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeCategory === 'all'
                ? 'bg-forest-500 text-white'
                : 'bg-linen-100 text-forest-700 hover:bg-forest-100'
              }`}
          >
            すべて
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === cat.id
                  ? 'bg-forest-500 text-white'
                  : 'bg-linen-100 text-forest-700 hover:bg-forest-100'
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
