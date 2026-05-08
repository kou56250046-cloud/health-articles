interface Props {
  content: string;
}

export function ArticleBody({ content }: Props) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-forest-800 prose-headings:font-serif
        prose-h2:text-xl prose-h3:text-lg
        prose-p:text-forest-900 prose-p:leading-loose
        prose-a:text-forest-600 prose-a:underline hover:prose-a:text-forest-500
        prose-strong:text-forest-800
        prose-blockquote:border-l-forest-400 prose-blockquote:text-sage-700
        prose-li:text-forest-900
        prose-hr:border-linen-200
        prose-code:text-terracotta-700 prose-code:bg-linen-100 prose-code:rounded prose-code:px-1"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
