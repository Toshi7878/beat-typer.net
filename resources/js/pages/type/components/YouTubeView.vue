<script setup>
import YouTube from 'vue3-youtube'
import { ytState } from '@/pages/type/assets/JS/components/ytState.js';
import { youtube } from '@/templates/assets/JS/youtubeRef.js'



const vars = { disablekb: 1, controls: 0 }
const ID = window.movieId
</script>

<template>
	<div id="youtube_container" class="col-xs mb-3 me-2">
		<!-- 16:9をpx単位で計算してwidthとheightを求める https://uzurea.net/resolution-16-9/ -->
		<YouTube :src="ID" :vars="vars" width="382.2222px" height="215px" @ready="ytState.ready()" ref="youtube" @state-change="ytState.change" />
	</div>
</template>


<style>
#youtube_container {
	width: 382.2222px;
	height: 215px;
}
</style>