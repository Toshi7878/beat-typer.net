import {TIME, lineData, TIME_BAR_VAL} from '@/pages/edit/assets/JS/consts/refs.js';
import { youtube, playSpeed } from '@/templates/assets/JS/youtubeRef.js'
import { Ticker } from 'pixi.js';
export const ticker = new Ticker()

class Timer {

	constructor(){
		this.correntTime = 0
		ticker.add(this.update.bind(this))
	}

	update(){
		this.correntTime = youtube.value.getCurrentTime()
		const IS_LINE_UPDATE = (lineData.value[line.count] && this.correntTime > +lineData.value[line.count].time)
		this.render()

		if(IS_LINE_UPDATE){
			line.update()
		}

	}

	render(){
		TIME.value = this.correntTime.toFixed(3);

		if(document.activeElement.type != 'range'){
			TIME_BAR_VAL.value = this.correntTime
		}
	}

}
export const timer = new Timer()

class Line {

	constructor(){
		this.count = 0
	}

	update(){
		this.updateBackgroundColor(this.count)
		this.count++

	}

	blurBackgroundColor(){
		const ROW_COLORING = document.getElementsByClassName('bg-success');

		for (let i = 0; i < ROW_COLORING.length; i++) {
			ROW_COLORING[i].classList.remove('bg-success');
		}

	}

	updateBackgroundColor(count) {
		if(0 > count){return;}
		this.blurBackgroundColor()
		const TARGET_ROW = document.getElementsByClassName('line')[count]
		TARGET_ROW.classList.add('bg-success');
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