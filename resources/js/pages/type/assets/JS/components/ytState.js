import { onTick } from 'vue3-pixi';

import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { map } from '@/pages/type/assets/JS/consts/refs.js';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { youtube, volume } from '@/templates/assets/JS/youtubeRef.js'
import { changeTab } from '@/pages/type/assets/JS/consts/tabRef.js';
import { Typing, typing } from '@/pages/type/assets/JS/components/KeyDown/typing.js';
import { ShortcutHandler } from '@/pages/type/assets/JS/components/KeyDown/shortcutKey.js';


class PlayerEvent {

	play(event) {
		onTick(timer.update.bind(timer))
		
		const gameState = game.playState.value

		if(gameState == 'ready'){
			game.playState.value = 'play'
			changeTab('ステータス')
			typing.value = new Typing()
			game.initialize()
		}

		if(ytState.state == 'pause'){
			window.removeEventListener('keydown',ShortcutHandler.unPauseShortcut, true);
			window.removeEventListener('keydown',ShortcutHandler.disableSpaceKey, true);
			typing.value.addEvent()
		}


		ytState.state = YTState.LIST[event.data]

	}

	end(event) {
		ytState.state = YTState.LIST[event.data]
		ShortcutHandler.keyEventDisabler()
		game.playState.value = 'end'
	}

	pause(event) {
		ytState.state = YTState.LIST[event.data]
		window.addEventListener('keydown',ShortcutHandler.unPauseShortcut, true);
		ShortcutHandler.keyEventDisabler()
	}

	seek(event) {
		line.getLineCount(event.target.getCurrentTime())
	}

	ready() {
		youtube.value.setVolume(volume.value)
		game.playState.value = 'ready'
	}

	playbackRateChange(event){
		map.value.setTotalTime(map.value.movieTotalTime)
	}
}


class YTState extends PlayerEvent{

	static LIST = {
		0:'end',
		1:'play',
		2:'pause',
		5:'end'
	}

	constructor(){
		super()
		this.state = 'ready'
	}

	change(event) {

		switch (event.data) {
	
			case 1: //再生(player.playVideo)
				console.log("再生 1")
				ytState.play(event)
				break;
	
			case 0: //プレイ終了(最後まで再生した)
			case 5://動画停止(途中でStopVideo)
	
				if (event.data == 0) {
					console.log("プレイ終了 0")
				} else {
					console.log("動画停止 5")
				}
	
				ytState.end(event)
				break;
	
			case 2: //一時停止(player.pauseVideo)
				console.log("一時停止 2")
				ytState.pause(event)
				break;
	
			case 3: //再生時間移動 スキップ(player.seekTo)
				console.log("シーク 3")
				ytState.seek(event)
				break;
	
			case -1: //	未スタート、他の動画に切り替えた時など
				console.log("未スタート -1")
				break;
		}
	
		if(document.activeElement.tagName == 'IFRAME'){
			document.activeElement.blur()
		}
	}
}

export const ytState = new YTState()
