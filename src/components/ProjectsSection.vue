<template>
  <section id="projects" class="section-padding projects-section">
    <div class="container">
      <div class="section-heading">
        <p class="section-kicker">Featured Work</p>
        <h2>Projects that show product ownership, technical depth, and client delivery.</h2>
      </div>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <p class="project-category">{{ project.category }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tag-list compact">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { projects } from '../data/profile';
</script>
