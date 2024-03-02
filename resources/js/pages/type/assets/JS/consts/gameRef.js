import { ref } from 'vue';

class Game {

	constructor(){
		this.playState = ref('ready') // ['ready', 'play', 'end']
		this.playMode = ref('roma') // ['roma', 'kana', 'flick']
	}
}

export const game = new Game()