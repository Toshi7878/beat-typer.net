import { ref } from 'vue';

export class Result {

    constructor(lineLength){
        this.failerCount = 0
        this.completeCount = 0
        this.lineResult = { // ライン毎のタイピング記録
			//必要な情報は後で追加
            'lineTypingResult':Array(lineLength-1).fill([]),
            'lineTypingResult':Array(lineLength-1).fill({'point':0, 'typeCount':0, 'missCount':0, 'combo':0, 'speed':0, 'completed':false, 'clearTime':0})
        }
    }
}

export const result = ref('')