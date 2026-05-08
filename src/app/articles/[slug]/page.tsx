import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug, generateStaticParams } from '@/lib/articles';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { ArticleBody } from '@/components/article/ArticleBody';
import { ArticleReferences } from '@/components/article/ArticleReferences';
import { BookmarkButton } from '@/components/article/BookmarkButton';
import Link from 'next/link';

export { generateStaticParams };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: '記事が見つかりません' };
  return {
    title: `${article.title} | HealthWellness`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-sage-600 hover:text-forest-600 mb-6"
      >
        ← 記事一覧に戻る
      </Link>

      <ArticleHeader article={article} />

      <div className="flex justify-end mb-6">
        <BookmarkButton slug={article.slug} />
      </div>

      <ArticleBody content={article.content} />

      <ArticleReferences references={article.references} />
    </div>
  );
}
