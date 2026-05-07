export type ResourceType =
  | 'book' | 'notes' | 'hand-notes' | 'cheat-sheet'
  | 'case-study' | 'research-paper' | 'documentation'
  | 'learning-guide' | 'interview-notes' | 'template'
  | 'project-resource' | 'checklist' | 'story-book';

export type MainCategory = 'programming' | 'it' | 'ai' | 'tech-business';

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  category: MainCategory;
  subcategory: string;
  resourceType: ResourceType;
  tags: string[];
  thumbnail: string;
  previewImages: string[];
  telegramLink: string;
  driveLink?: string;
  publishDate: string;
  updateDate: string;
  relatedResources: string[];
  featured: boolean;
  trending: number;
  popularity: number;
  viewCount: number;
  downloadCount: number;
  pages?: number;
  author?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Category {
  id: MainCategory;
  label: string;
  icon: string;
  description: string;
  color: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  label: string;
  resourceCount: number;
}

export interface SearchFilters {
  category?: MainCategory;
  subcategory?: string;
  resourceType?: ResourceType;
  sortBy: 'latest' | 'popular' | 'trending' | 'a-z';
}
