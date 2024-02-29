<script setup>
import { LYRIC, URL, TITLE } from '@/pages/edit/assets/JS/consts/refs.js';

class Event {

	static addRubyTag(event) {

		if (event.code == 'Enter') {

			const START = event.target.selectionStart;
			const END = event.target.selectionEnd;

			if (END - START == 0) { return; }
			const FIX_TEXT = LYRIC.value.slice(0, START) + '<ruby>' + LYRIC.value.slice(START, END) + '<rt></rt></ruby>' + LYRIC.value.slice(END);

			event.target.value = FIX_TEXT;
			LYRIC.value = FIX_TEXT
			event.target.focus();
			event.target.setSelectionRange(event.target.value.search("<rt></rt></ruby>") + 4, event.target.value.search("<rt></rt></ruby>") + 4);
		}

	}
}
</script>

<template>
	<div>
		<input class="col-12" placeholder="YouTube URL" v-model="URL">
	</div>
	<div>
		<input class="col-12" placeholder="タイトル" v-model="TITLE">
	</div>
</template>

<style></style>
