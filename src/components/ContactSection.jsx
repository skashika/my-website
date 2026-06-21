import React, { useState } from 'react';
import { profile } from '../data/profile';
import BusinessCard from './BusinessCard';

export default function ContactSection() {
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-inner">
            <span className="label">Contact</span>
            <h2 className="contact-headline">Let's build something great together.</h2>
            <p className="contact-sub">
              Available for product engineering, full-stack development, AI integrations,
              cloud architecture, and kiosk-based solutions.
            </p>
            <a href={`mailto:${profile.email}`} className="contact-email">{profile.email}</a>
            <div className="contact-btns">
              <a href={`mailto:${profile.email}`} className="btn btn-contact-primary">Send an Email</a>
              <button className="btn btn-contact-secondary" onClick={() => setShowCard(true)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Digital Business Card
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-copy">© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <div className="footer-links">
            <a href="#top">Top</a>
            <a href="#projects">Projects</a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
      </footer>

      {showCard && <BusinessCard onClose={() => setShowCard(false)} />}
    </>
  );
}
