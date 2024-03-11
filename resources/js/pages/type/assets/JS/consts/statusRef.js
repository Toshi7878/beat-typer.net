import { ref } from 'vue';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { timer } from '@/pages/type/assets/JS/components/timer.js';
import { result, lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';
import {map} from '@/pages/type/assets/JS/consts/refs.js';

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

		//Statusエリアの各項目を更新  StatusCountsUpdate(["Rank","Line","Lost"])
		updateStatus(Items){
			if(!Array.isArray(Items)){return;}
	
			for(let i=0;Items.length>i;i++){
	
				switch (Items[i]) {
	
	
					case "Rank":

						break;
	
					case "Line":
						const completeCount = result.value.completeCount
						const failureCount = result.value.failureCount
						this.lineCount = map.value.lineLength - (completeCount + failureCount)
						break;
					case "Lost":
	
						break;
				}
	
			}
	
		}
}

export const status = ref(new Status());