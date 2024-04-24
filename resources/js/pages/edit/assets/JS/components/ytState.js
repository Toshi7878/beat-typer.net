import { timer, line ,ticker } from '@/pages/edit/assets/JS/components/timer.js';
import { lineData, URL, TITLE } from '@/pages/edit/assets/JS/consts/refs.js';
import { youtube, volume } from '@/templates/assets/JS/youtubeRef.js'
import { LineBlur } from '@/pages/edit/assets/JS/components/selectBlur.js';

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
		document.getElementById("time-bar").value = 0
		URL.value = `https://www.youtube.com/watch?v=${youtube.value.src}`

		if (!TITLE.value) {
			TITLE.value = youtube.value.player.g.title
		}

		if (!lineData.value.length) {
			lineData.value.splice(0, 2, { time: '0', lyrics: '', word: '' }, { time: Infinity, lyrics: 'end', word: '' })
		}

		this.updateDuration()

		LineBlur.selectBlur()
		youtube.value.setVolume(volume.value)
	}

	updateDuration(){
		const DURATION = youtube.value.getDuration()
		document.getElementById("time-bar").max = DURATION
		lineData.value[lineData.value.length-1].time = DURATION.toFixed(3)
	}

}

export const ytState = new YTState()

class PlayerEvent {

	static play(event) {

		if(ytState.state == 'ready'){
			//ready時の動画時間取得処理は整数秒のみでしか取得できないので再生時にもういちど取得
			ytState.updateDuration()
		}

		ticker.start()
		ytState.state = YTState.LIST[event.data]
		line.updateBackgroundColor(line.count - 1)


	}

	static end(event) {
		ytState.state = YTState.LIST[event.data]
		ticker.stop()
	}

	static pause(event) {
		ytState.state = YTState.LIST[event.data]
		ticker.stop()
	}

	static seek(event) {
		line.getLineCount(event.target.getCurrentTime())
		line.blurBackgroundColor()
	}
}
