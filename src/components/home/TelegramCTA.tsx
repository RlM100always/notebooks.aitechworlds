import React from 'react';

export default function TelegramCTA() {
  return (
    <section className="py-14">
      <div className="relative bg-surface-container-low border border-outline-variant/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)' }} />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(111,61,217,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-grotesk text-xs font-semibold tracking-widest uppercase text-primary">Live Community</span>
            </div>
            <h2 className="font-inter font-bold text-3xl md:text-4xl text-on-surface mb-3 tracking-tight leading-tight">
              Join the Vanguard
            </h2>
            <p className="font-inter text-base text-on-surface-variant leading-relaxed">
              Connect with 50,000+ developers, engineers, and AI enthusiasts. Get daily tech resources, updates, and exclusive content in our Telegram community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://t.me/aitechworlds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-grotesk text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>send</span>
              Join Telegram
            </a>
            <a
              href="https://aitechworlds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-transparent border border-outline-variant hover:border-primary/50 text-on-surface font-grotesk text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined">language</span>
              Main Site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
