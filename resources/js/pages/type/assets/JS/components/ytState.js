import { Ticker } from "@createjs/easeljs";;
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { volume, lineData, youtube } from '@/pages/type/assets/JS/consts/refs.js';
import { LineBlur } from '@/pages/type/assets/JS/components/selectBlur.js';

class YTState{

	static LIST = {
		0:'end',
		1:'play',
		2:'pause',
		5:'end'
	}

	constructor(){
		this.state = 'ready'
	}

	change(event) {

		switch (event.data) {
	
			case 1: //再生(player.playVideo)
				console.log("再生 1")
				PlayerEvent.play(event)
				break;
	
			case 0: //プレイ終了(最後まで再生した)
			case 5://動画停止(途中でStopVideo)
	
				if (event.data == 0) {
					console.log("プレイ終了 0")
				} else {
					console.log("動画停止 5")
				}
	
				PlayerEvent.end(event)
				break;
	
			case 2: //一時停止(player.pauseVideo)
				console.log("一時停止 2")
				PlayerEvent.pause(event)
				break;
	
			case 3: //再生時間移動 スキップ(player.seekTo)
				console.log("シーク 3")
				PlayerEvent.seek(event)
				break;
	
			case -1: //	未スタート、他の動画に切り替えた時など
				console.log("未スタート -1")
				break;
		}
	
		if(document.activeElement.tagName == 'IFRAME'){
			document.activeElement.blur()
		}
	}

	async ready() {
		const DURATION = youtube.value.getDuration()
		// document.getElementById("time-bar").max = DURATION
		// document.getElementById("time-bar").value = 0
		youtube.value.setVolume(volume.value)
	}
}

export const ytState = new YTState()

class PlayerEvent {

	static play(event) {
		Ticker.on("tick", timer.update.bind(timer))
		Ticker.timingMode = Ticker.RAF;
		ytState.state = YTState.LIST[event.data]
	}

	static end(event) {
		ytState.state = YTState.LIST[event.data]
		Ticker.removeAllEventListeners()
	}

	static pause(event) {
		ytState.state = YTState.LIST[event.data]
		Ticker.removeAllEventListeners()
	}

	static seek(event) {
		line.getLineCount(event.target.getCurrentTime())
		line.blurBackgroundColor()
	}
}
