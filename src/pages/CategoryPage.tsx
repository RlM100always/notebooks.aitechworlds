import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { resources, categories, resourceTypeLabels } from '../data/resources';
import { MainCategory } from '../types';
import ResourceCard from '../components/ui/ResourceCard';
import SectionHeader from '../components/ui/SectionHeader';

export default function CategoryPage() {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const [activeSubcat, setActiveSubcat] = useState(subcategory || '');

  const cat = categories.find(c => c.id === category);
  if (!cat) return <Navigate to="/" />;

  const filteredResources = resources.filter(r =>
    r.category === category && (!activeSubcat || r.subcategory === activeSubcat)
  );

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-20">
      {/* Hero */}
      <div className="relative rounded-3xl bg-surface-container-low border border-outline-variant/10 p-8 md:p-12 mb-10 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${cat.color}55 0%, transparent 70%)` }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-surface-container border border-outline-variant/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary" style={{fontVariationSettings:"'FILL' 1"}}>{cat.icon}</span>
            </div>
            <div>
              <h1 className="font-inter font-bold text-3xl text-on-background tracking-tight">{cat.label}</h1>
              <p className="font-grotesk text-xs text-on-surface-variant tracking-wider">
                {cat.subcategories.reduce((s, sub) => s + sub.resourceCount, 0)} resources across {cat.subcategories.length} topics
              </p>
            </div>
          </div>
          <p className="font-inter text-base text-on-surface-variant max-w-2xl">{cat.description}</p>
        </div>
      </div>

      {/* Subcategory Filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8">
        <button
          onClick={() => setActiveSubcat('')}
          className={`flex-shrink-0 font-grotesk text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full border transition-all ${
            !activeSubcat ? 'bg-primary/15 border-primary/30 text-primary' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-primary/20 hover:text-on-surface'
          }`}
        >
          All ({resources.filter(r => r.category === category).length})
        </button>
        {cat.subcategories.map(sub => {
          const count = resources.filter(r => r.category === category && r.subcategory === sub.id).length;
          if (!count) return null;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubcat(sub.id)}
              className={`flex-shrink-0 font-grotesk text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full border transition-all ${
                activeSubcat === sub.id ? 'bg-primary/15 border-primary/30 text-primary' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:border-primary/20 hover:text-on-surface'
              }`}
            >
              {sub.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-3">folder_open</span>
          <h3 className="font-inter font-bold text-xl text-on-surface mb-2">Coming Soon</h3>
          <p className="text-on-surface-variant font-inter">Resources for this topic are being added. Join our Telegram for updates.</p>
        </div>
      )}
    </div>
  );
}
