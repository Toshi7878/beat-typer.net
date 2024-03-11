<script setup>
import YouTube from 'vue3-youtube'
import { ytState } from '@/pages/type/assets/JS/components/ytState.js';
import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import { map } from '@/pages/type/assets/JS/consts/refs.js';



const vars = { disablekb: 1, controls: 0 }
const ID = window.movieId
</script>

<template>
	<div id="youtube_container" class="col-xs mb-3 me-2" :class="{'invisible': map.value}">
		<!-- 16:9をpx単位で計算してwidthとheightを求める https://uzurea.net/resolution-16-9/ -->
		<YouTube :src="ID" :vars="vars" width="382.2222px" height="215px" @ready="ytState.ready()" ref="youtube" @state-change="ytState.change" @playback-rate-change="ytState.playbackRateChange"/>
	</div>
</template>


<style>
#youtube_container {
	width: 382.2222px;
	height: 215px;
}
</style>
<!-- 

<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import { ytState } from '@/pages/type/assets/JS/components/ytState.js';

import { map } from '@/pages/type/assets/JS/consts/refs.js';

const ID = window.movieId
</script>

<template>
		<div id="youtube_container" class="col-xs mb-3 me-2" :class="{'invisible': map.value}">
		<!-- 16:9をpx単位で計算してwidthとheightを求める https://uzurea.net/resolution-16-9/ -->
		<!-- <LiteYouTubeEmbed :id="ID" ref="youtube" params="controls=0&disablekb=1"></LiteYouTubeEmbed> -->
<!-- </div> -->

<!-- </template>


<style>
#youtube_container {
	width: 382.2222px;
	height: 215px;
}
</style> -->