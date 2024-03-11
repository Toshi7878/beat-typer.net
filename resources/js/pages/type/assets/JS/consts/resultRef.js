import { ref } from 'vue';
import { timer } from '@/pages/type/assets/JS/components/timer.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';

export class Result {

    constructor(lineLength){
        this.romaTypeCount = 0
        this.kanaTypeCount = 0
        this.flickTypeCount = 0
        this.maxCombo = 0
        this.failureCount = 0
        this.completeCount = 0
        this.totalTypeTime = 0
        this.line = {
            'status':Array(lineLength-1).fill({'point':{'type':0,'timeBonus':0},'typeCount':0, 'missCount':0, 'speed':0, 'completed':false, 'clearTime':0}),
            'typingResult':Array(lineLength-1).fill([])
        } 
    }

    storeLineResult(){
        status.value.score += status.value.point.type + status.value.point.timeBonus;
        this.totalTypeTime += timer.lineTime
    }

}

export const result = ref('')

export class LineResult {

    constructor(){
        this.typeCount = 0
        this.missCount = 0
        this.typeSpeed = 0
        this.lostCount = 0
        this.completed = false
        this.clearTime = 0
        this.typingResult = []
        this.point = {'type':0,'timeBonus':0}
        typeArea.value.lineTypeSpeed = 0
        status.value.point = {'type':0,'timeBonus':0}
    }
}

export const lineResult = ref('')
