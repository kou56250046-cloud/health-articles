import { CATEGORY_MAP } from '@/lib/categories';
import type { Category } from '@/types/article';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const config = CATEGORY_MAP[category];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium bg-forest-100 text-forest-700 ${sizeClass}`}
    >
      <span>{config?.icon}</span>
      <span>{config?.label ?? category}</span>
    </span>
  );
}

interface TagBadgeProps {
  tag: string;
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-linen-200 text-forest-700 text-xs px-2 py-0.5 font-medium">
      {tag}
    </span>
  );
}
