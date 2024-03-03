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

		//Statusエリアの各項目を更新  StatusCountsUpdate(["Score","Rank","Type","Miss","Point","Line","Lost"])
		updateStatus(Items){
			if(!Array.isArray(Items)){return;}
	
			for(let i=0;Items.length>i;i++){
	
				switch (Items[i]) {
	
					case "Score":	
						this.score += this.point;
						this.point = 0
						break;
	
					case "Rank":

						break;
	
					case "Type":
						this.typeCount ++
						break;
	
					case "Miss":
						this.missCount ++
						break;
	
					case "Line":
						this.lineCount
						break;
					case "Lost":
	
						break;
				}
	
			}
	
		}
}

export const status = ref(new Status());