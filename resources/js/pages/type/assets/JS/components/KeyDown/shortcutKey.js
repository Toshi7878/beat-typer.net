import { map } from '@/pages/type/assets/JS/consts/refs.js';
import { youtube, speed } from '@/templates/assets/JS/youtubeRef.js'

import { ytState } from '@/pages/type/assets/JS/components/ytState.js';

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


