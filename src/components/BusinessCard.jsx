import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { profile } from '../data/profile';

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://shubhamkashikar.com';

function buildVCard() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `TITLE:${profile.title}`,
    `EMAIL:${profile.email}`,
    `ADR:;;${profile.location};;;;`,
    `URL:${SITE_URL}`,
    `NOTE:Full-stack software developer and technical lead with 8+ years of experience.`,
    'END:VCARD',
  ].join('\n');
}

function downloadVCard() {
  const vcard = buildVCard();

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${profile.name.replace(' ', '_')}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BusinessCard({ onClose }) {
  const [flipped, setFlipped] = useState(false);
  const [view, setView]       = useState('card');

  return (
    <div className="bc-overlay" onClick={onClose}>
      <div className="bc-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bc-modal-header">
          <span className="bc-modal-label">Digital Business Card</span>
          <button className="bc-modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="bc-tabs">
          <button className={`bc-tab${view === 'card' ? ' bc-tab-active' : ''}`} onClick={() => setView('card')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Card
          </button>
          <button className={`bc-tab${view === 'qr' ? ' bc-tab-active' : ''}`} onClick={() => setView('qr')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h3v3h-3zM19 19h2v2h-2z" fill="currentColor"/>
            </svg>
            QR Code
          </button>
        </div>

        {/* Card view — vertical portrait */}
        {view === 'card' && (
          <>
            <div
              className={`bc-scene bc-scene-vertical${flipped ? ' bc-flipped' : ''}`}
              onClick={() => setFlipped(f => !f)}
              title="Click to flip"
            >
              <div className="bc-card">

                {/* Front */}
                <div className="bc-face bc-front bc-front-vertical">
                  {/* Top gradient band */}
                  <div className="bc-front-band">
                    <div className="bc-avatar-lg">SK</div>
                  </div>
                  {/* Body */}
                  <div className="bc-front-body">
                    <h2 className="bc-name">{profile.name}</h2>
                    <p className="bc-role">{profile.title}</p>
                    <div className="bc-divider" />
                    <div className="bc-contacts">
                      <div className="bc-contact-row">
                        <span className="bc-contact-icon">✉</span>
                        <span>{profile.email}</span>
                      </div>
                      <div className="bc-contact-row">
                        <span className="bc-contact-icon">📍</span>
                        <span>{profile.location}</span>
                      </div>
                      <div className="bc-contact-row">
                        <span className="bc-contact-icon">🌐</span>
                        <span>{SITE_URL.replace('https://', '')}</span>
                      </div>
                    </div>
                    <div className="bc-front-pills">
                      {profile.heroHighlights.slice(0, 2).map(h => (
                        <span key={h} className="bc-front-pill">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bc-flip-hint">Click to flip ↩</div>
                </div>

                {/* Back */}
                <div className="bc-face bc-back bc-back-vertical">
                  <div className="bc-back-mark-lg">SK</div>
                  <p className="bc-back-name-lg">{profile.name}</p>
                  <p className="bc-tagline">
                    "Building reliable, scalable software that solves real problems."
                  </p>
                  <div className="bc-divider bc-divider-light" />
                  <div className="bc-highlights-label">Core Expertise</div>
                  <div className="bc-highlights">
                    {profile.heroHighlights.map(h => (
                      <span key={h} className="bc-highlight-pill">{h}</span>
                    ))}
                    <span className="bc-highlight-pill">AI Assistants</span>
                    <span className="bc-highlight-pill">Team Leadership</span>
                    <span className="bc-highlight-pill">Cloud Platforms</span>
                  </div>
                  <div className="bc-divider bc-divider-light" style={{ marginTop: 'auto' }} />
                  <p className="bc-back-email">{profile.email}</p>
                  <div className="bc-flip-hint bc-flip-hint-light">Click to flip ↩</div>
                </div>

              </div>
            </div>

            <div className="bc-actions">
              <button className="btn btn-primary bc-btn" onClick={downloadVCard}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Save Contact
              </button>
              <button className="btn btn-secondary bc-btn" onClick={() => setFlipped(f => !f)}>
                {flipped ? 'See Front' : 'See Back'}
              </button>
            </div>
            <p className="bc-note">Tap the card to flip · Save Contact downloads a .vcf file</p>
          </>
        )}

        {/* QR view */}
        {view === 'qr' && (
          <div className="bc-qr-wrap">
            <div className="bc-qr-card">
              <QRCodeSVG
                value={`${SITE_URL}/api/qr-scan`}
                size={200}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="bc-qr-label">Scan to save contact</p>
            <p className="bc-qr-url">{profile.email}</p>
            <div className="bc-actions" style={{ marginTop: 20 }}>
              <button className="btn btn-primary bc-btn" onClick={downloadVCard}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Save Contact
              </button>
            </div>
            <p className="bc-note">Share this QR so others can open your portfolio instantly</p>
          </div>
        )}

      </div>
    </div>
  );
}
