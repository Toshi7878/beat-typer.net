import { ref } from 'vue';

export class Status {

	constructor(){
		this.score = ref(0)
		this.point = ref(0)
		this.missCount = ref(0)
		this.lostCount = ref(0)
		this.typeCount = ref(0)
		this.typeSpeed = ref(0)
		this.rank = ref(0)
		this.lineCount = ref(0)
	}

}

export const status = new Status()