import { ref } from 'vue';

export class Status {

	constructor(lineCount = 0, rank = 0){
		this.score = ref(0)
		this.point = ref(0)
		this.missCount = ref(0)
		this.lostCount = ref(0)
		this.typeCount = ref(0)
		this.typeSpeed = ref(0)
		this.rank = ref(rank)
		this.lineCount = ref(lineCount)
	}

}

export let status = ref(new Status());