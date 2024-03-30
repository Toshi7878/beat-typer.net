<script setup>
import { computed } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import Ready from './Scene/Ready.vue'
import Lyrics from './Scene/Lyrics.vue'
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';


//Top
const lineTimeBar = computed(() => { return typeArea.value.lineTimeBar })
const lineTimeBarMax = computed(() => { return typeArea.value.lineTimeBarMax })
const lineRemainTime = computed(() => { return typeArea.value.lineRemainTime.toFixed(1) })
const combo = computed(() => { return typeArea.value.combo })
const lineTypeSpeed = computed(() => { return typeArea.value.lineTypeSpeed })

//Bottom
const currentTimeBar = computed(() => { return typeArea.value.currentTimeBar })
const currentTimeBarMax = computed(() => { return typeArea.value.durationTime })
const skip = computed(() => {

	const SKIP_KEY = typeArea.value.skip

	if (SKIP_KEY) {
		return `Type ${SKIP_KEY} key to Skip. ⏩`;
	} else {
		return '';
	}

})

const currentTime = computed(() => {
	const TIME = typeArea.value.currentTime
	const MM = ("00" + parseInt(TIME / 60)).slice(-2)
	const SS = ("00" + parseInt(TIME % 60)).slice(-2)

	return `${MM}:${SS}`
})

const durationTime = computed(() => {
	const TIME = typeArea.value.durationTime
	const MM = ("00" + parseInt(TIME / 60)).slice(-2)
	const SS = ("00" + parseInt(TIME % 60)).slice(-2)

	return `${MM}:${SS}`
})
</script>

<template>
	<div class="w-100 pt-3 pb-4 shadow bg-body-tertiary rounded fw-bold">
		<div id="top_area">
			<div id="top_notify" :class="{ 'invisible': game.playState.value != 'play' }" class="mx-2 d-flex justify-content-between font-monospace">
				<div id="combo_notify" class="fs-4 position-relative">{{ combo }}</div>
				<div id="effect_notify" class="position-absolute fs-4"></div>
				<div id="line_time_notify" class="position-relative fs-5">
					<span><span id="line_type_speed_value">{{ lineTypeSpeed }}</span>kpm</span> - 残り<span id="line_remain_time">{{ lineRemainTime }}</span>秒
				</div>
			</div>
			<progress class="w-100" :value="lineTimeBar" :max="lineTimeBarMax" :class="{ 'invisible': game.playState.value == 'end' }"></progress>
		</div>

		<Ready v-if="game.playState.value === 'ready'" />
		<Lyrics v-else-if="game.playState.value === 'play'" />

		<div id="bottom_area">
			<div id="bottom_notify" :class="{ 'invisible': game.playState.value != 'play' }" class="d-flex justify-content-between mx-2 fs-5">
				<div id="skip_notify" class="fst-italic text-secondary text-pre" v-text="skip"></div>
				<div id="total_time" class="fw-bold font-monospace"><span id="current_time" v-text="currentTime"></span> / <span id="duration_time" v-text="durationTime"></span></div>
			</div>
			<progress class="w-100" :value="currentTimeBar" :max="currentTimeBarMax" :class="{ 'invisible': game.playState.value == 'end' }"></progress>
		</div>
	</div>

</template>

<style>
progress {
	appearance: none;
	width: 100%;
	height: 0.5rem;
	outline: solid thin #000;
	border-radius: 5px;
}

progress::-webkit-progress-bar {
	background: #375a7f52;
}

progress::-webkit-progress-value {
	background: #4d97e6;
	border-radius: 5px;

}

.text-pre {
	white-space: pre !important;
}

#effect_notify {
	letter-spacing: 2px;
	position: absolute;
	left: 48%;
	transform: translate(-50%);
	-webkit-transform: translate(-50%);
	top: 304px;
	bottom: 0;
}

#combo_notify {
	height: 5px;
	bottom: 14.4px;
}

#line_time_notify {
	height: 20px;
	bottom: 10px;
}
</style>
