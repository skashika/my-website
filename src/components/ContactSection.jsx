import React from 'react';
import { profile } from '../data/profile';

export default function ContactSection() {
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
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-contact-secondary">GitHub Profile</a>
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
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}
