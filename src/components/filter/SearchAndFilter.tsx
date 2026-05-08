'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createSearchIndex, searchArticles } from '@/lib/search';
import type { ArticleSummary } from '@/types/article';
import type { CategoryConfig } from '@/lib/categories';
import { AnimatedGrid } from '@/components/motion/AnimatedGrid';

interface Props {
  articles: ArticleSummary[];
  activeCategory: string;
  categories: CategoryConfig[];
}

export function SearchAndFilter({ articles, activeCategory, categories }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

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
      <motion.div
        className="relative mb-6"
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 pointer-events-none"
          animate={{ scale: focused ? 1.2 : 1, rotate: focused ? -10 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          🔍
        </motion.span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="記事を検索…（タイトル・要約・タグ）"
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-linen-300 bg-white text-forest-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all duration-200"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
              transition={{ duration: 0.18 }}
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 検索結果 */}
      <AnimatePresence mode="wait">
        {searchResults !== null && (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-8"
          >
            <motion.p
              className="text-sm text-sage-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              「{query}」の検索結果: {searchResults.length}件
            </motion.p>
            {searchResults.length > 0 ? (
              <AnimatedGrid articles={searchResults} />
            ) : (
              <motion.div
                className="text-center py-10 text-sage-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-3xl mb-2">🔍</p>
                <p>該当する記事が見つかりませんでした</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* カテゴリーフィルター（検索中は非表示） */}
      <AnimatePresence>
        {searchResults === null && (
          <motion.div
            key="category-filter"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {/* 「すべて」ボタン */}
            <motion.button
              onClick={() => handleCategoryClick('all')}
              whileTap={{ scale: 0.93 }}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${activeCategory === 'all'
                  ? 'bg-forest-500 text-white shadow-sm'
                  : 'bg-linen-100 text-forest-700 hover:bg-forest-100'
                }`}
            >
              {activeCategory === 'all' && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-forest-500 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              すべて
            </motion.button>

            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileTap={{ scale: 0.93 }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${activeCategory === cat.id
                    ? 'bg-forest-500 text-white shadow-sm'
                    : 'bg-linen-100 text-forest-700 hover:bg-forest-100'
                  }`}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-forest-500 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
