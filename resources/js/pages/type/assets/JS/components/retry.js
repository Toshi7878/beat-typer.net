import { TypeArea, typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { Status, status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import {map} from '@/pages/type/assets/JS/consts/refs.js';


let retry
export class Retry {

	constructor(){
		this.retryCount = 1
		this.resetFlag = false
	}

	static reset(event){
		this.resetFlag = true

		typeArea.value = new TypeArea()
		status.value = new Status()
		map.value.setTotalTime(map.value.movieTotalTime)
		youtube.value.seekTo(0);

		event.preventDefault()
	}

}
