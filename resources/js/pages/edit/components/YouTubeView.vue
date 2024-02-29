<script setup>
import YouTube from 'vue3-youtube'
import { ytState } from '@/pages/edit/assets/JS/components/ytState.js';
import { youtube } from '@/pages/edit/assets/JS/consts/refs.js';



const vars = { disablekb: 1, controls: 0 }

const isNew = location.search.slice(1, 3)
let id = ''
if (isNew == 'id') {
	id = location.search.slice(4)
} else {
	id = location.search.slice(4)
}
</script>

<template>
	<div id="youtube_container" class="col-3">
		<YouTube :src="id" :vars="vars" width="200px" height="200px" @ready="ytState.ready()" ref="youtube" @state-change="ytState.change" />
	</div>
</template>


<style>
#youtube_container {
	width: fit-content;
}
</style>