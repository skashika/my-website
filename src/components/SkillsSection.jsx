import React from 'react';
import { skillGroups } from '../data/profile';

const icons = {
  'Frontend Engineering':    '🖥️',
  'Backend & APIs':          '⚙️',
  'Databases & Data':        '🗄️',
  'Cloud & DevOps':          '☁️',
  'AI & Automation':         '🤖',
  'Integrations & Features': '🔗',
  'Kiosk & Hardware':        '📟',
  'Leadership':              '🧭',
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-intro center">
          <span className="label">Skills</span>
          <h2 className="headline">Full-stack, cloud, AI & product delivery</h2>
          <p className="subheadline">Grouped by the way I build and ship real products.</p>
        </div>

        <div className="skills-grid">
          {skillGroups.map(group => (
            <article key={group.title} className="skill-card">
              <div className="skill-card-title">
                <span className="skill-icon">{icons[group.title] ?? '🛠️'}</span>
                {group.title}
              </div>
              <div className="skill-tags">
                {group.skills.map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
