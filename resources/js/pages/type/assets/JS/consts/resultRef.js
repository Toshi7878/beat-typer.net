import { ref } from 'vue';

export class Result {

    constructor(lineLength){
        this.romaTypeCount = 0
        this.kanaTypeCount = 0
        this.flickTypeCount = 0
        this.maxCombo = 0
        this.failerCount = 0
        this.completeCount = 0
        this.line = {
            'status':Array(lineLength-1).fill({'typeCount':0, 'missCount':0, 'speed':0, 'completed':false, 'clearTime':0}),
            'typingResult':Array(lineLength-1).fill([])
        } 
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
    }
}

export const lineResult = ref('')
