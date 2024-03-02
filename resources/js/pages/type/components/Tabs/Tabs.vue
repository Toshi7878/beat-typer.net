  
<script setup>
import { tabRef } from '@/pages/type/assets/JS/consts/refs.js';

import TabRanking from '@/pages/type/components/Tabs/Tab/TabRanking.vue';
import TabStatus from '@/pages/type/components/Tabs/Tab/TabStatus.vue';



</script>

<template>
  <tabs ref="tabRef" class="col mx-2" :options="{ useUrlFragment: false }">
    <tab name="ステータス" id="ステータス" class="row">
      <TabStatus />
    </tab>
    <tab name="ランキング" id="ランキング" class="row">
      <TabRanking />
    </tab>
  </tabs>
</template>

<style>
.tabs-component {
  position: relative;
  top: -6.5px;
}

.tabs-component-tabs {
  margin-bottom: 1rem;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border-bottom: 1px solid #434343;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab.is-active {
  color: #FFF;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 2px #fff;
    z-index: 2;
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .25rem 2em;
  text-decoration: none;
}

.tabs-component-panels {
  height: 183px;

}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
  }
}
</style>
