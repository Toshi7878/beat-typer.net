import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import {map} from '@/pages/type/assets/JS/consts/refs.js';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { ref } from 'vue';


class Retry {

	constructor(){
		this.retryCount = 1
		this.resetFlag = false
	}

	reset(event){
		game.initialize()
		youtube.value.seekTo(0);

		event.preventDefault()
	}

}


export const retry = ref(new Retry())