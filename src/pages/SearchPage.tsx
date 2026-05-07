import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resources, categories, resourceTypeLabels } from '../data/resources';
import { Resource, ResourceType, MainCategory } from '../types';
import ResourceCard from '../components/ui/ResourceCard';

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
  { value: 'a-z', label: 'A-Z' },
];

const resourceTypes = Object.entries(resourceTypeLabels);

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeQuery, setActiveQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState<MainCategory | ''>(searchParams.get('category') as MainCategory || '');
  const [resourceType, setResourceType] = useState<ResourceType | ''>(searchParams.get('type') as ResourceType || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'latest');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    setActiveQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...resources];
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.subcategory.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    if (category) list = list.filter(r => r.category === category);
    if (resourceType) list = list.filter(r => r.resourceType === resourceType);
    if (sort === 'popular') list.sort((a, b) => b.popularity - a.popularity);
    else if (sort === 'trending') list.sort((a, b) => b.trending - a.trending);
    else if (sort === 'a-z') list.sort((a, b) => a.title.localeCompare(b.title));
    else list.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    return list;
  }, [activeQuery, category, resourceType, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    if (sort !== 'latest') params.set('sort', sort);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setCategory('');
    setResourceType('');
    setSort('latest');
    setQuery('');
    setActiveQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-inter font-bold text-3xl text-on-background mb-2 tracking-tight">Search Resources</h1>
        <p className="text-on-surface-variant font-inter">
          {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
          {activeQuery && <span> for "<span className="text-primary">{activeQuery}</span>"</span>}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 focus-within:border-primary/50 transition-colors">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search resources, topics, technologies..."
            className="flex-1 bg-transparent outline-none text-on-background font-inter text-sm placeholder-outline"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setActiveQuery(''); }} className="text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
        <button type="submit" className="bg-primary-container text-on-primary-container font-grotesk text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
          Search
        </button>
      </form>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-60 flex-shrink-0">
          <div className="glass-panel rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-grotesk text-xs font-semibold tracking-widest uppercase text-on-surface">Filters</h2>
              <button onClick={clearFilters} className="text-xs text-primary hover:text-primary-fixed-dim font-grotesk tracking-wide">Clear all</button>
            </div>

            {/* Sort */}
            <div className="mb-5">
              <h3 className="font-grotesk text-[10px] tracking-widest uppercase text-on-surface-variant mb-2">Sort By</h3>
              <div className="flex flex-col gap-1">
                {sortOptions.map(opt => (
                  <button key={opt.value} onClick={() => setSort(opt.value)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${sort === opt.value ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mb-5">
              <h3 className="font-grotesk text-[10px] tracking-widest uppercase text-on-surface-variant mb-2">Category</h3>
              <div className="flex flex-col gap-1">
                <button onClick={() => setCategory('')}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${!category ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                  All Categories
                </button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.id as MainCategory)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${category === cat.id ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Type */}
            <div>
              <h3 className="font-grotesk text-[10px] tracking-widest uppercase text-on-surface-variant mb-2">Resource Type</h3>
              <div className="flex flex-col gap-1">
                <button onClick={() => setResourceType('')}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${!resourceType ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                  All Types
                </button>
                {resourceTypes.map(([key, label]) => (
                  <button key={key} onClick={() => setResourceType(key as ResourceType)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-inter transition-colors ${resourceType === key ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
              <h3 className="font-inter font-bold text-xl text-on-surface mb-2">No results found</h3>
              <p className="text-on-surface-variant font-inter mb-6">Try different keywords or browse our categories</p>
              <button onClick={clearFilters} className="bg-primary-container text-on-primary-container font-grotesk text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
