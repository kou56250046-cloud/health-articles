export type Category =
  | 'yoga'
  | 'breathing'
  | 'meditation'
  | 'gut-health'
  | 'pulmonary'
  | 'nutrition'
  | 'sleep'
  | 'mindfulness'
  | 'morning-routine'
  | 'night-routine';

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type Season =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'all-season';

export type AgeGroup =
  | 'all'
  | 'youth'
  | 'adult'
  | 'middle'
  | 'senior';

export interface Reference {
  title: string;
  url?: string;
  author?: string;
  year?: number;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  category: Category;
  tags: string[];
  date: string;
  updatedAt?: string;
  summary: string;
  difficulty: Difficulty;
  duration: string;
  season: Season | Season[];
  ageGroup: AgeGroup | AgeGroup[];
  references: Reference[];
  coverImage?: string;
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  rawContent: string;
}

export type ArticleSummary = Omit<Article, 'content' | 'rawContent'>;
