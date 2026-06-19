<template>
  <section class="stats-section">
    <div class="container stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { stats } from '../data/profile';
</script>
