<template>
  <header class="nav-wrap">
    <nav class="nav container">
      <a class="brand" href="#top" aria-label="Home">
        <span class="brand-mark">SK</span>
        <span>{{ profile.name }}</span>
      </a>
      <button class="mobile-toggle" @click="open = !open" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-links" :class="{ open }">
        <a href="#skills" @click="open = false">Skills</a>
        <a href="#projects" @click="open = false">Projects</a>
        <a href="#experience" @click="open = false">Experience</a>
        <a href="#contact" class="nav-cta" @click="open = false">Contact</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { profile } from '../data/profile';

const open = ref(false);
</script>
