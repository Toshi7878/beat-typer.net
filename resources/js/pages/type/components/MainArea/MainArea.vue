  
<script setup>
import { computed } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import Ready from './Scene/Ready.vue'
import Lyrics from './Scene/Lyrics.vue'
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';


//Top
const lineTimeBar = computed(() => { return typeArea.lineTimeBar.value })
const lineTimeBarMax = computed(() => { return typeArea.lineTimeBarMax.value })
const lineRemainTime = computed(() => { return typeArea.lineRemainTime.value.toFixed(1) })

//Bottom
const currentTimeBar = computed(() => { return typeArea.currentTimeBar.value })
const currentTimeBarMax = computed(() => { return typeArea.currentTimeBarMax.value })
const skip = computed(() => { return typeArea.skip.value })

const currentTime = computed(() => {
const TIME = typeArea.currentTime.value 
const MM = ("00" + parseInt(parseInt(TIME) / 60)).slice(-2);
const SS = ("00" +(parseInt(TIME) - ("00" + parseInt(parseInt(TIME) / 60)).slice(-2) * 60)).slice(-2)

	return `${MM}:${SS}`
})

</script>

<template>
	<div class="w-100 pt-3 pb-4 shadow bg-body-tertiary rounded fw-bold">
		<div id="top_area">
			<div id="top_notify" :class="{'invisible': game.playState.value == 'ready'}" class="mx-2 d-flex justify-content-between font-monospace">
				<div id="combo_notify" class="fs-4 position-relative">{{ typeArea.combo }}</div>
				<div id="effect_notify" class="position-absolute fs-4" v-html="typeArea.notify.value"></div>
				<div id="line_time_notify" class="position-relative fs-5">
					<span><span id="line_type_speed_value">{{ typeArea.lineTypeSpeed }}</span>kpm</span> - 残り<span id="line_remain_time">{{ lineRemainTime }}</span>秒
				</div>
			</div>
			<progress class="w-100" :value="lineTimeBar" :max="lineTimeBarMax"></progress>
		</div>

		<Ready v-if="game.playState.value === 'ready'"/>
		<Lyrics v-else-if="game.playState.value === 'play'"/>

		<div id="bottom_area">
			<div id="bottom_notify" :class="{'invisible': game.playState.value == 'ready'}" class="d-flex justify-content-between mx-2 fs-5">
				<div id="skip_notify" class="fst-italic text-secondary text-pre" v-text="skip"></div>
				<div id="total_time" class="fw-bold font-monospace"><span id="current_time" v-text="currentTime"></span> / <span id="duration_time" v-text="typeArea.durationTime.value"></span></div>
			</div>
			<progress class="w-100" :value="currentTimeBar" :max="currentTimeBarMax"></progress>
		</div>
	</div>

</template>

<style>
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
