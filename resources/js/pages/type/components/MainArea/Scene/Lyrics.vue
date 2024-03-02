  
<script setup>
import { computed } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';

//Word
const mainInput = computed(() => { return typeArea.mainInput.value })
const mainNextChar = computed(() => { return typeArea.mainNextChar.value['k'] })
const mainWord = computed(() => {
	const WORD = typeArea.mainWord.value.join("");

	if (WORD) {
		return WORD
	} else {
		return ''
	}
})
const subInput = computed(() => { return typeArea.subInput.value })
const subNextChar = computed(() => { return typeArea.subNextChar.value['r'] })
const subWord = computed(() => {
	const WORD = typeArea.subWord.value.join("");

	if (WORD) {
		return WORD
	} else {
		return ''
	}
})

//Lyrics
const lyrics = computed(() => { return typeArea.lyrics.value })
const nextLyrics = computed(() => { return typeArea.nextLyrics.value })
const nextTypeSpeed = computed(() => {
	const SPEED = typeArea.nextTypeSpeed.value

	if (SPEED > 0) {
		return `NEXT:${typeArea.nextTypeSpeed.value.toFixed()}kpm`
	} else {
		return ''
	}
})

</script>

<template>

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

</template>

<style>

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

#main {
	font-size: 32.0px;
	letter-spacing: 1.0px;
}

#main::before, #sub::before{
	content: '\200B';
}

#sub {
	font-size: 28.0px;
	letter-spacing: 2.2px;
}

#lyrics {
	text-indent: -0.9rem;
}

#next {
	text-indent: -0.2rem;
}

.font {
	font-family: "Yu Gothic", "YuGothic";
}
</style>
