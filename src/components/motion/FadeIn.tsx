'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: 'bottom' | 'top' | 'left';
}

export function FadeIn({ children, delay = 0, className, from = 'bottom' }: Props) {
  const initial =
    from === 'top'   ? { opacity: 0, y: -20 } :
    from === 'left'  ? { opacity: 0, x: -20 } :
                       { opacity: 0, y: 24 };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}
