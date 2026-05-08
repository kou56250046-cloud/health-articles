import { getAllArticles } from '@/lib/articles';
import { CATEGORIES } from '@/lib/categories';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SearchAndFilter } from '@/components/filter/SearchAndFilter';

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
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-forest-800 font-serif mb-3">
          🌿 健康・ウェルネスの知識ノート
        </h1>
        <p className="text-sage-600 text-base max-w-xl mx-auto">
          ヨガ・呼吸法・瞑想・腸内環境など、健康に関する情報をまとめています
        </p>
      </div>

      {/* 検索 + カテゴリーフィルター（クライアント側） */}
      <SearchAndFilter
        articles={allArticles}
        activeCategory={activeCategory}
        categories={CATEGORIES}
      />

      {/* 記事グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {filtered.length > 0 ? (
          filtered.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-sage-400">
            <p className="text-4xl mb-3">🌱</p>
            <p>まだ記事がありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
