import {map, youtube} from '@/pages/type/assets/JS/consts/refs.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { result } from '@/pages/type/assets/JS/consts/resultRef.js';
import _ from 'lodash';

class Render {

	constructor(){
		this.currentTimeBarFrequency = 0 //曲のトータル時間のprogressバーを更新する頻度。1700ぐらいが妥当。
		this.skipedCount = 0
	}

	// if(effect.isCountDown){
	// 	effect.countDown()
	// }

	render(){
		const LINE = map.value.data[line.count-1]
		typeArea.lineTimeBar.value = this.correntTime - LINE.time
		typeArea.currentTimeBar.value = this.correntTime

		if(Math.abs(this.constantTime - typeArea.currentTimeBar.value) >= this.currentTimeBarFrequency){//ライン経過時間 ＆ 打鍵速度計算
			typeArea.currentTimeBar.value = this.currentTime;
		}

		if(Math.abs(this.constantTime - typeArea.lineRemainTime.value) >= 0.1){//ライン経過時間 ＆ 打鍵速度計算
			const NEXT_LINE = map.value.data[line.count]
			typeArea.lineRemainTime.value = (NEXT_LINE.time - this.correntTime)//movieSpeedController.speed; //ライン残り時間
			// this.updateLineTime('updateTypeSpeed')

			//const SKIP = this.skipedCount != line.count && !keyDown.nextChar[0] && lyrics_array[line.count][0] - this.headTime > 1 || retry.resetFlag
			const SKIP = this.skipedCount != line.count

			if(SKIP){
				this.skipGuide()
			}

			if(Math.abs(this.constantTime - typeArea.currentTime.value) >= 1){//曲の経過時間を[分:秒]で表示}
				this.currentTime()
			}

		}

	}

	currentTime(){
		typeArea.currentTime.value = this.constantTime
	}

	skipGuide(){

		const SKIP_IN = 0.4 //ラインが切り替わり後、指定のtimeが経過したら表示
		const SKIP_OUT = 4 //ラインの残り時間が指定のtimeを切ったら非表示

		// if(optionDb.duringPlayOptions['skip-guide-key'] === 'skip-guide-enter-key'){
		// 	this.skipCode = "Enter";
		// }else{
			const SKIP_KEY = "Space";
		// }

		//スキップ表示絶対条件
		//const skipEnable = (typeArea.lineTimeBar.value >= SKIP_IN || typingCounter.completed) && typeArea.lineRemainTime.value >= SKIP_OUT || retry.resetFlag
		const IS_SKIP_DISPLAY = typeArea.lineTimeBar.value >= SKIP_IN && typeArea.lineRemainTime.value >= SKIP_OUT

		// if(retry.resetFlag && (lyrics_array[parseLyric.startLine-1][0]-1<=tick.headTime)){
		// 	retry.resetFlag = false;
		// }

		//スキップ表示絶対条件 && 既に表示されているか
		if(IS_SKIP_DISPLAY){

			if(!typeArea.skip.value){
				typeArea.skip.value = `Type ${SKIP_KEY} key to Skip. ⏩`;
			}

		}else if(typeArea.skip.value){
			typeArea.skip.value = ''
		}

	}
}



class Timer extends Render {

	constructor(){
		super()
		this.correntTime = 0
		this.constantTime = 0
	}

	update(){
		this.correntTime = youtube.value.getCurrentTime()
		this.constantTime = youtube.value.getCurrentTime()//speed対応したら/speedする

		const NEXT_LINE = map.value.data[line.count]
		const IS_LINE_UPDATE = (NEXT_LINE && this.correntTime > +NEXT_LINE.time)

		if(IS_LINE_UPDATE){
			line.update(NEXT_LINE)
		}

		this.render()
	}

}
export const timer = new Timer()

class Next {
	setWord(){
		this.typePattern = _.cloneDeep(map.value.typePattern[this.count]);
		typeArea.mainWord.value = _.cloneDeep(map.value.lineWords[this.count]['k']);
		typeArea.subWord.value = _.cloneDeep(map.value.lineWords[this.count]['r']);

		typeArea.subInput.value = ''
		typeArea.mainInput.value = ''

		typeArea.subNextChar.value = ''
		typeArea.mainNextChar.value = ''
	}

	setLyrics(next){
		typeArea.lyrics.value = next.lyrics
	}

	setNextToNextLyrics(next){
		const NEXT_TO_NEXT = map.value.data[line.count]
		typeArea.lineTimeBarMax.value = NEXT_TO_NEXT.time - next.time
		typeArea.nextLyrics.value = NEXT_TO_NEXT.lyrics
		typeArea.nextTypeSpeed.value = map.value.romaLineSpeedList[this.count]*60
	}
}


class Line extends Next {

	constructor(){
		super()
		this.count = 0
		this.typePattern = []
	}

	update(next){
		this.setWord()

		this.setLyrics(next)

		this.count++

		this.setNextToNextLyrics(next)
	}

	getLineCount(time){

        for(let i=0;i<lineData.value.length;i++){

            if(lineData.value[i]['time'] - time >= 0){
                this.count = i
                break;
            }

        }

        if(this.count<0){this.count = 0}
    }
}

export const line = new Line()


