<script setup>
import { youtube, playSpeed, speed } from '@/templates/assets/JS/youtubeRef.js'

class Event {

	static speedDown() {
		playSpeed.value = youtube.value.getPlaybackRate()

		if (playSpeed.value > 0.25) {
			const SPEED = playSpeed.value - 0.25
			Event.speedChange(SPEED)
		}

	}

	static speedUp() {
		playSpeed.value = youtube.value.getPlaybackRate()

		if (playSpeed.value < 2) {
			const SPEED = playSpeed.value + 0.25
			Event.speedChange(SPEED)

		}

	}

	static speedChange(SPEED){
		speed.value = SPEED
		playSpeed.value = SPEED
		youtube.value.setPlaybackRate(SPEED)
	}
}
</script>


<template>
	<button type="button" class="text-info btn cursor-pointer" id="speed_down" @click="Event.speedDown">
		<div class="position-relative">-<small class="f-key">F9</small></div>
	</button>
	<span id="speed">{{ playSpeed.toFixed(2) }}</span>倍速
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