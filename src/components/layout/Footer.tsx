import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 mt-20 pb-20 md:pb-0">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-lg" style={{fontVariationSettings:"'FILL' 1"}}>auto_awesome</span>
              </div>
              <span className="font-inter font-bold text-lg tracking-tight text-on-background">
                AI<span className="text-primary">TECHWORLDS</span>
              </span>
            </div>
            <p className="text-sm text-on-surface-variant font-inter leading-relaxed mb-5">
              Premium technology knowledge platform. Books, notes, cheat sheets, and research for tech visionaries.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: 'send', href: 'https://t.me/aitechworlds', label: 'Telegram' },
                { icon: 'language', href: 'https://aitechworlds.com', label: 'Website' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-200">
                  <span className="material-symbols-outlined text-lg">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-grotesk text-xs tracking-widest uppercase text-on-surface font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {['Programming', 'AI & ML', 'IT & DevOps', 'Tech Business', 'Trending Resources', 'New Releases', 'Top Notes', 'Cheat Sheets'].map(item => (
                <li key={item}>
                  <Link to="/categories" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-inter">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-grotesk text-xs tracking-widest uppercase text-on-surface font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Learning Paths', 'Interview Prep', 'Research Papers', 'Case Studies', 'Templates', 'Checklists', 'Project Resources', 'Documentation'].map(item => (
                <li key={item}>
                  <Link to="/search" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-inter">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-grotesk text-xs tracking-widest uppercase text-on-surface font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Submit Resource', 'Advertise'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-inter">{item}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-surface-container border border-outline-variant/10">
              <p className="text-xs text-on-surface-variant font-inter mb-2">Join our Telegram for daily resources</p>
              <a href="https://t.me/aitechworlds" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary-container text-on-primary-container text-xs font-grotesk font-semibold tracking-wider uppercase px-3 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings:"'FILL' 1"}}>send</span>
                Join Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-variant font-inter">
            © 2024 AITECHWORLDS. All rights reserved. Built for tech learners worldwide.
          </p>
          <p className="text-xs text-on-surface-variant font-inter">
            <a href="https://aitechworlds.com" className="text-primary hover:text-primary-fixed-dim transition-colors">aitechworlds.com</a>
            {' · '}
            <a href="https://t.me/aitechworlds" className="hover:text-primary transition-colors">Telegram</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
