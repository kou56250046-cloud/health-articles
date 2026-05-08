import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import type { Article, ArticleSummary } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'articles');

function ensureDir() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  ensureDir();
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  const articles = files
    .map(filename => {
      const fullPath = path.join(ARTICLES_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data as ArticleSummary;
    })
    .filter(a => a.slug);
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  ensureDir();
  const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    ...(data as ArticleSummary),
    content: processedContent.toString(),
    rawContent: content,
  };
}

export async function getArticlesByCategory(category: string): Promise<ArticleSummary[]> {
  const all = await getAllArticles();
  return all.filter(a => a.category === category);
}

export async function getFeaturedArticles(): Promise<ArticleSummary[]> {
  const all = await getAllArticles();
  return all.filter(a => a.featured);
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(a => ({ slug: a.slug }));
}
