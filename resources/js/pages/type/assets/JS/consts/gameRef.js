import { ref } from 'vue';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'
import {map} from '@/pages/type/assets/JS/consts/refs.js';
import { TypeArea, typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { Status, status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { Result, result, LineResult, lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';

class Game {

	constructor(){
		this.playState = ref('ready') // ['ready', 'play', 'end']
		this.inputMode = ref('roma') // ['roma', 'kana', 'flick']
		this.playMode = ref('normal') // ['normal', 'practice']
	}

	skip(){
		const NEXT_LINE = map.value.data[line.count]
		youtube.value.seekTo( (NEXT_LINE.time - 1) + (1 - speed.value) )
		typeArea.value.skip = ''
	}

	initialize(){
		typeArea.value = new TypeArea()
		status.value = new Status()
		result.value = new Result(map.value.lineLength)
		lineResult.value = new LineResult()
		map.value.setTotalTime(map.value.movieTotalTime)
	}
}

export const game = new Game()