import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/resources';
import SectionHeader from '../ui/SectionHeader';

export default function CategoriesSection() {
  const colorGradients: Record<string, string> = {
    programming: 'from-indigo-600/20 to-indigo-900/5',
    it: 'from-blue-600/20 to-blue-900/5',
    ai: 'from-violet-600/20 to-violet-900/5',
    'tech-business': 'from-cyan-600/20 to-cyan-900/5',
  };

  return (
    <section className="py-14">
      <SectionHeader
        title="Popular Categories"
        subtitle="Explore our curated knowledge domains"
        icon="category"
        viewAllHref="/categories"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/${cat.id}`}
            className={`group relative bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 card-glow overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colorGradients[cat.id] || ''} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-container border border-outline-variant/20 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-primary" style={{fontVariationSettings:"'FILL' 1"}}>{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-inter font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{cat.label}</h3>
                  <p className="font-grotesk text-xs text-on-surface-variant tracking-wide">
                    {cat.subcategories.reduce((sum, s) => sum + s.resourceCount, 0)} resources
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
            </div>

            <p className="relative z-10 text-sm text-on-surface-variant font-inter mb-5 leading-relaxed">{cat.description}</p>

            <div className="relative z-10 flex flex-wrap gap-2">
              {cat.subcategories.slice(0, 5).map(sub => (
                <Link
                  key={sub.id}
                  to={`/${cat.id}/${sub.id}`}
                  onClick={e => e.stopPropagation()}
                  className="font-grotesk text-[10px] font-semibold tracking-wider uppercase text-on-surface-variant bg-surface-container hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-lg border border-outline-variant/20 hover:border-primary/25 transition-all duration-200"
                >
                  {sub.label}
                </Link>
              ))}
              {cat.subcategories.length > 5 && (
                <span className="font-grotesk text-[10px] font-semibold tracking-wider uppercase text-on-surface-variant px-2.5 py-1">
                  +{cat.subcategories.length - 5} more
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
