import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { resourceTypeLabels } from '../../data/resources';
import { formatNumber, getDifficultyColor } from '../../utils';
import { useSavedResources } from '../../hooks';

interface Props {
  resource: Resource;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ResourceCard({ resource, variant = 'default' }: Props) {
  const { isSaved, toggleSave } = useSavedResources();
  const saved = isSaved(resource.id);
  const href = `/${resource.category}/${resource.subcategory}/${resource.slug}`;

  if (variant === 'compact') {
    return (
      <Link to={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-all duration-200 group cursor-pointer border border-transparent hover:border-outline-variant/20">
        <img src={resource.thumbnail} alt={resource.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-inter font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{resource.title}</h4>
          <p className="text-xs text-on-surface-variant capitalize">{resource.subcategory} · {resourceTypeLabels[resource.resourceType]}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-xs text-on-surface-variant">{formatNumber(resource.viewCount)} views</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative bg-surface-container rounded-2xl border border-outline-variant/10 card-glow hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1">
      {/* Thumbnail */}
      <Link to={href} className="relative block h-44 overflow-hidden bg-surface-container-high">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="glass-panel px-2.5 py-1 rounded-full font-grotesk text-[10px] font-semibold tracking-wider text-secondary uppercase">
            {resourceTypeLabels[resource.resourceType]}
          </span>
          {resource.trending > 90 && (
            <span className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full font-grotesk text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" style={{fontVariationSettings:"'FILL' 1"}}>local_fire_department</span>
              Hot
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(resource.id); }}
          className="absolute top-3 right-3 w-8 h-8 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <span className={`material-symbols-outlined text-base ${saved ? 'text-primary' : 'text-on-surface-variant'}`}
            style={{fontVariationSettings: `'FILL' ${saved ? 1 : 0}`}}>
            bookmark
          </span>
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={href}>
          <h3 className="font-inter font-semibold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            {resource.title}
          </h3>
        </Link>
        <p className="text-sm text-on-surface-variant line-clamp-2 font-inter leading-relaxed mb-3 flex-1">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-grotesk font-semibold tracking-wider uppercase text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md border border-outline-variant/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant border-t border-outline-variant/10 pt-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">visibility</span>
              {formatNumber(resource.viewCount)}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">download</span>
              {formatNumber(resource.downloadCount)}
            </span>
          </div>
          {resource.difficulty && (
            <span className="font-grotesk text-[10px] font-semibold tracking-wider uppercase" style={{ color: getDifficultyColor(resource.difficulty) }}>
              {resource.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
