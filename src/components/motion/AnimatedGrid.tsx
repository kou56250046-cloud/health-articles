'use client';

import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/article/ArticleCard';
import type { ArticleSummary } from '@/types/article';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface Props {
  articles: ArticleSummary[];
}

export function AnimatedGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <motion.div
        className="col-span-full text-center py-16 text-sage-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-4xl mb-3">🌱</p>
        <p>まだ記事がありません</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {articles.map(article => (
        <motion.div
          key={article.slug}
          variants={cardVariant}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  );
}
