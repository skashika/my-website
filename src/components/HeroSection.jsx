import React from 'react';
import { profile } from '../data/profile';

export default function HeroSection() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">

        {/* Left copy */}
        <div>
          <h1 className="hero-name fade-up fade-up-d1">
            {profile.name.split(' ')[0]}{' '}
            <span>{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="hero-title fade-up fade-up-d1">{profile.title}</p>
          <p className="hero-summary fade-up fade-up-d2">{profile.summary}</p>

          <div className="hero-actions fade-up fade-up-d2">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact"  className="btn btn-secondary">Get In Touch</a>
          </div>

          <div className="hero-highlights fade-up fade-up-d3">
            {profile.heroHighlights.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* Right profile card */}
        <div className="fade-up fade-up-d2">
          <div className="profile-card">
            <div className="avatar-wrap">
              <div className="avatar">SK</div>
              <div className="avatar-info">
                <strong>{profile.name}</strong>
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-rows">
              <div className="profile-row">
                <span className="profile-row-icon">⚡</span>
                <div className="profile-row-body">
                  <div className="profile-row-label">Core Stack</div>
                  <div className="profile-row-value">Frontend · Backend · Cloud · Databases · AI</div>
                </div>
              </div>
              <div className="profile-row">
                <span className="profile-row-icon">🎯</span>
                <div className="profile-row-body">
                  <div className="profile-row-label">Specialty</div>
                  <div className="profile-row-value">Self-Service Platforms, RAG Pipelines, APIs</div>
                </div>
              </div>
              <div className="profile-row">
                <span className="profile-row-icon">✉️</span>
                <div className="profile-row-body">
                  <div className="profile-row-label">Email</div>
                  <div className="profile-row-value">{profile.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
