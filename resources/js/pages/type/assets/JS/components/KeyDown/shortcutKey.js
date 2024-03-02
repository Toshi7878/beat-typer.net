import { map } from '@/pages/type/assets/JS/consts/refs.js';
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'

import { ytState } from '@/pages/type/assets/JS/components/ytState.js';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';

class ShortcutHandler {

	static Start(event) {

		const iS_FOCUS_TEXTAREA = document.activeElement.type == "text" || document.activeElement.type == "textarea"

			if(!iS_FOCUS_TEXTAREA){

				//F7で練習モード
				if(event.key == "F7"){
					game.playMode = "practice"
					youtube.value.playVideo()
					window.removeEventListener('keydown', ShortcutHandler.Start);
					event.preventDefault();
				}

				//Enterキーでプレイ開始
				if(event.key == "Enter" || event.key == "F4"){
					youtube.value.playVideo()
					window.removeEventListener('keydown', ShortcutHandler.Start);
					event.preventDefault();

				}

		}

		}

	static unPauseShortcut(){

		if(event.key == "Escape" && !player_demo){//Escでポーズ解除
			player.playVideo()
			event.preventDefault();
		}

	}

	static disableSpaceKey(){

		if(event.code == "Space") {
			event.preventDefault();
		}

	}

	static keyEventDisabler(){
		window.removeEventListener("keydown",Flick.keyDeviceDisabled)
		tick.removeEvent()
		keyDown.removeEvent()

		timeSkip.removeSkipEvent()

		if(typing_play_mode == 'flick'){
			keyDown.flickInputMaxValue = ""
			gameStart.duringPlayAccessElements['flick-input'].blur()
			gameStart.duringPlayAccessElements['flick-input-second'].blur()
		}

	}

	static enterKeyForScoreSubmission(){

		if((document.activeElement.tagName != "INPUT" || document.activeElement.type == "radio") && event.key == "Enter"){

			if(finished && play_mode=="normal" && document.querySelector('[onclick="submit_score()"]') != null){//曲終了、Enterキーで記録送信
				submit_score()
			}

		}
	}

	static finishedRetryMovie(event){
		const RETRY_TRIGGER = (event.type == "click" && (/btn_replay/.test(event.target.src) || event.target.id == 'movie_cover') || event.key=="F4")

		if(RETRY_TRIGGER && (document.activeElement.type != "text" && play_mode == "normal" || play_mode == "practice")){

			if(play_mode == 'normal'){
				retry.reset()
			}else{
				retry.practiceModeReset()
				practiceMode.seekLine(0)
			}

			window.removeEventListener('keydown',retry.finishedEvent);
			event.preventDefault();

		}else if(play_mode == "normal" && event.key == "F7" && document.activeElement.tagName != "INPUT"){
			practiceMode.movePracticeMode()
			event.preventDefault();
		}else if(event.key == "F3" || event.key == "F7"){
			event.returnValue = false;
			event.preventDefault();
		}

	}
}

class KeyHandler {


}

class ShortcutKey extends KeyHandler {

	constructor(){
		super()
		window.addEventListener('keydown', this.main.bind(this))
	}

	main(event){

		const iS_FOCUS_TEXTAREA = document.activeElement.type == "text" || document.activeElement.type == "textarea"

		if(!iS_FOCUS_TEXTAREA){
	
			switch(event.code){
				case "ArrowUp" :

					if(NUMBER.value > 1){
						this.lineSeek(-2)
					}
					event.preventDefault();
					break;
				case "ArrowDown" :

					if(NUMBER.value < lineData.value.length){
						this.lineSeek(0)
					}
					event.preventDefault();
					break;
				case "ArrowLeft" :
					youtube.value.seekTo(+TIME.value - (3 * speed.value))
					event.preventDefault();
					break
				case "ArrowRight" :
					youtube.value.seekTo(+TIME.value + (3 * speed.value))
					event.preventDefault();
					break;
				case "KeyS" :

					if(event.ctrlKey) {
						let res = confirm("現在の譜面の状態を保存しますか？");

						if( res == true ) {
							changeTab('保存')
						}

						event.preventDefault();
						return;
					}else{
						document.getElementById("add_button").click();
						event.preventDefault();
					}

					break;
				
				case "KeyU" :
					document.getElementById("update_button").click();
					event.preventDefault();
					break;

				case "KeyZ" :

					if(event.ctrlKey) {
						this.undo()
						event.preventDefault();
					}

					break;
				case "KeyY" :

					if(event.ctrlKey) {
						//this.redo()
						event.preventDefault();
					}

					break;
				case "KeyD" :

					LineBlur.selectBlur()
					event.preventDefault();

					break;
				case "Delete" :
					document.getElementById("delete_button").click()
					event.preventDefault();
					break;
				case "KeyQ" :
					setLyrics()
					event.preventDefault();
					break;
				case "KeyF":
					
				if(event.ctrlKey && event.shiftKey) {
					this.wordSearchReplace()
					event.preventDefault();
				}
					break;
				case "Escape" :

					if(ytState.state != 'play'){
						youtube.value.playVideo()
					}else{
						youtube.value.pauseVideo()
					}

					event.preventDefault();
					break;
				case "F9" :
					document.getElementById("speed_down").click()
					event.preventDefault();
					break;
				case "F10" :
					document.getElementById("speed_up").click()
					event.preventDefault();
					break;
				}

		}
	}
}

new ShortcutKey()


