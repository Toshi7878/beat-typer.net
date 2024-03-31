<script setup>

import Header from '@/templates/header.vue'
import MapList from './components/MapList/MapList.vue';



</script>

<template>
  <Header />
  <main class="container">
    <div class="row">
      <MapList />
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
