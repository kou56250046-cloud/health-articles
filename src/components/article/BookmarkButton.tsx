'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks';

interface Props {
  slug: string;
}

export function BookmarkButton({ slug }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(slug));
  }, [slug]);

  function handleClick() {
    const next = toggleBookmark(slug);
    setBookmarked(next);
    if (next) {
      setRipple(true);
      setTimeout(() => setRipple(false), 600);
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium overflow-hidden transition-colors duration-300
        ${bookmarked
          ? 'bg-terracotta-50 border-terracotta-300 text-terracotta-600'
          : 'bg-linen-100 border-linen-300 text-sage-600 hover:border-terracotta-300 hover:text-terracotta-500'
        }`}
      aria-label={bookmarked ? 'ブックマークを解除' : 'ブックマークに追加'}
    >
      {/* リップルエフェクト */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key="ripple"
            className="absolute inset-0 rounded-full bg-terracotta-200"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* ハートアイコン */}
      <motion.span
        key={bookmarked ? 'filled' : 'empty'}
        initial={{ scale: 0.5, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className="relative z-10 text-base"
      >
        {bookmarked ? '♥' : '♡'}
      </motion.span>

      {/* テキスト */}
      <AnimatePresence mode="wait">
        <motion.span
          key={bookmarked ? 'saved' : 'add'}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          className="relative z-10"
        >
          {bookmarked ? 'ブックマーク済み' : 'ブックマークに追加'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
