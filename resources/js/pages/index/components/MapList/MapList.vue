<script setup>
import { ref, computed } from 'vue';
import MapCard from './MapCard.vue';

const maps = ref(Object.values(window.maps).reverse())

</script>

<template>
	<div id="map_list" class="row">
		<div class="col-sm-6 map p-1" v-for="map in maps">
			<MapCard :mapInfo="map" />
		</div>
	</div>
</template>

<style scoped></style>
