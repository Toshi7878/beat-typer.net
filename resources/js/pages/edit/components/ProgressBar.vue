  
<script setup>
import { TIME_BAR_VAL } from '@/pages/edit/assets/JS/consts/refs.js';

import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import SpeedButton from '@/templates/SpeedButton.vue'

class Event {


	static seekBar(event) {
		youtube.value.seekTo(event.target.value)
		document.activeElement.blur()
	}

}
</script>
<template>
	<div class="row justify-content-center">
		<input type="range" id="time-bar" @change="Event.seekBar" class="col form-range" max="100" step="0.01" v-model="TIME_BAR_VAL">
		<div class="col-2 text-center">
			<SpeedButton />
		</div>
	</div>
</template>

<style>
#time-bar {
	margin: 0.5rem;
}
</style>
