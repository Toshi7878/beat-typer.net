<script setup>
import { computed } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';

//Word
const kanaInputed = computed(() => { return typeArea.value.kanaInputed.substr(-10, 10).replace(/ /g, 'ˍ') })
const kanaNextChar = computed(() => { return typeArea.value.nextChar['k'] })
const kanaWord = computed(() => {
	const WORD = typeArea.value.kanaWord.join("");

	if (WORD) {
		return WORD
	} else {
		return ''
	}
})
const romaInputed = computed(() => { return typeArea.value.romaInputed.substr(-16, 16).replace(/ /g, 'ˍ') })
const romaNextChar = computed(() => { return typeArea.value.nextChar['r'][0] })
const romaWord = computed(() => {
	const WORD = typeArea.value.romaWord.join("");

	if (WORD) {
		return WORD
	} else {
		return ''
	}
})

//Lyrics
const lyrics = computed(() => { return typeArea.value.lyrics })
const nextLyrics = computed(() => { return typeArea.value.nextLyrics })
const nextTypeSpeed = computed(() => {
	const SPEED = typeArea.value.nextTypeSpeed

	if (SPEED > 0) {
		return `NEXT: ${typeArea.value.nextTypeSpeed.toFixed()}kpm`
	} else {
		return ''
	}
})

</script>

<template>

	<div id="word_area" class="my-1 mx-2">
		<div id="type_area" class="text-pre font">
			<div id="main" class="text-shadow text-truncate text-lowercase	">
				<span class='correct-input'>{{ kanaInputed }}</span><span class='next-char'>{{ kanaNextChar }}</span><span class='word'>{{ kanaWord }}</span>
			</div>
			<div id="sub" class="mt-1 text-shadow text-uppercase text-truncate">
				<span class='correct-input'>{{ romaInputed }}</span><span class='next-char'>{{ romaNextChar }}</span><span class='word'>{{ romaWord }}</span>
			</div>
		</div>
		<div id="lyrics" class="h3 mt-3 text-truncate d-flex">
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

#main::before,
#sub::before {
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
	font-family: Segoe UI, "Yu Gothic", "YuGothic", sans-serif !important;
}

.correct-input {
	color: #fbb278;
}
</style>
