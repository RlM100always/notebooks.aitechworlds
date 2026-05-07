import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  viewAllHref?: string;
  accentColor?: string;
}

export default function SectionHeader({ title, subtitle, icon, viewAllHref, accentColor = '#c3c0ff' }: Props) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon && (
            <span className="material-symbols-outlined text-xl" style={{ color: accentColor, fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          )}
          <h2 className="font-inter font-bold text-2xl text-on-background tracking-tight">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-sm text-on-surface-variant font-inter">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="flex items-center gap-1 font-grotesk text-xs text-primary hover:text-primary-fixed-dim transition-colors tracking-wider uppercase font-semibold"
        >
          View All
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
