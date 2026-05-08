import type { ArticleFrontmatter } from '@/types/article';
import { CategoryBadge, TagBadge } from '@/components/ui/Badge';
import { DifficultyStars } from '@/components/ui/DifficultyStars';
import { SeasonBadge } from '@/components/ui/SeasonBadge';
import { AGE_GROUP_LABELS } from '@/lib/categories';

interface Props {
  article: ArticleFrontmatter;
}

export function ArticleHeader({ article }: Props) {
  const ageGroups = Array.isArray(article.ageGroup)
    ? article.ageGroup
    : [article.ageGroup];

  return (
    <div className="bg-linen-100 rounded-2xl p-6 mb-8">
      <div className="mb-3">
        <CategoryBadge category={article.category} />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-forest-800 font-serif leading-snug mb-3">
        {article.title}
      </h1>

      <p className="text-sage-700 italic text-base leading-relaxed mb-4">
        {article.summary}
      </p>

      {/* メタ情報グリッド */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm border-t border-linen-200 pt-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-sage-500 font-medium">難易度</span>
          <DifficultyStars difficulty={article.difficulty} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-sage-500 font-medium">所要時間</span>
          <span className="text-forest-700">⏱ {article.duration}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-sage-500 font-medium">おすすめ季節</span>
          <SeasonBadge season={article.season} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-sage-500 font-medium">対象年代</span>
          <span className="text-forest-700 text-xs">
            {ageGroups.map(g => AGE_GROUP_LABELS[g] ?? g).join(' / ')}
          </span>
        </div>
      </div>

      {/* タグ */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {article.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="mt-3 text-xs text-sage-400">
        {article.updatedAt
          ? `更新日: ${article.updatedAt}`
          : `作成日: ${article.date}`}
      </div>
    </div>
  );
}
