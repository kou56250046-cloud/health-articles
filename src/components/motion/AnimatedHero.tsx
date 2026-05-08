'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function AnimatedHero() {
  return (
    <motion.div
      className="text-center mb-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="inline-block mb-3">
        <span className="text-5xl animate-float inline-block">🌿</span>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-3xl md:text-4xl font-bold text-forest-800 font-serif mb-3"
      >
        健康・ウェルネスの知識ノート
      </motion.h1>

      <motion.p
        variants={item}
        className="text-sage-600 text-base max-w-xl mx-auto"
      >
        ヨガ・呼吸法・瞑想・腸内環境など、健康に関する情報をまとめています
      </motion.p>
    </motion.div>
  );
}
