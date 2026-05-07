import React from 'react';
import { resources } from '../data/resources';
import ResourceCard from '../components/ui/ResourceCard';
import SectionHeader from '../components/ui/SectionHeader';

export function TrendingPage() {
  const trending = [...resources].sort((a, b) => b.trending - a.trending);

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-20">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-2xl text-red-400" style={{fontVariationSettings:"'FILL' 1"}}>local_fire_department</span>
          <h1 className="font-inter font-bold text-3xl text-on-background tracking-tight">Trending Resources</h1>
        </div>
        <p className="text-on-surface-variant font-inter">Most popular resources this week across all categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {trending.map((r, idx) => (
          <div key={r.id} className="relative">
            {idx < 3 && (
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shadow-lg">
                <span className="font-grotesk text-xs font-bold text-on-primary-container">#{idx + 1}</span>
              </div>
            )}
            <ResourceCard resource={r} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SavedPage() {
  const saved: string[] = (() => {
    try { return JSON.parse(localStorage.getItem('atw_saved') || '[]'); } catch { return []; }
  })();
  const savedResources = resources.filter(r => saved.includes(r.id));

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-20">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-2xl text-primary" style={{fontVariationSettings:"'FILL' 1"}}>bookmarks</span>
          <h1 className="font-inter font-bold text-3xl text-on-background tracking-tight">Saved Resources</h1>
        </div>
        <p className="text-on-surface-variant font-inter">{savedResources.length} saved resource{savedResources.length !== 1 ? 's' : ''}</p>
      </div>

      {savedResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">bookmark_border</span>
          <h3 className="font-inter font-bold text-xl text-on-surface mb-2">No saved resources yet</h3>
          <p className="text-on-surface-variant font-inter mb-6 max-w-md">Browse our library and click the bookmark icon on any resource to save it here for quick access.</p>
        </div>
      )}
    </div>
  );
}

export function CategoriesOverviewPage() {
  const { categories } = require('../data/resources');

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-20">
      <div className="mb-10">
        <h1 className="font-inter font-bold text-3xl text-on-background tracking-tight mb-2">All Categories</h1>
        <p className="text-on-surface-variant font-inter">Explore our complete knowledge library organized by domain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat: any) => (
          <div key={cat.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary" style={{fontVariationSettings:"'FILL' 1"}}>{cat.icon}</span>
              </div>
              <div>
                <h2 className="font-inter font-bold text-xl text-on-surface">{cat.label}</h2>
                <p className="text-xs text-on-surface-variant font-grotesk tracking-wide">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cat.subcategories.map((sub: any) => (
                <a key={sub.id} href={`/${cat.id}/${sub.id}`}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 hover:border-primary/20 transition-all group">
                  <span className="text-xs font-inter text-on-surface-variant group-hover:text-on-surface transition-colors">{sub.label}</span>
                  <span className="text-[10px] font-grotesk text-on-surface-variant">{sub.resourceCount}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
