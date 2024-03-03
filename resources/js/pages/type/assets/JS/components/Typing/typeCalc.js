import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import {result, lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import {map} from '@/pages/type/assets/JS/consts/refs.js';

export class Type {

	static add(){
		status.value.typeCount ++
		typeArea.value.combo ++
		lineResult.value.typeCount ++

		if(game.inputMode == 'kana'){
			result.kanaTypeCount++
		}else if(game.inputMode == 'flick'){
			result.flickTypeCount++
		}else{
			result.romaTypeCount++
		}

		if(result.maxCombo < typeArea.value.combo){
			result.maxCombo = typeArea.value.combo;
		}

		tick.updateTypingSpeed()
	}

	static completed(){	
			const NEXT_LINE = map.value.data[line.count]
			status.point.timeBonus = Math.round(( (NEXT_LINE.time - timer.currentTime) / speed.value )* 100)
	
			for(let i=0;i<gameStart.duringPlayAccessElements['correct-input'].length;i++){
				gameStart.duringPlayAccessElements['correct-input'][i].style.color = optionDb.duringPlayOptions['line-clear-color']
			}
	
		}
	}

export class Miss {

	static add(){
		status.value.missCount ++;
		lineResult.missCount ++;
		typeArea.value.combo = 0;
		status.point.type -= 5
	}
}