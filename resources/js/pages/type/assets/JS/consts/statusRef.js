import { ref } from 'vue';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { timer } from '@/pages/type/assets/JS/components/timer.js';

export class Status {

	constructor(lineCount = 0, rank = 0){
		this.score = ref(0)
		this.point = ref({'type':0,'timeBonus':0})
		this.missCount = ref(0)
		this.lostCount = ref(0)
		this.typeCount = ref(0)
		this.typeSpeed = ref(0)
		this.rank = ref(rank)
		this.lineCount = ref(lineCount)
	}

}

export const status = ref(new Status());