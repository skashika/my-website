import React, { useState } from 'react';
import { blogs, blogCategories } from '../data/blogs';

function renderContent(text) {
  const lines = text.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    if (/^[-*•]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={i} className="blog-list">
          {items.map((item, j) => <li key={j}>{inlineFmt(item)}</li>)}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="blog-list blog-ol">
          {items.map((item, j) => <li key={j}>{inlineFmt(item)}</li>)}
        </ol>
      );
      continue;
    }

    elements.push(<p key={i} className="blog-body-p">{inlineFmt(line)}</p>);
    i++;
  }

  return elements;
}

function inlineFmt(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    /^\*\*[^*]+\*\*$/.test(p) ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  );
}

const categoryColors = {
  'AI & Intelligent Systems': { bg: '#eff6ff', color: '#2563eb' },
  'Full Stack / Cloud':       { bg: '#f0fdf4', color: '#15803d' },
  'Career & Leadership':      { bg: '#fdf4ff', color: '#9333ea' },
};

export default function BlogSection() {
  const [active, setActive]   = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = active === 'All' ? blogs : blogs.filter(b => b.category === active);

  return (
    <>
      <section id="blog" className="section">
        <div className="container">
          <div className="section-intro">
            <span className="label">Blog</span>
            <h2 className="headline">Thoughts on AI, Engineering & Leadership</h2>
            <p className="subheadline">Simple explanations of real topics from 8+ years in the field.</p>
          </div>

          {/* Category filter */}
          <div className="blog-filters">
            {blogCategories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="blog-grid">
            {filtered.map(blog => {
              const color = categoryColors[blog.category] ?? { bg: '#f8fafc', color: '#64748b' };
              return (
                <article
                  key={blog.id}
                  className="blog-card"
                  onClick={() => setSelected(blog)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelected(blog)}
                >
                  <div className="blog-card-cat" style={{ background: color.bg, color: color.color }}>
                    {blog.category}
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-read-time">{blog.readTime}</span>
                    <span className="blog-read-link">Read article →</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="blog-modal-overlay" onClick={() => setSelected(null)}>
          <div className="blog-modal" onClick={e => e.stopPropagation()}>
            <div className="blog-modal-header">
              <div
                className="blog-card-cat"
                style={{
                  background: (categoryColors[selected.category] ?? {}).bg,
                  color: (categoryColors[selected.category] ?? {}).color,
                }}
              >
                {selected.category}
              </div>
              <button className="blog-modal-close" onClick={() => setSelected(null)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <h2 className="blog-modal-title">{selected.title}</h2>
            <p className="blog-modal-meta">{selected.readTime}</p>
            <div className="blog-modal-body">
              {renderContent(selected.content)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
