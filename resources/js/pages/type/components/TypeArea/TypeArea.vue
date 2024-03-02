  
<script setup>
import { computed } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';


const lineTimeBar = computed(() => { return typeArea.lineTimeBar.value })
const lineTimeBarMax = computed(() => { return typeArea.lineTimeBarMax.value })

const mainInput = computed(() => { return typeArea.mainInput.value })

const mainNextChar = computed(() => { return typeArea.mainNextChar.value })
const mainWord = computed(() => {
	const WORD = typeArea.mainWord.value;

	if (WORD) {
		return WORD
	} else {
		return ' '
	}
})
const subInput = computed(() => { return typeArea.subInput.value })
const subNextChar = computed(() => { return typeArea.subNextChar.value })
const subWord = computed(() => {
	const WORD = typeArea.subWord.value;

	if (WORD) {
		return WORD
	} else {
		return ' '
	}
})


const lyrics = computed(() => { return typeArea.lyrics.value })
const nextLyrics = computed(() => { return typeArea.nextLyrics.value })
const nextTypeSpeed = computed(() => {
	const SPEED = typeArea.nextTypeSpeed.value

	if (SPEED > 0) {
		return `NEXT:${typeArea.nextTypeSpeed.value.toFixed()}kpm`
	} else {
		return ' '
	}
})

const currentTimeBar = computed(() => { return typeArea.currentTimeBar.value })
const currentTimeBarMax = computed(() => { return typeArea.currentTimeBarMax.value })


</script>

<template>
	<div class="w-100 pt-3 pb-4 shadow bg-body-tertiary rounded fw-bold">
		<div id="top_area">
			<div id="top_notify" class="mx-2 d-flex justify-content-between font-monospace">
				<div id="combo_notify" class="fs-4 position-relative">{{ typeArea.combo }}</div>
				<div id="effect_notify" class="position-absolute fs-4" v-html="typeArea.notify.value"></div>
				<div id="line_time_notify" class="position-relative fs-5">
					<span><span id="line_type_speed_value">{{ typeArea.lineTypeSpeed }}</span>kpm</span> - 残り<span id="line_remain_time">{{ typeArea.lineRemainTime.value }}</span>秒
				</div>
			</div>
			<progress class="w-100" :value="lineTimeBar" :max="lineTimeBarMax"></progress>
		</div>
		<div id="word_area" class="my-1 mx-2">
			<div id="type_area" class="text-pre font">
				<div id="main" class="text-shadow text-truncate">
					<span class='correct-input text-secondary'>{{ mainInput }}</span><span class='next-char text-danger'>{{ mainNextChar }}</span><span class='word'>{{ mainWord }}</span>
				</div>
				<div id="sub" class="mt-1 text-shadow text-uppercase text-truncate">
					<span class='correct-input text-secondary'>{{ subInput }}</span><span class='next-char text-danger'>{{ subNextChar }}</span><span class='word'>{{ subWord }}</span>
				</div>
			</div>
			<div id="lyrics" class="h3 mt-4 text-truncate d-flex">
				<ruby class="text-pre">　<rt>　</rt></ruby>
				<div id="lyrics_value" v-html="lyrics"></div>
			</div>

			<div id="next" class="mt-3 text-white-50 fs-5">
				<div id="next_lyrics" class="d-flex text-truncate">
					<div><ruby class="text-pre">　<rt>　</rt></ruby></div>
					<div v-html="nextLyrics"></div>
				</div>
				<div id="next_speed" class="d-flex text-truncate">
					<div><ruby class="text-pre">　<rt>　</rt></ruby></div>
					<div class="fw-normal" v-text="nextTypeSpeed"></div>
				</div>
			</div>

		</div>
		<div id="bottom_area">
			<div id="bottom_notify" class="d-flex justify-content-between mx-2 fs-5">
				<div id="skip_notify" class="fst-italic text-secondary text-pre" v-text="typeArea.skip.value"></div>
				<div id="total_time" class="fw-bold"><span id="current_time" v-text="typeArea.currentTime.value"></span> / <span id="duration_time" v-text="typeArea.durationTime.value"></span></div>
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

.text-shadow {
	text-shadow: black 0.6px 0px, black -0.6px 0px,
		black 0px -0.6px, black 0px 0.6px,
		black 0.6px 0.6px, black -0.6px 0.6px,
		black 0.6px -0.6px, black -0.6px -0.6px,
		black 1px 0.6px, black -1px 0.6px,
		black 1px -0.6px, black -1px -0.6px,
		black 0.6px 1px, black -0.6px 1px,
		black 0.6px -1px, black -0.6px -1px;
}

#combo_notify {
	height: 5px;
	bottom: 14.4px;
}

#line_time_notify {
	height: 20px;
	bottom: 10px;
}

#main {
	font-size: 32.0px;
	letter-spacing: 1.0px;
}

#sub {
	font-size: 28.0px;
	letter-spacing: 2.2px;
}

#lyrics {
	text-indent: -0rem;
}

.font {
	font-family: "Yu Gothic", "YuGothic";
}
</style>
