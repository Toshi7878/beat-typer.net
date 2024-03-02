<script setup>

import YouTubeView from './components/YouTubeView.vue'
import Tabs from './components/Tabs/Tabs.vue'
import TypeArea from './components/TypeArea/TypeArea.vue'
import Ready from './components/TypeArea/Ready.vue'

import Header from '@/templates/header.vue'
import './assets/JS/DB/getMap.js'


</script>

<template>
  <Header />
  <main class="container-fluid">
    <div class="row">
      <YouTubeView />
      <Tabs />
      <div class="w-100 pt-3 pb-4 shadow bg-body-tertiary rounded fw-bold">
        <Ready />
        <TypeArea />
      </div>
    </div>

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
