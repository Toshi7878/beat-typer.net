import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { result, lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import {map} from '@/pages/type/assets/JS/consts/refs.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { speed } from '@/templates/assets/JS/youtubeRef.js'

export class Type {

	static add(){
		status.value.typeCount ++
		typeArea.value.combo ++
		lineResult.value.typeCount ++

		if(game.inputMode == 'kana'){
			result.value.kanaTypeCount++
		}else if(game.inputMode == 'flick'){
			result.value.flickTypeCount++
		}else{
			result.value.romaTypeCount++
		}

		if(result.value.maxCombo < typeArea.value.combo){
			result.value.maxCombo = typeArea.value.combo;
		}

	}

	static completed(){	
			const NEXT_LINE = map.value.data[line.count]
			status.value.point.timeBonus = Math.round(( (NEXT_LINE.time - timer.currentTime) * speed.value ) * 100)
			result.value.completeCount ++
			lineResult.value.completed = true
			result.value.storeLineResult()
			// lineResult.value.clearTime = timer.currentTime / speed.value
			status.value.updateStatus(['Line'])
		}
	}

export class Miss {

	static add(){
		status.value.missCount ++;
		lineResult.value.missCount ++;
		typeArea.value.combo = 0;
		status.value.point.type -= 5
	}
}