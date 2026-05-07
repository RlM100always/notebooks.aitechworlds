import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { resourceTypeLabels } from '../../data/resources';
import { formatNumber, timeAgo } from '../../utils';
import SectionHeader from '../ui/SectionHeader';

interface Props { resources: Resource[]; }

export default function KnowledgeGrid({ resources }: Props) {
  const latest = [...resources].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  const topNotes = resources.filter(r => r.resourceType === 'notes' || r.resourceType === 'hand-notes').slice(0, 3);
  const hero = latest[0];

  return (
    <section className="py-14">
      <SectionHeader title="Knowledge Base" subtitle="Latest uploads & top notes" icon="library_books" viewAllHref="/search" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Hero large card */}
        {hero && (
          <Link
            to={`/${hero.category}/${hero.subcategory}/${hero.slug}`}
            className="md:col-span-2 bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-surface-container transition-colors duration-300 flex flex-col justify-between min-h-[280px] card-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
                <span className="font-grotesk text-xs font-semibold tracking-widest uppercase text-primary">Latest Upload</span>
              </div>
              <h3 className="font-inter font-bold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight">
                {hero.title}
              </h3>
              <p className="font-inter text-base text-on-surface-variant leading-relaxed max-w-lg line-clamp-3">
                {hero.description}
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-6">
              <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  {timeAgo(hero.updateDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  {formatNumber(hero.viewCount)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </Link>
        )}

        {/* Top Notes stack */}
        <div className="flex flex-col gap-3">
          {topNotes.map(resource => (
            <Link
              key={resource.id}
              to={`/${resource.category}/${resource.subcategory}/${resource.slug}`}
              className="flex-1 bg-surface-container border border-outline-variant/10 rounded-xl p-4 hover:border-primary/25 transition-all duration-200 group card-glow"
            >
              <div className="flex items-start gap-3">
                <img src={resource.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-inter font-semibold text-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                    {resource.title}
                  </h4>
                  <p className="font-inter text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-on-surface-variant">
                    <span className="font-grotesk text-[10px] tracking-wider uppercase text-secondary">{resourceTypeLabels[resource.resourceType]}</span>
                    <span>{formatNumber(resource.downloadCount)} downloads</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
