import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resources, categories } from '../../data/resources';
import { useSearch } from '../../hooks';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(false);
  const { query, setQuery, results } = useSearch(resources);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setQuery]);

  const handleResourceClick = (slug: string, category: string, subcategory: string) => {
    navigate(`/${category}/${subcategory}/${slug}`);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <nav className={`hidden md:flex flex-col fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-lg'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="flex justify-between items-center h-16 px-6 max-w-container mx-auto w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-lg" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
          </div>
          <span className="font-inter font-bold text-xl tracking-tight text-on-background">
            AI<span className="text-primary">TECHWORLDS</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link to="/" className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-200 px-3 py-2 rounded-lg font-inter text-sm">Home</Link>
          
          <div className="relative" onMouseEnter={() => setMegaMenu(true)} onMouseLeave={() => setMegaMenu(false)}>
            <button className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-200 px-3 py-2 rounded-lg font-inter text-sm flex items-center gap-1">
              Categories
              <span className="material-symbols-outlined text-base">expand_more</span>
            </button>
            {megaMenu && (
              <div className="absolute top-full left-0 mt-1 w-[640px] glass-panel rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-6">
                {categories.map(cat => (
                  <div key={cat.id}>
                    <Link to={`/${cat.id}`} className="flex items-center gap-2 mb-3 group">
                      <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings:"'FILL' 1"}}>{cat.icon}</span>
                      <span className="font-grotesk font-semibold text-sm tracking-wide text-on-surface group-hover:text-primary transition-colors">{cat.label}</span>
                    </Link>
                    <div className="grid grid-cols-2 gap-1">
                      {cat.subcategories.slice(0, 6).map(sub => (
                        <Link key={sub.id} to={`/${cat.id}/${sub.id}`}
                          className="text-xs text-on-surface-variant hover:text-primary transition-colors py-1 truncate">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/trending" className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-200 px-3 py-2 rounded-lg font-inter text-sm">Trending</Link>
          <Link to="/search" className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-200 px-3 py-2 rounded-lg font-inter text-sm">Top Notes</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-on-surface-variant hover:text-on-surface transition-all duration-200 p-2 rounded-full hover:bg-white/5"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-[420px] glass-panel rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-2 bg-surface-container rounded-xl px-3 py-2 border border-outline-variant/30 focus-within:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-outline text-lg">search</span>
                  <input
                    autoFocus
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search resources, topics..."
                    className="flex-1 bg-transparent outline-none text-sm text-on-background placeholder-outline font-inter"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-outline hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  )}
                </div>
                {query && (
                  <div className="mt-2">
                    {results.length > 0 ? (
                      <>
                        <p className="font-grotesk text-xs text-on-surface-variant tracking-widest uppercase mb-2 px-1">Results</p>
                        {results.map(r => (
                          <button
                            key={r.id}
                            onClick={() => handleResourceClick(r.slug, r.category, r.subcategory)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container transition-colors text-left group"
                          >
                            <img src={r.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-inter text-on-surface group-hover:text-primary transition-colors truncate">{r.title}</p>
                              <p className="text-xs text-on-surface-variant capitalize">{r.subcategory} · {r.resourceType}</p>
                            </div>
                          </button>
                        ))}
                        <Link to={`/search?q=${query}`} className="block text-center text-xs text-primary hover:text-primary-fixed-dim mt-2 py-2 font-grotesk tracking-wide">
                          View all results →
                        </Link>
                      </>
                    ) : (
                      <p className="text-sm text-on-surface-variant text-center py-4">No results for "{query}"</p>
                    )}
                  </div>
                )}
                {!query && (
                  <div className="mt-3">
                    <p className="font-grotesk text-xs text-on-surface-variant tracking-widest uppercase mb-2 px-1">Trending Searches</p>
                    {['Generative AI', 'Python Clean Code', 'System Design', 'Prompt Engineering', 'Docker'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-surface-container transition-colors text-sm text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-base text-outline">trending_up</span>
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/saved" className="text-on-surface-variant hover:text-on-surface transition-all duration-200 p-2 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined">bookmarks</span>
          </Link>

          <a
            href="https://t.me/aitechworlds"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-container text-on-primary-container font-grotesk text-xs font-semibold tracking-wider px-4 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5 uppercase ml-1"
          >
            <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>send</span>
            Join Telegram
          </a>
        </div>
      </div>
    </nav>
  );
}
