import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import BlogSection from './components/BlogSection';
import TimelineSection from './components/TimelineSection';
import ChatBot from './components/ChatBot';
import AdminPage from './components/AdminPage';

export default function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }

  return (
    <div className="site-shell">
      <div className="top-banner">
        <span className="top-banner-text">
          Interested in AI-powered self-service solutions for your business?
        </span>
        <a
          href="https://www.getrobotsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="top-banner-btn"
          onClick={() => fetch('/api/track-ars-click', { method: 'POST' }).catch(() => {})}
        >
          Visit Advanced Robot Solutions ↗
        </a>
      </div>
      <NavBar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <TimelineSection />
        <BlogSection />
        <ContactSection />
      </main>
      <ChatBot />
    </div>
  );
}
