import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import KnowledgeGrid from '../components/home/KnowledgeGrid';
import TrendingSection from '../components/home/TrendingSection';
import CategoriesSection from '../components/home/CategoriesSection';
import TelegramCTA from '../components/home/TelegramCTA';
import ResourceCard from '../components/ui/ResourceCard';
import SectionHeader from '../components/ui/SectionHeader';
import { resources } from '../data/resources';

export default function HomePage() {
  const latest = [...resources].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 3);

  return (
    <div>
      <HeroSection />
      <div className="max-w-container mx-auto px-6">
        <FeaturedSection resources={resources} />
        <KnowledgeGrid resources={resources} />
        <TrendingSection resources={resources} />
        <CategoriesSection />

        {/* Latest Uploads */}
        <section className="py-14">
          <SectionHeader
            title="New Releases"
            subtitle="Just added to the library"
            icon="new_releases"
            viewAllHref="/search?sort=latest"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        </section>

        <TelegramCTA />
      </div>
    </div>
  );
}
