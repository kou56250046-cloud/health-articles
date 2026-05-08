import { SEASON_LABELS } from '@/lib/categories';
import type { Season } from '@/types/article';

interface Props {
  season: Season | Season[];
}

export function SeasonBadge({ season }: Props) {
  const seasons = Array.isArray(season) ? season : [season];
  return (
    <span className="inline-flex gap-1">
      {seasons.map(s => (
        <span key={s} className="text-xs text-sage-700">
          {SEASON_LABELS[s] ?? s}
        </span>
      ))}
    </span>
  );
}
