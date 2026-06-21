import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-left">
          <span className="label">About Me</span>
          <h2 className="headline">
            Product-minded engineer with strong execution from idea to production.
          </h2>
        </div>
        <div className="about-right">
          <p>
            I specialize in taking complex requirements and turning them into polished, reliable, production-ready systems. My work spans public-facing kiosks, administrative dashboards, secure APIs, analytics platforms, cloud deployments, AI assistants, and integrations with third-party services.
          </p>
          <p>
            I have worked deeply on self-service and enterprise technology — including navigation assistance, record lookup, document support, multilingual assistance, video communication, kiosk deployments, reporting, and remote device configuration.
          </p>
          <p>
            Whether architecting from scratch or leading a team through complex delivery, I care about code quality, performance, security, and real-world usability.
          </p>
        </div>
      </div>
    </section>
  );
}
