import {LYRIC, WORD, lyricsBox, convertMode} from '@/pages/edit/assets/JS/consts/refs.js';
import { wordConvert } from '@/pages/edit/assets/JS/components/wordConvert.js';


export function topScrollLyricsBox(event) {
	const TARGET = document.getElementById("add_lyrics_box")
	document.activeElement.blur();
	TARGET.value = TARGET.value.replace(/　/g, " ")
	TARGET.scrollTop = 0;
	TARGET.scrollLeft = 0;
}

export function sliceLyricsBox(){
	let caret = 0
	caret += (document.activeElement.selectionStart - lyricsBox.value.split(/\n/)[0].length) - 1

	if (caret < 0 || isNaN(caret)) { caret = 0 }

	lyricsBox.value = lyricsBox.value.split(/\n/).slice(1).join("\n")
}

export async function setLyrics(){
	LYRIC.value = lyricsBox.value.split(/\n/).slice(0, 1)[0].replace(/　/g, " ")
	WORD.value = await wordConvert.convert(LYRIC.value, convertMode.value)

}