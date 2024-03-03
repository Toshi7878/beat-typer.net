import { ref } from 'vue';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'
import {map} from '@/pages/type/assets/JS/consts/refs.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';

class Game {

	constructor(){
		this.playState = ref('ready') // ['ready', 'play', 'end']
		this.inputMode = ref('roma') // ['roma', 'kana', 'flick']
		this.playMode = ref('normal') // ['normal', 'practice']
	}

	skip(){
		const NEXT_LINE = map.value.data[line.count]


		//const SKIP_LINE_TIME = !retry.resetFlag ? parseFloat(lyrics_array[line.count][0]) : lyrics_array[parseLyric.startLine-1][0]

		youtube.value.seekTo( (NEXT_LINE.time - 1) + (1 - speed.value) )

		//retry.resetFlag = false;
		timer.skipedCount = line.count

		// if(typing_play_mode == 'flick'){
		//     document.getElementById("tap_here").style.display = "none"
		// }

		typeArea.value.skip = ''
		//gameStart.duringPlayAccessElements['skip-guide'].textContent = "";
		//tick.playheadUpdate();
	}
}

export const game = new Game()