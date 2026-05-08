import type { Category } from '@/types/article';

export interface CategoryConfig {
  id: Category;
  label: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'yoga',        label: 'ヨガ',             icon: '🧘', description: 'アーサナ・ポーズ・フロー' },
  { id: 'breathing',   label: '呼吸法',           icon: '💨', description: 'プラーナヤーマ・呼吸エクササイズ' },
  { id: 'meditation',  label: '瞑想',             icon: '🌿', description: 'マインドフルネス・瞑想技法' },
  { id: 'gut-health',  label: '腸内環境',         icon: '🌱', description: '腸活・プロバイオティクス・食事' },
  { id: 'pulmonary',   label: '肺活',             icon: '🫁', description: '肺機能強化・有酸素系' },
  { id: 'nutrition',   label: '栄養・食事',       icon: '🥗', description: '薬膳・スーパーフード・食習慣' },
  { id: 'sleep',       label: '睡眠',             icon: '🌙', description: '睡眠改善・リカバリー' },
  { id: 'mindfulness',     label: 'マインドフルネス',     icon: '✨', description: 'ストレス管理・精神衛生' },
  { id: 'morning-routine', label: 'モーニングルーティン', icon: '🌅', description: '朝の習慣・若返り・活力' },
  { id: 'night-routine',   label: 'ナイトルーティン',     icon: '🌛', description: '夜の習慣・回復・睡眠準備' },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<Category, CategoryConfig>;

export const SEASON_LABELS: Record<string, string> = {
  'spring': '🌸 春',
  'summer': '☀️ 夏',
  'autumn': '🍂 秋',
  'winter': '❄️ 冬',
  'all-season': '🌏 通年',
};

export const AGE_GROUP_LABELS: Record<string, string> = {
  'all': 'すべての年代',
  'youth': '〜29歳',
  'adult': '30〜49歳',
  'middle': '50〜64歳',
  'senior': '65歳以上',
};
