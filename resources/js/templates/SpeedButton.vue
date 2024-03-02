<script setup>
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'

class Event {

	static speedDown() {
		speed.value = youtube.value.getPlaybackRate()

		if (speed.value > 0.25) {
			speed.value = speed.value - 0.25
			youtube.value.setPlaybackRate(speed.value)
		}

	}

	static speedUp() {
		speed.value = youtube.value.getPlaybackRate()

		if (speed.value < 2) {
			speed.value = speed.value + 0.25
			youtube.value.setPlaybackRate(speed.value)
		}

	}
}
</script>


<template>
	<button type="button" class="text-info btn cursor-pointer" id="speed_down" @click="Event.speedDown">
		<div class="position-relative">-<small class="f-key">F9</small></div>
	</button>
	<span id="speed">{{ speed.toFixed(2) }}</span>倍速
	<button type="button" class="text-info btn cursor-pointer" id="speed_up" @click="Event.speedUp">
		<div class="position-relative">+<small class="f-key">F10</small></div>
	</button>
</template>

<style>

.f-key {
	position: absolute;
	top: -0.6em;
	left: 50%;
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	font-size: 80%;
}

</style>