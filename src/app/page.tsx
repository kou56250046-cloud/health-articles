import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/lib/categories';
import { SearchAndFilter } from '@/components/filter/SearchAndFilter';
import { AnimatedHero } from '@/components/motion/AnimatedHero';
import { AnimatedGrid } from '@/components/motion/AnimatedGrid';

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const allArticles = await getAllArticles();

  const activeCategory = params.category ?? 'all';
  const filtered =
    activeCategory === 'all'
      ? allArticles
      : allArticles.filter(a => a.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AnimatedHero />

      <SearchAndFilter
        articles={allArticles}
        activeCategory={activeCategory}
        categories={CATEGORIES}
      />

      <div className="mt-8">
        <AnimatedGrid articles={filtered} />
      </div>
    </div>
  );
}
