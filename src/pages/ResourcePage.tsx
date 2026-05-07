import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { resources, resourceTypeLabels } from '../data/resources';
import { formatNumber, formatDate, getRelatedResources, getDifficultyColor, timeAgo } from '../utils';
import { useSavedResources, useRecentlyViewed, useScrollProgress } from '../hooks';
import ResourceCard from '../components/ui/ResourceCard';

export default function ResourcePage() {
  const { category, subcategory, slug } = useParams<{ category: string; subcategory: string; slug: string }>();
  const resource = resources.find(r => r.slug === slug);
  const { isSaved, toggleSave } = useSavedResources();
  const { addViewed } = useRecentlyViewed();
  const progress = useScrollProgress();

  useEffect(() => {
    if (resource) {
      addViewed(resource.id);
      window.scrollTo(0, 0);
    }
  }, [resource?.id]);

  if (!resource) return <Navigate to="/" />;

  const related = getRelatedResources(resources, resource);
  const saved = isSaved(resource.id);

  return (
    <>
      {/* Reading Progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <div className="max-w-container mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8 flex flex-col gap-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 font-grotesk text-xs text-on-surface-variant tracking-wider uppercase flex-wrap">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <Link to={`/${resource.category}`} className="hover:text-primary transition-colors capitalize">{resource.category}</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <Link to={`/${resource.category}/${resource.subcategory}`} className="hover:text-primary transition-colors capitalize">{resource.subcategory}</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-on-surface">{resourceTypeLabels[resource.resourceType]}</span>
            </nav>

            {/* Header */}
            <header className="border-b border-outline-variant/10 pb-6">
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="glass-panel px-3 py-1 rounded-full font-grotesk text-xs font-semibold tracking-wider text-secondary uppercase">
                  {resourceTypeLabels[resource.resourceType]}
                </span>
                {resource.difficulty && (
                  <span className="px-3 py-1 rounded-full font-grotesk text-xs font-semibold tracking-wider uppercase"
                    style={{ color: getDifficultyColor(resource.difficulty), background: `${getDifficultyColor(resource.difficulty)}18` }}>
                    {resource.difficulty}
                  </span>
                )}
                {resource.trending > 90 && (
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-grotesk text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings:"'FILL' 1"}}>local_fire_department</span>
                    Trending
                  </span>
                )}
              </div>

              <h1 className="font-inter font-bold text-3xl md:text-4xl text-on-background tracking-tight leading-tight mb-4">
                {resource.title}
              </h1>
              <p className="font-inter text-lg text-on-surface-variant leading-relaxed mb-5">
                {resource.description}
              </p>

              <div className="flex items-center gap-5 text-sm text-on-surface-variant flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  {formatNumber(resource.viewCount)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">download</span>
                  {formatNumber(resource.downloadCount)} downloads
                </span>
                {resource.pages && (
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">menu_book</span>
                    {resource.pages} pages
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  Updated {timeAgo(resource.updateDate)}
                </span>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="w-full h-72 rounded-2xl overflow-hidden border border-outline-variant/20 group">
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </figure>

            {/* Description Section */}
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
              <h2 className="font-inter font-bold text-xl text-on-surface mb-3">About this Resource</h2>
              <p className="font-inter text-base text-on-surface-variant leading-relaxed">{resource.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {[
                  { label: 'Category', value: resource.category, icon: 'category' },
                  { label: 'Subcategory', value: resource.subcategory, icon: 'folder' },
                  { label: 'Type', value: resourceTypeLabels[resource.resourceType], icon: 'description' },
                  { label: 'Published', value: formatDate(resource.publishDate), icon: 'calendar_today' },
                  { label: 'Updated', value: formatDate(resource.updateDate), icon: 'update' },
                  ...(resource.pages ? [{ label: 'Pages', value: `${resource.pages}`, icon: 'menu_book' }] : []),
                ].map(item => (
                  <div key={item.label} className="bg-surface-container rounded-xl p-3">
                    <span className="font-grotesk text-[10px] text-on-surface-variant tracking-widest uppercase block mb-1">{item.label}</span>
                    <span className="font-inter text-sm text-on-surface capitalize font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-grotesk text-xs text-on-surface-variant tracking-widest uppercase mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                  <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}
                    className="font-grotesk text-xs font-semibold tracking-wider uppercase text-on-surface-variant bg-surface-container hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-primary/25 transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-surface-container rounded-2xl p-5">
              <h3 className="font-inter font-semibold text-sm text-on-surface mb-2">Related Topics</h3>
              <p className="text-xs text-on-surface-variant">{resource.keywords.join(' · ')}</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-5">
            {/* Download Card */}
            <div className="glass-panel rounded-2xl p-5 sticky top-20">
              <h3 className="font-inter font-bold text-lg text-on-surface mb-2">{resource.title}</h3>
              <p className="font-inter text-sm text-on-surface-variant mb-5 line-clamp-2">{resource.description}</p>

              <div className="flex flex-col gap-3 mb-5">
                <a
                  href={resource.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-grotesk text-sm font-semibold tracking-wider uppercase px-5 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>send</span>
                  Download via Telegram
                </a>
                {resource.driveLink && (
                  <a
                    href={resource.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-outline-variant hover:border-primary/40 text-on-surface font-grotesk text-sm font-semibold tracking-wider uppercase px-5 py-3.5 rounded-xl transition-colors"
                  >
                    <span className="material-symbols-outlined">cloud_download</span>
                    Google Drive
                  </a>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleSave(resource.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-grotesk font-semibold tracking-wider uppercase transition-all ${
                    saved
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-outline-variant hover:border-primary/30 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: `'FILL' ${saved ? 1 : 0}`}}>bookmark</span>
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-outline-variant hover:border-primary/30 text-on-surface-variant hover:text-on-surface text-sm font-grotesk font-semibold tracking-wider uppercase transition-all"
                >
                  <span className="material-symbols-outlined text-lg">share</span>
                  Share
                </button>
              </div>

              <div className="border-t border-outline-variant/10 mt-4 pt-4 grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="font-inter font-bold text-xl text-on-surface">{formatNumber(resource.viewCount)}</div>
                  <div className="font-grotesk text-[10px] tracking-widest uppercase text-on-surface-variant">Views</div>
                </div>
                <div>
                  <div className="font-inter font-bold text-xl text-on-surface">{formatNumber(resource.downloadCount)}</div>
                  <div className="font-grotesk text-[10px] tracking-widest uppercase text-on-surface-variant">Downloads</div>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5">
                <h3 className="font-inter font-bold text-base text-on-surface mb-4">Related Resources</h3>
                <div className="flex flex-col gap-1">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      to={`/${r.category}/${r.subcategory}/${r.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group"
                    >
                      <img src={r.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-inter font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">{r.title}</p>
                        <p className="text-[10px] text-on-surface-variant font-grotesk tracking-wide capitalize">{r.resourceType}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* More from this category */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-inter font-bold text-2xl text-on-background mb-6 tracking-tight">More in {resource.subcategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.slice(0, 4).map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
