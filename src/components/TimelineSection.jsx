import React, { useState } from 'react';

const milestones = [
  {
    year: '2016',
    period: 'Jul 2016',
    title: 'Started Career as Software Engineer',
    company: 'Tech Mahindra Pvt. Ltd.',
    type: 'job',
    description: 'Began professional career working on enterprise microservices, business rule management, data migration pipelines, and backend integrations.',
    tags: ['Microservices', 'Data Migration', 'Enterprise Backend'],
    icon: '💼',
  },
  {
    year: '2019',
    period: 'Jun 2019',
    title: 'Completed 3 Years at Tech Mahindra',
    company: 'Tech Mahindra Pvt. Ltd.',
    type: 'milestone',
    description: 'Gained strong foundations in enterprise software, backend architecture, and production-scale data systems over 3 years.',
    tags: ['3 Years Experience', 'Enterprise Systems'],
    icon: '🏆',
  },
  {
    year: '2021',
    period: 'Jun 2021',
    title: 'Joined as Full Stack Developer',
    company: 'Advanced Robot Solutions LLC',
    type: 'job',
    description: 'Moved into full-stack development — building kiosk interfaces, browser applications, analytics dashboards, video calling workflows, and third-party integrations.',
    tags: ['Full Stack', 'Kiosk Apps', 'Cloud Databases', 'Realtime'],
    icon: '🚀',
  },
  {
    year: '2022',
    period: 'Jun 2022',
    title: 'Promoted to Senior Developer & Solution Architect',
    company: 'Advanced Robot Solutions LLC',
    type: 'promotion',
    description: 'Stepped into a leadership and architecture role — leading AI-powered platform development, guiding client delivery, and making key design decisions across multiple enterprise deployments.',
    tags: ['Tech Lead', 'Solution Architecture', 'AI Platforms', 'Client Delivery'],
    icon: '⭐',
  },
  {
    year: '2022–24',
    period: '2022 – 2024',
    title: 'Built AI-Powered Self-Service Ecosystem',
    company: 'Advanced Robot Solutions LLC',
    type: 'achievement',
    description: 'Architected and delivered a full ecosystem — AI knowledge assistant with RAG and vector search, guided form platform, video communication, analytics intelligence, and multilingual kiosk deployments.',
    tags: ['RAG', 'Vector Search', 'AI Assistant', 'Multilingual', '20+ Deployments'],
    icon: '🤖',
  },
  {
    year: 'Now',
    period: 'Present',
    title: '8+ Years · Leading AI & Full Stack Delivery',
    company: 'Advanced Robot Solutions LLC',
    type: 'current',
    description: 'Currently leading end-to-end development of AI-powered platforms, cloud APIs, and self-service solutions. Open to new challenges and collaborations.',
    tags: ['AI & Cloud', 'Tech Leadership', 'Open to Opportunities'],
    icon: '📍',
  },
];

const typeColor = {
  job:         { bg: '#eff6ff', border: '#93c5fd', dot: '#2563eb', label: 'New Role' },
  promotion:   { bg: '#faf5ff', border: '#c4b5fd', dot: '#7c3aed', label: 'Promotion' },
  achievement: { bg: '#f0fdf4', border: '#86efac', dot: '#16a34a', label: 'Achievement' },
  milestone:   { bg: '#fff7ed', border: '#fed7aa', dot: '#ea580c', label: 'Milestone' },
  current:     { bg: '#fef2f2', border: '#fca5a5', dot: '#dc2626', label: 'Current' },
};

export default function TimelineSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-inner">
        <p className="section-eyebrow">My Journey</p>
        <h2 className="section-title">Career Timeline</h2>
        <p className="section-sub">8+ years of building, shipping and leading — from enterprise backend engineer to AI platform architect.</p>

        <div className="timeline-wrap">
          {/* Vertical line */}
          <div className="timeline-line" />

          {milestones.map((m, i) => {
            const colors = typeColor[m.type];
            const isOpen = expanded === i;
            const isRight = i % 2 === 0;

            return (
              <div key={i} className={`timeline-row ${isRight ? 'tl-right' : 'tl-left'}`}>
                {/* Year label */}
                <div className="tl-year-wrap">
                  <span className="tl-year">{m.year}</span>
                </div>

                {/* Dot */}
                <div className="tl-dot-wrap">
                  <div className="tl-dot" style={{ background: colors.dot, boxShadow: `0 0 0 4px ${colors.border}` }}>
                    <span>{m.icon}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="tl-card-wrap">
                  <div
                    className={`tl-card${isOpen ? ' tl-card-open' : ''}`}
                    style={{ background: colors.bg, borderColor: colors.border }}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="tl-card-header">
                      <div>
                        <span className="tl-badge" style={{ background: colors.border, color: colors.dot }}>{colors.label}</span>
                        <h3 className="tl-card-title">{m.title}</h3>
                        <p className="tl-card-company">{m.company} · {m.period}</p>
                      </div>
                      <span className="tl-toggle">{isOpen ? '▲' : '▼'}</span>
                    </div>

                    {isOpen && (
                      <div className="tl-card-body">
                        <p className="tl-card-desc">{m.description}</p>
                        <div className="tl-tags">
                          {m.tags.map(t => (
                            <span key={t} className="tl-tag" style={{ borderColor: colors.dot, color: colors.dot }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
