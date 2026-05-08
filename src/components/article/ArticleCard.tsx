import Link from 'next/link';
import type { ArticleSummary } from '@/types/article';
import { CategoryBadge, TagBadge } from '@/components/ui/Badge';
import { DifficultyStars } from '@/components/ui/DifficultyStars';
import { SeasonBadge } from '@/components/ui/SeasonBadge';

interface Props {
  article: ArticleSummary;
}

export function ArticleCard({ article }: Props) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="h-full bg-white rounded-2xl border border-linen-200 overflow-hidden hover:shadow-md hover:border-forest-200 transition-all duration-200">
        {/* カバーエリア（画像なし時はカテゴリーカラー） */}
        <div className="relative h-36 bg-gradient-to-br from-forest-100 to-sage-100 flex items-center justify-center">
          <span className="text-5xl opacity-70">
            {article.category === 'yoga' && '🧘'}
            {article.category === 'breathing' && '💨'}
            {article.category === 'meditation' && '🌿'}
            {article.category === 'gut-health' && '🌱'}
            {article.category === 'pulmonary' && '🫁'}
            {article.category === 'nutrition' && '🥗'}
            {article.category === 'sleep' && '🌙'}
            {article.category === 'mindfulness' && '✨'}
          </span>
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} size="sm" />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h2 className="font-bold text-forest-800 text-base leading-snug line-clamp-2 group-hover:text-forest-600 transition-colors font-serif">
            {article.title}
          </h2>
          <p className="text-sm text-sage-700 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>

          {/* タグ */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-sage-400">+{article.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* メタ情報 */}
          <div className="flex items-center justify-between pt-1 border-t border-linen-100 mt-auto">
            <div className="flex items-center gap-2">
              <DifficultyStars difficulty={article.difficulty} />
              <span className="text-xs text-sage-500">⏱ {article.duration}</span>
            </div>
            <SeasonBadge season={article.season} />
          </div>
        </div>
      </article>
    </Link>
  );
}
