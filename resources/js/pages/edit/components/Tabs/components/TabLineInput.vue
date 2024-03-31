<script setup>
import { ref, watch } from 'vue'
import { lineData, NUMBER, TIME, LYRIC, WORD, timeDiff, lyricsBox, convertMode, undoSet, redoSet } from '@/pages/edit/assets/JS/consts/refs.js';
import { topScrollLyricsBox, sliceLyricsBox, setLyrics } from '@/pages/edit/assets/JS/components/lyricsBox.js';
import { LineBlur } from '@/pages/edit/assets/JS/components/selectBlur.js';
import { tableScroll } from '@/pages/edit/assets/JS/components/scroll.js';
import { wordConvert } from '@/pages/edit/assets/JS/components/wordConvert.js';
import { db } from '@/pages/edit/assets/JS/DB/db.js';

// TIMEボックスに数値が入っていたらTrue
const IS_IN_TIME = ref();

watch(TIME, (newValue) => {
	// 数値が入っていたらTrue
	IS_IN_TIME.value = !isNaN(newValue) && newValue !== '' ? true : false;
});

const IS_IN_LYRIC = ref();

watch(LYRIC, (newValue) => {
	// 数値が入っていたらTrue
	IS_IN_LYRIC.value = newValue !== '' ? true : false;
});

const IS_SELECTED = ref(); // NUMBERボックスに数値が入っていたらTrue
const IS_END_LINE = ref(); // NUMBERボックスに数値が入っていたらTrue
const IS_FIRST_LINE = ref();

watch(NUMBER, (newValue) => {
	// 数値が入っていたらTrue
	IS_FIRST_LINE.value = NUMBER.value - 1 == 0
	IS_END_LINE.value = NUMBER.value == lineData.value.length
	IS_SELECTED.value = !isNaN(newValue) && newValue !== '' ? true : false;
});

class Event {

	static add() {
		//追加
		const LINES = lineData.value
		let lineNum = 0

		for (let i = 0; i < LINES.length; i++) {
			let diff = +TIME.value + +timeDiff.value

			if (LINES[i].time > diff) {
				if (0 > diff) { diff = 0 }
				lineNum = i
				const LINE = { time: diff.toFixed(3), lyrics: LYRIC.value, word: WORD.value }
				lineData.value.splice(i, 0, LINE);
				undoSet.push({ state: 'add', number: i, value: LINE })
				break;
			}

		}

		LineBlur.selectBlur()

		if (lyricsBox.value) {
			sliceLyricsBox()
			setLyrics()
		}

		tableScroll(lineNum - 3, 'smooth')
	}


	static update() {
		lineData.value[NUMBER.value - 1] = { time: TIME.value, lyrics: LYRIC.value, word: WORD.value }
		LineBlur.selectBlur()
	}

	static delete() {
		lineData.value.splice(NUMBER.value - 1, 1);
		LineBlur.selectBlur()
	}

	static diff(event) {

		if (!event.target.value) {
			timeDiff.value = 0
		}

		const ITEM = { key: event.target.name, value: +event.target.value }
		db.options.put(ITEM)
	}

	static async convert(event) {
		WORD.value = await wordConvert.convert(LYRIC.value, convertMode.value)
	}

	static paste() {
		setTimeout(topScrollLyricsBox)
	}

	static input(event) {

		if (event.target.value) {
			setLyrics()
		}

	}

	static addRubyTag(event) {

		if (event.code == 'Enter') {
			const start = event.target.selectionStart;
			const end = event.target.selectionEnd;

			if (end - start < 1) {
				return false;
			}

			const text = LYRIC.value;
			LYRIC.value = `${text.slice(0, start)}<ruby>${text.slice(start, end)}<rt></rt></ruby>${text.slice(end, text.length)}`;

			setTimeout(() => {
				event.target.focus()
				event.target.setSelectionRange(LYRIC.value.search("<rt></rt></ruby>") + 4, LYRIC.value.search("<rt></rt></ruby>") + 4);
			})
		}

	}

}


</script>

<template>
	<div>
		<input class="col-1" id="time_box" placeholder="time" v-model="TIME">
		<input class="col-11" id="lyric_box" placeholder="歌詞" @keydown="Event.addRubyTag" v-model="LYRIC">
	</div>
	<div>
		<input class="col-1" value="0" placeholder="No" disabled="" v-model="NUMBER">
		<input class="col-11" id="word_box" placeholder="よみ" v-model="WORD">
	</div>

	<div class="row column-gap-4">
		<input type="button" value="追加" id="add_button" class="btn btn-outline-success col-2" v-if="IS_IN_TIME" @click="Event.add">
		<input type="button" value="追加" id="add_button" class="btn btn-outline-secondary col-2" disabled v-else>
		<input type="button" value="変更" id="update_button" class="btn btn-outline-info col-2" v-if="IS_SELECTED && !IS_FIRST_LINE && !IS_END_LINE" @click="Event.update">
		<input type="button" value="変更" id="update_button" class="btn btn-outline-secondary col-2" disabled v-else>
		<input type="button" value="よみ変換" id="convert_button" class="btn btn-outline-primary col-2" @click="Event.convert" v-if="IS_IN_LYRIC">
		<input type="button" value="よみ変換" id="convert_button" class="btn btn-outline-secondary col-2" disabled v-else>


		<div class="col d-flex align-items-center">
			<label>
				追加タイミング補正<input type="number" id="add-timing-box" name="time-diff" class="ms-2" max="0.5" min="-0.5" @input="Event.diff" v-model="timeDiff" title="歌詞追加時に数値分のタイムを補正します。">
			</label>
		</div>

		<input type="button" value="削除" id="delete_button" class="btn btn-outline-danger col-1" v-if="IS_SELECTED && !IS_FIRST_LINE && !IS_END_LINE" @click="Event.delete">
		<input type="button" value="削除" id="delete_button" class="btn btn-outline-secondary col-1" disabled v-else>
	</div>

	<div class="row">
		<textarea id="add_lyrics_box" placeholder="ここから歌詞をまとめて追加できます。" @paste="Event.paste" @input="Event.input" v-model="lyricsBox"></textarea>
	</div>
</template>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

#add-timing-box {
	width: 40px;
}
</style>
