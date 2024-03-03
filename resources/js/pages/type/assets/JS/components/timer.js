import {map} from '@/pages/type/assets/JS/consts/refs.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { result, lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'
import { typing } from '@/pages/type/assets/JS/components/KeyDown/typing.js';

import _ from 'lodash';

class Render {

	constructor(){
		this.currentTimeBarFrequency = 0 //曲のトータル時間のprogressバーを更新する頻度。1700ぐらいが妥当。
	}

	render(){
		const LINE = map.value.data[line.count-1]
		typeArea.value.lineTimeBar = this.currentTime - LINE.time

		if(Math.abs(this.constantTime - typeArea.value.currentTimeBar) >= this.currentTimeBarFrequency){//ライン経過時間 ＆ 打鍵速度計算
			typeArea.value.currentTimeBar = this.currentTime;
		}

		if(Math.abs(this.constantTime - typeArea.value.lineRemainTime) >= 0.1){//ライン経過時間 ＆ 打鍵速度計算
			const NEXT_LINE = map.value.data[line.count]
			typeArea.value.lineRemainTime = (NEXT_LINE.time - this.currentTime)/speed.value; //ライン残り時間
			this.skipGuide()

			if(Math.abs(this.constantTime - typeArea.value.currentTime) >= 1){//曲の経過時間を[分:秒]で表示}
				typeArea.value.currentTime = this.constantTime
			}

		}

	}

	skipGuide(){

		const SKIP_IN = 0.4 //ラインが切り替わり後、指定のtimeが経過したら表示
		const SKIP_OUT = 4 //ラインの残り時間が指定のtimeを切ったら非表示
		const KANA = typeArea.value.nextChar['k']
		const SKIP_KEY = "Space";

		const IS_SKIP_DISPLAY = !KANA && typeArea.value.lineTimeBar >= SKIP_IN && typeArea.value.lineRemainTime >= SKIP_OUT


		//スキップ表示絶対条件 && 既に表示されているか
		if(IS_SKIP_DISPLAY){

			if(!typeArea.value.skip){
				typeArea.value.skip = SKIP_KEY;
			}

		}else if(typeArea.value.skip){
			typeArea.value.skip = ''
		}

	}
}



class Timer extends Render {

	constructor(){
		super()
		this.currentTime = 0
		this.constantTime = 0
	}

	update(){
		this.currentTime = youtube.value.getCurrentTime()
		this.constantTime = this.currentTime / speed.value

		const NEXT_LINE = map.value.data[line.count]
		const IS_LINE_UPDATE = (NEXT_LINE && this.currentTime > +NEXT_LINE.time)

		if(IS_LINE_UPDATE){
			line.result()
			line.update(NEXT_LINE)
		}

		this.render()
	}

}
export const timer = new Timer()

class Next {
	setWord(){
		this.typePattern = _.cloneDeep(map.value.typePattern[this.count]);
		typeArea.value.kanaWord = _.cloneDeep(map.value.lineWords[this.count]['k']);
		typeArea.value.romaWord = _.cloneDeep(map.value.lineWords[this.count]['r']);

		typeArea.value.romaInputed = ''
		typeArea.value.kanaInputed = ''

		typeArea.value.nextChar = typing.value.add()
	}

	setLyrics(next){
		typeArea.value.lyrics = next.lyrics
	}

	setNextToNextLyrics(next){
		const NEXT_TO_NEXT = map.value.data[line.count]
		typeArea.value.lineTimeBarMax = NEXT_TO_NEXT.time - next.time
		typeArea.value.nextLyrics = NEXT_TO_NEXT.lyrics
		typeArea.value.nextTypeSpeed = (map.value.romaLineSpeedList[this.count]*60)*speed.value
	}
}


class Line extends Next {

	constructor(){
		super()
		this.count = 0
		this.typePattern = []
	}

	result(){
		status.value.score += status.value.point.type;
		status.value.point = {'type':0,'timeBonus':0}}

	update(next){
		this.setWord()

		this.setLyrics(next)

		this.count++

		this.setNextToNextLyrics(next)

	}

	getLineCount(time){
		const MAP = map.value.data

        for(let i=0;i<MAP.length;i++){

            if(MAP[i]['time'] - time >= 0){
                this.count = i
                break;
            }

        }

        if(this.count<0){this.count = 0}
    }
}

export const line = new Line()


