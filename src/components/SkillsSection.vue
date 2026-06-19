<template>
  <section id="skills" class="section-padding skills-section">
    <div class="container">
      <div class="section-heading center">
        <p class="section-kicker">Skills</p>
        <h2>Full-stack, cloud, AI, database, and product delivery skills</h2>
        <p>Grouped by the way I build and ship real products.</p>
      </div>

      <div class="skills-grid">
        <article v-for="group in skillGroups" :key="group.title" class="skill-card">
          <h3>{{ group.title }}</h3>
          <div class="tag-list">
            <span v-for="skill in group.skills" :key="skill">{{ skill }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skillGroups } from '../data/profile';
</script>
