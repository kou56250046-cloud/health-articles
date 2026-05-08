import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linen-50/90 backdrop-blur border-b border-linen-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-lg font-bold text-forest-700 font-serif">
              HealthWellness
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/?category=${cat.id}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-forest-600 hover:bg-forest-100 hover:text-forest-700 transition-colors whitespace-nowrap"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* モバイルナビ */}
        <div className="md:hidden flex gap-2 pb-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-linen-100 text-forest-600 hover:bg-forest-100 whitespace-nowrap"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
