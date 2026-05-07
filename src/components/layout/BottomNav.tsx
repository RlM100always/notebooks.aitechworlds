import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { icon: 'home', label: 'Home', path: '/', fill: true },
  { icon: 'search', label: 'Search', path: '/search', fill: false },
  { icon: 'category', label: 'Categories', path: '/categories', fill: true },
  { icon: 'trending_up', label: 'Trending', path: '/trending', fill: false },
  { icon: 'bookmarks', label: 'Saved', path: '/saved', fill: true },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/10 shadow-2xl flex justify-around items-center h-16 px-2">
      {tabs.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group relative"
          >
            {isActive && (
              <span className="absolute top-1.5 w-10 h-1 bg-primary rounded-full" />
            )}
            <div className={`flex items-center justify-center w-10 h-8 rounded-full transition-all duration-200 ${
              isActive ? 'bg-primary/15' : 'group-hover:bg-white/5'
            }`}>
              <span
                className={`material-symbols-outlined text-xl transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
                }`}
                style={{ fontVariationSettings: `'FILL' ${isActive && tab.fill ? 1 : 0}` }}
              >
                {tab.icon}
              </span>
            </div>
            <span className={`font-grotesk text-[10px] tracking-wide font-semibold transition-colors duration-200 ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
