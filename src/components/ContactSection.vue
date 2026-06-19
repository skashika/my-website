<template>
  <section id="contact" class="section-padding contact-section">
    <div class="container contact-card">
      <div>
        <p class="section-kicker">Contact</p>
        <h2>Let’s build useful software that works in the real world.</h2>
        <p>
          Available for product engineering, full-stack development, AI integrations, cloud architecture, GovTech platforms, and kiosk-based solutions.
        </p>
      </div>
      <div class="contact-actions">
        <a :href="`mailto:${profile.email}`" class="btn primary">Email Me</a>
        <a :href="profile.github" target="_blank" rel="noreferrer" class="btn secondary">GitHub</a>
        <p class="small-note">Update email, GitHub, and LinkedIn in <code>src/data/profile.js</code>.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { profile } from '../data/profile';
</script>
