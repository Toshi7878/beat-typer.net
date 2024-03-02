import {map, youtube} from '@/pages/type/assets/JS/consts/refs.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';


class Timer {

	constructor(){
		this.correntTime = 0
	}

	update(){
		this.correntTime = youtube.value.getCurrentTime()
		const NEXT_LINE = map.value.data[line.count]
		const IS_LINE_UPDATE = (NEXT_LINE && this.correntTime > +NEXT_LINE.time)


		if(IS_LINE_UPDATE){
			line.update(NEXT_LINE)
		}

		this.render()

	}

	render(next){
		const LINE = map.value.data[line.count-1]
		typeArea.lineTimeBar.value = this.correntTime - LINE.time
		typeArea.currentTimeBar.value = this.correntTime

	}

}
export const timer = new Timer()

class Next {
	setWord(){
		typeArea.mainInput.value = ''
		typeArea.mainNextChar.value = ''
		typeArea.mainWord.value = map.value.lineWords[this.count]['k'].join('')
		typeArea.subInput.value = 
		typeArea.subNextChar.value = ''
		typeArea.subWord.value = map.value.lineWords[this.count]['r'].join('')

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


