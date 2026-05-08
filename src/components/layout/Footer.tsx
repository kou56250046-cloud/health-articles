import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-linen-200 bg-linen-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🌿</span>
              <span className="font-bold text-forest-700 font-serif">HealthWellness</span>
            </div>
            <p className="text-sm text-sage-600">
              ヨガ・呼吸法・瞑想・腸内環境など<br />
              健康に関する知識をまとめた個人ノート
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/?category=${cat.id}`}
                className="text-sm text-forest-600 hover:text-forest-500 hover:underline"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-sage-500">
          © {new Date().getFullYear()} HealthWellness — Personal Knowledge Base
        </div>
      </div>
    </footer>
  );
}
