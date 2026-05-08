import type { Difficulty } from '@/types/article';

interface Props {
  difficulty: Difficulty;
}

export function DifficultyStars({ difficulty }: Props) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`難易度 ${difficulty}/5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= difficulty ? 'text-earth-500' : 'text-linen-300'}>
          ★
        </span>
      ))}
    </span>
  );
}
