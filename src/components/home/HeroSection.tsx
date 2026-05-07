import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const trendingTags = ['Generative AI', 'Prompt Engineering', 'Python', 'System Design', 'Docker', 'Next.js', 'LLM', 'React'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative flex flex-col items-center text-center py-24 md:py-32 overflow-hidden">
      {/* Glow Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(111,61,217,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="font-grotesk text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          Premium Tech Knowledge Platform
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 font-inter font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6 animate-slide-up max-w-4xl">
        The Future of{' '}
        <span className="text-gradient">Tech Knowledge</span>
      </h1>

      <p className="relative z-10 font-inter text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
        Books, notes, cheat sheets, research papers, and learning guides — curated for developers, engineers, and AI enthusiasts.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative z-10 w-full max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
        <div className="relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-primary-container to-tertiary-container rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex items-center bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/30 rounded-2xl px-5 py-3.5 shadow-xl focus-within:border-primary/50 transition-all focus-within:shadow-primary/20 focus-within:shadow-2xl">
            <span className="material-symbols-outlined text-outline mr-3 text-xl">search</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Python notes, AI guides, Linux cheat sheets..."
              className="flex-1 bg-transparent border-none outline-none text-on-background font-inter text-base placeholder-outline"
            />
            <button type="submit" className="bg-primary-container text-on-primary-container font-grotesk text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity ml-3 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Trending Tags */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
        <span className="font-grotesk text-xs text-on-surface-variant tracking-widest uppercase mr-1">Trending:</span>
        {trendingTags.map((tag, i) => (
          <button
            key={tag}
            onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
            className={`font-grotesk text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 ${
              i === 0
                ? 'text-primary bg-primary/10 border-primary/25 hover:bg-primary/20'
                : 'text-on-surface-variant bg-surface-container border-outline-variant/20 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
        {[
          { value: '1,200+', label: 'Resources' },
          { value: '50K+', label: 'Downloads' },
          { value: '4', label: 'Categories' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-inter font-bold text-2xl text-on-background">{stat.value}</div>
            <div className="font-grotesk text-xs tracking-widest uppercase text-on-surface-variant">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
