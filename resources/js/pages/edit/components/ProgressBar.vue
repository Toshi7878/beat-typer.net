  
<script setup>
import { TIME_BAR_VAL, youtube, speed } from '@/pages/edit/assets/JS/consts/refs.js';

class Event {


	static seekBar(event) {
		youtube.value.seekTo(event.target.value)
		document.activeElement.blur()
	}

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
	<div class="row justify-content-center">
		<input type="range" id="time-bar" @change="Event.seekBar" class="col form-range" max="100" step="0.01" v-model="TIME_BAR_VAL">
		<div class="col-2 text-center">
			<button class="text-info btn cursor-pointer" id="speed_down" @click="Event.speedDown">
				<div class="position-relative">-<small class="f-key">F9</small></div>
			</button>
			<span id="speed">{{ speed.toFixed(2) }}</span>倍速
			<button class="text-info btn cursor-pointer" id="speed_up" @click="Event.speedUp">
				<div class="position-relative">+<small class="f-key">F10</small></div>
			</button>
		</div>
	</div>
</template>

<style>
#time-bar {
	margin: 0.5rem;
}

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
