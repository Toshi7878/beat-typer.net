import { lineData } from '@/pages/type/assets/JS/consts/refs.js';


export class LineBlur {

	static selectBlur(){
		NUMBER.value = ''
		TIME.value = ''
		LYRIC.value = ''
		WORD.value = ''
		lineData.value = lineData.value.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
		LineBlur.colorBlur()
	}

	static colorBlur(){
		const SELECTED_ROW = document.getElementsByClassName('bg-info');

		for (let i = 0; i < SELECTED_ROW.length; i++) {
			SELECTED_ROW[i].classList.remove('bg-info');
		}
	}
}
