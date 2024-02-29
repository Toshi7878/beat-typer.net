<script setup>

import Tabs from './components/Tabs/Tabs.vue'
import YouTubeView from './components/YouTubeView.vue'
import LineTable from './components/LineTable.vue'
import ProgressBar from './components/ProgressBar.vue'
import Header from '@/templates/header.vue'


</script>

<template>
  <Header />
  <main class="container-fluid w-100">
    <div class="row">
      <YouTubeView />
      <Tabs />
      <ProgressBar />
      <LineTable />
    </div>

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
