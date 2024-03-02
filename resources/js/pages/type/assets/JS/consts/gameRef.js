import { ref } from 'vue';

class Game {

	constructor(){
		this.playState = ref('ready') // ['ready', 'play', 'end']
		this.inputMode = ref('roma') // ['roma', 'kana', 'flick']
		this.playMode = ref('normal') // ['normal', 'practice']
	}
}

export const game = new Game()