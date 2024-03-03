import { TypeArea, typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { Status, status } from '@/pages/type/assets/JS/consts/statusRef.js';


let retry
export class Retry {

	constructor(){
		this.retryCount = 1
		this.resetFlag = false
	}

	static reset(){
		this.resetFlag = true

		typeArea = new TypeArea()
		status = new Status()
		player.seekTo(0);
		event.preventDefault()
	}

}
