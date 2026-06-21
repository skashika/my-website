import React from 'react';
import { experience } from '../data/profile';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div className="section-intro center">
          <span className="label">Experience</span>
          <h2 className="headline">Professional background</h2>
          <p className="subheadline">8+ years building products across startups and enterprise sectors.</p>
        </div>

        <div className="timeline">
          {experience.map(item => (
            <div key={item.role + item.company} className="exp-card">
              <div className="exp-header">
                <div>
                  <div className="exp-role">{item.role}</div>
                  <div className="exp-company">{item.company}</div>
                </div>
                <span className="exp-period">{item.period}</span>
              </div>
              <div className="exp-points">
                {item.points.map(point => (
                  <div key={point} className="exp-point">
                    <div className="exp-point-dot" />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
