<template>
  <section id="experience" class="section-padding experience-section">
    <div class="container">
      <div class="section-heading center">
        <p class="section-kicker">Experience</p>
        <h2>Professional background</h2>
      </div>

      <div class="timeline">
        <article v-for="item in experience" :key="item.role + item.company" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div>
                <h3>{{ item.role }}</h3>
                <p>{{ item.company }}</p>
              </div>
              <span>{{ item.period }}</span>
            </div>
            <ul>
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience } from '../data/profile';
</script>
