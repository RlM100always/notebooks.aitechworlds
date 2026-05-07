import { Resource, MainCategory } from '../types';

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
}

export function getCategoryColor(category: MainCategory): string {
  const colors: Record<MainCategory, string> = {
    programming: '#4f46e5',
    it: '#0566d9',
    ai: '#6f3dd9',
    'tech-business': '#0566d9',
  };
  return colors[category] || '#4f46e5';
}

export function getDifficultyColor(difficulty?: string): string {
  if (difficulty === 'beginner') return '#4ade80';
  if (difficulty === 'intermediate') return '#facc15';
  if (difficulty === 'advanced') return '#f87171';
  return '#c7c4d8';
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getFeaturedResources(resources: Resource[]): Resource[] {
  return resources.filter(r => r.featured).sort((a, b) => b.trending - a.trending);
}

export function getTrendingResources(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => b.trending - a.trending).slice(0, 6);
}

export function getResourcesByCategory(resources: Resource[], category: MainCategory): Resource[] {
  return resources.filter(r => r.category === category);
}

export function getRelatedResources(resources: Resource[], resource: Resource): Resource[] {
  return resources.filter(r =>
    r.id !== resource.id && (
      r.subcategory === resource.subcategory ||
      resource.relatedResources.includes(r.id)
    )
  ).slice(0, 4);
}
