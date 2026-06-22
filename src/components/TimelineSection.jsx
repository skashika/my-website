import React, { useState } from 'react';

const milestones = [
  {
    year: 'Jul 2016',
    title: 'Started as Software Engineer',
    company: 'Tech Mahindra Pvt. Ltd.',
    type: 'role',
    description: 'Began professional career working on enterprise microservices, business rule management, data migration pipelines, and backend integrations.',
    tags: ['Microservices', 'Data Migration', 'Enterprise Backend'],
  },
  {
    year: 'Jun 2019',
    title: '3 Years · Enterprise Systems',
    company: 'Tech Mahindra Pvt. Ltd.',
    type: 'milestone',
    description: 'Completed 3 years building production-scale backend systems, gaining deep expertise in enterprise architecture and data engineering.',
    tags: ['3 Years', 'Production Systems', 'Backend Architecture'],
  },
  {
    year: 'Jun 2021',
    title: 'Joined as Full Stack Developer',
    company: 'Advanced Robot Solutions LLC',
    type: 'role',
    description: 'Moved into full-stack development — building kiosk interfaces, browser applications, analytics dashboards, video workflows, and cloud integrations.',
    tags: ['Full Stack', 'Kiosk Apps', 'Cloud', 'Realtime'],
  },
  {
    year: 'Jun 2022',
    title: 'Promoted to Senior Developer & Architect',
    company: 'Advanced Robot Solutions LLC',
    type: 'promotion',
    description: 'Stepped into a leadership and architecture role — leading AI-powered platform development, guiding client delivery, and making key design decisions across enterprise deployments.',
    tags: ['Tech Lead', 'Solution Architecture', 'Client Delivery'],
  },
  {
    year: '2022 – 2024',
    title: 'Built AI-Powered Self-Service Ecosystem',
    company: 'Advanced Robot Solutions LLC',
    type: 'achievement',
    description: 'Architected and delivered a full ecosystem — AI knowledge assistant with RAG and vector search, guided form platform, video communication, analytics intelligence, and 20+ multilingual kiosk deployments.',
    tags: ['RAG & Vector Search', 'AI Assistant', 'Multilingual', '20+ Deployments'],
  },
  {
    year: 'Present',
    title: '8+ Years · Leading AI & Full Stack Delivery',
    company: 'Advanced Robot Solutions LLC',
    type: 'current',
    description: 'Currently leading end-to-end development of AI-powered platforms, cloud APIs, and self-service solutions across enterprise clients.',
    tags: ['AI & Cloud', 'Tech Leadership', 'End-to-End Delivery'],
  },
];

const typeConfig = {
  role:        { label: 'New Role',    color: 'var(--brand)',  bg: 'var(--brand-lt)', icon: '💼' },
  promotion:   { label: 'Promotion',   color: '#7c3aed',       bg: '#f5f3ff',         icon: '⭐' },
  achievement: { label: 'Achievement', color: '#16a34a',       bg: '#f0fdf4',         icon: '🏆' },
  milestone:   { label: 'Milestone',   color: '#ea580c',       bg: '#fff7ed',         icon: '📌' },
  current:     { label: 'Current',     color: 'var(--brand)',  bg: 'var(--brand-lt)', icon: '📍' },
};

export default function TimelineSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className="section-intro center">
          <span className="label">Career Journey</span>
          <h2 className="headline">How I got here</h2>
          <p className="subheadline">8+ years of building, shipping and leading — from enterprise backend engineer to AI platform architect.</p>
        </div>

        <div className="ctl-wrap">
          <div className="ctl-line" />

          {milestones.map((m, i) => {
            const cfg    = typeConfig[m.type];
            const isOpen = expanded === i;

            return (
              <div key={i} className="ctl-row">
                {/* Dot + year */}
                <div className="ctl-dot-col">
                  <div className="ctl-dot" style={{ background: cfg.color }}>
                    <span>{cfg.icon}</span>
                  </div>
                  <span className="ctl-year">{m.year}</span>
                </div>

                {/* Card */}
                <div
                  className={`ctl-card${isOpen ? ' ctl-open' : ''}`}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  <div className="ctl-card-top">
                    <div className="ctl-card-left">
                      <span className="ctl-badge" style={{ color: cfg.color, background: cfg.bg }}>
                        {cfg.label}
                      </span>
                      <h3 className="ctl-title">{m.title}</h3>
                      <p className="ctl-company">{m.company}</p>
                    </div>
                    <span className="ctl-chevron">{isOpen ? '▲' : '▼'}</span>
                  </div>

                  {isOpen && (
                    <div className="ctl-body">
                      <p className="ctl-desc">{m.description}</p>
                      <div className="ctl-tags">
                        {m.tags.map(t => (
                          <span key={t} className="skill-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
