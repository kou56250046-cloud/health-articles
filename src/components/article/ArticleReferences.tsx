import type { Reference } from '@/types/article';

interface Props {
  references: Reference[];
}

export function ArticleReferences({ references }: Props) {
  if (!references || references.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-linen-200">
      <h2 className="text-base font-bold text-forest-700 mb-4 flex items-center gap-2">
        <span>📚</span>
        <span>参考文献</span>
      </h2>
      <ol className="space-y-2">
        {references.map((ref, i) => (
          <li key={i} className="flex gap-3 text-sm text-sage-700">
            <span className="text-forest-400 font-mono shrink-0">{i + 1}.</span>
            <span>
              {ref.url ? (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-600 underline hover:text-forest-500"
                >
                  {ref.title}
                </a>
              ) : (
                <span>{ref.title}</span>
              )}
              {(ref.author || ref.year) && (
                <span className="text-sage-500 ml-1">
                  ({[ref.author, ref.year].filter(Boolean).join(', ')})
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
