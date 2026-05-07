import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { resourceTypeLabels } from '../../data/resources';
import { formatNumber } from '../../utils';
import SectionHeader from '../ui/SectionHeader';

interface Props { resources: Resource[]; }

export default function FeaturedSection({ resources }: Props) {
  const featured = resources.filter(r => r.featured).slice(0, 5);

  return (
    <section className="py-14">
      <SectionHeader
        title="Featured Resources"
        subtitle="Hand-picked by our editors"
        icon="star"
        viewAllHref="/search?filter=featured"
      />

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-2 px-2">
        {featured.map(resource => {
          const href = `/${resource.category}/${resource.subcategory}/${resource.slug}`;
          return (
            <Link
              key={resource.id}
              to={href}
              className="min-w-[300px] md:min-w-[380px] flex-shrink-0 snap-start group bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 overflow-hidden card-glow hover:-translate-y-1"
            >
              <div className="h-48 relative overflow-hidden bg-surface-container-high">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="glass-panel px-3 py-1 rounded-full font-grotesk text-[10px] font-semibold tracking-wider text-secondary uppercase">
                    {resourceTypeLabels[resource.resourceType]}
                  </span>
                  {resource.trending > 90 && (
                    <span className="bg-primary-container/90 text-on-primary-container px-3 py-1 rounded-full font-grotesk text-[10px] font-semibold tracking-wider uppercase">
                      Trending
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-grotesk text-xs text-on-surface-variant tracking-wide capitalize">{resource.subcategory}</span>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      {formatNumber(resource.viewCount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">download</span>
                      {formatNumber(resource.downloadCount)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-inter font-semibold text-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                  {resource.title}
                </h3>
                <p className="font-inter text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
