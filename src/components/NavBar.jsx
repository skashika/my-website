import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav-wrap${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav container">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">SK</span>
          <span>{profile.name}</span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <div className={`nav-links${open ? ' open' : ''}`}>
          <a href="#about"      onClick={() => setOpen(false)}>About</a>
          <a href="#skills"     onClick={() => setOpen(false)}>Skills</a>
          <a href="#projects"   onClick={() => setOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </nav>
    </header>
  );
}
