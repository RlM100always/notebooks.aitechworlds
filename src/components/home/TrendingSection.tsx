import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../../types';
import { resourceTypeLabels } from '../../data/resources';
import { formatNumber } from '../../utils';
import SectionHeader from '../ui/SectionHeader';
import ResourceCard from '../ui/ResourceCard';

interface Props { resources: Resource[]; }

export default function TrendingSection({ resources }: Props) {
  const trending = [...resources].sort((a, b) => b.trending - a.trending).slice(0, 6);

  return (
    <section className="py-14">
      <SectionHeader
        title="Trending Today"
        subtitle="Most downloaded and viewed this week"
        icon="local_fire_department"
        viewAllHref="/trending"
        accentColor="#f87171"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trending.map((resource, idx) => (
          <div key={resource.id} className="relative">
            {idx < 3 && (
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                <span className="font-grotesk text-xs font-bold text-on-primary-container">{idx + 1}</span>
              </div>
            )}
            <ResourceCard resource={resource} />
          </div>
        ))}
      </div>
    </section>
  );
}
