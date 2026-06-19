<template>
  <section id="top" class="hero section-padding">
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow">Tech Lead • Full Stack Developer • AI Product Builder</p>
        <h1>Building secure, scalable software for courts, government, and modern digital products.</h1>
        <p class="hero-text">{{ profile.summary }}</p>
        <div class="hero-actions">
          <a href="#projects" class="btn primary">View Projects</a>
          <a href="#contact" class="btn secondary">Contact Me</a>
        </div>
        <div class="hero-pills" aria-label="Key highlights">
          <span v-for="item in profile.heroHighlights" :key="item">{{ item }}</span>
        </div>
      </div>

      <div class="hero-card reveal delay-1">
        <div class="profile-card-glow"></div>
        <div class="profile-card">
          <div class="avatar">SK</div>
          <h2>{{ profile.name }}</h2>
          <p>{{ profile.title }}</p>
          <div class="card-stack">
            <div>
              <span>Core Stack</span>
              <strong>Vue • Node • PostgreSQL • Cloud • AI</strong>
            </div>
            <div>
              <span>Specialty</span>
              <strong>GovTech, Kiosks, RAG, APIs</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Reliable products that solve real operational problems</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { profile } from '../data/profile';
</script>
