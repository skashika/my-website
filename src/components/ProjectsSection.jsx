import React from 'react';
import { projects } from '../data/profile';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-intro">
          <span className="label">Featured Work</span>
          <h2 className="headline">Projects that show product ownership &amp; technical depth.</h2>
          <p className="subheadline">End-to-end delivery across AI, self-service platforms, and enterprise systems.</p>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <article key={project.title} className="project-card">
              <div className="project-cat">{project.category}</div>
              <div className="project-title">{project.title}</div>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
