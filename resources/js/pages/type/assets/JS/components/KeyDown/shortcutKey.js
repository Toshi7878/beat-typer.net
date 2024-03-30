import { youtube } from '@/templates/assets/JS/youtubeRef.js'
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { retry } from '@/pages/type/assets/JS/components/retry.js';
import { SpeedChange } from '@/pages/type/assets/JS/components/speedChange.js';
import { typing } from '@/pages/type/assets/JS/components/KeyDown/typing.js';
import { onTick } from 'vue3-pixi'

export class ShortcutHandler {

	static start(event) {

		const iS_FOCUS_TEXTAREA = document.activeElement.type == "text"

			if(!iS_FOCUS_TEXTAREA){

				//F7で練習モード
				if(event.key == "F7"){
					game.playMode.value = "practice"
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

	static unPauseShortcut(event){

		if(event.key == "Escape"){//Escでポーズ解除
			youtube.value.playVideo()
			event.preventDefault();
		}

	}

	static disableSpaceKey(event){

		if(event.code == "Space") {
			event.preventDefault();
		}

	}

	static keyEventDisabler(){
		onTick()
		typing.value.removeEvent()

	}
}

class Handler {

	static changeVolume(diff){
		volume = youtube.value.getVolume();
		volume += diff;

		if(volume < 0) {
			volume = 0;
		}else if(volume > 100) {
			volume = 100;
		}

		youtube.value.setVolume(volume);
		localStorage.setItem('volume_storage', volume);
		document.getElementById("volume").textContent = volume;
		document.getElementById("volume_control").value = volume

		effect.viewState("音量: "+volume+"%")
	}

	static changeDiffTime(diff){
		optionDb.duringPlayOptions['initial-time-diff'] += diff

		if(optionDb.duringPlayOptions['initial-time-diff'] < -4.0){
			optionDb.duringPlayOptions['initial-time-diff'] = -4.0;
		}else if(optionDb.duringPlayOptions['initial-time-diff'] > 4.0){
			optionDb.duringPlayOptions['initial-time-diff'] = 4.0;
		}

		optionDb.duringPlayOptions['initial-time-diff'] = Math.round(optionDb.duringPlayOptions['initial-time-diff'] * 100)/100
		document.getElementById("time_diff").textContent = optionDb.duringPlayOptions['initial-time-diff'].toFixed(2);
		effect.viewState(`時間調整　`+optionDb.duringPlayOptions['initial-time-diff'].toFixed(2))
	}

	static arrowLeftPracticeMode(){
		let n = practiceMode.setLineCount != line.count ? -1 : 0
		let clone

		while ( document.querySelector('[number="'+(line.count+n)+'"]') == null && (line.count+n) >= parseLyric.startLine) {n--;}

		if(line.count < parseLyric.startLine){return;}

		if(line.count > parseLyric.startLine){
			const jumpNumber = document.querySelector('[number="'+(line.count+n)+'"]')
			practiceMode.setSeekTime = jumpNumber.getAttribute('value')-1
			practiceMode.setLineCount = Number(jumpNumber.getAttribute('number'))-1
			clone = jumpNumber.cloneNode(true)
		}else{
			const FirstLine = document.querySelector("#line-list [number]")
			practiceMode.setSeekTime = FirstLine.getAttribute('value')-1
			practiceMode.setLineCount = Number(FirstLine.getAttribute('number')) - (parseLyric.startLine-1?1:0)
			clone = FirstLine.cloneNode(true)
		}

		onTick()
		effect.viewState("◁")
		practiceMode.setSeekLine(clone)
		line.updateLineView()
		Seek.getLyricsCount(practiceMode.setSeekTime, 0)
		practiceMode.seekLine(lyrics_array[line.count+1][0]-1)
	}

	static arrowRightPracticeMode(){
		let n = practiceMode.setLineCount != line.count ? 1 : 2

		if(line.count - practiceMode.setLineCount > 1){
			n--
		}

		if(practiceMode.setLineCount > 0 && (line.count+1) - practiceMode.setLineCount <= 1 && lyrics_array[practiceMode.setLineCount+1][0] - lyrics_array[practiceMode.setLineCount][0] <= 1){
			n += 2
		}

		while ( document.querySelector('[number="'+(line.count+n)+'"]') == null && lyrics_array.length-1 > (line.count+n)) {n++;}
		if(lyrics_array.length-2 < (line.count+n)){return;}
		let clone
		const jumpNumber = document.querySelector('[number="'+(line.count+n)+'"]')
		practiceMode.setSeekTime = jumpNumber.getAttribute('value')-1
		practiceMode.setLineCount = Number(jumpNumber.getAttribute('number'))-1
		clone = document.querySelector('[number="'+(practiceMode.setLineCount+1)+'"]').cloneNode(true)


		onTick()
		effect.viewState("▷")
		practiceMode.setSeekLine(clone)
		Seek.getLyricsCount(practiceMode.setSeekTime , practiceMode.setLineCount == line.count-1 ? "":-1)
		practiceMode.seekLine(lyrics_array[line.count+1][0]-1)
	}

	static changeInputMode(){

		if(inputMode.kanaMode){
			inputMode.kanaMode = false

			modHtml.kanaModeConfig.style.display = "none"

			if(keyDown.nextChar[0]){

				if(optionDb.duringPlayOptions['dakuten-handakuten-split-mode']){
					line.lineInputKana = daku_handaku_join(true,false,line.lineInputKana)
				}else if(keyDown.nextChar[0] == "゜" || keyDown.nextChar[0] == "゛"){
					keyDown.nextChar[0] = keyDown.nextChar[keyDown.nextChar.length-1]
				}

				if(!keyDown.sokuonChain){

					for (let i=0; i<romaMap.length; i++){

						if(keyDown.nextChar[0] == romaMap[i][0]){
							keyDown.nextChar = [romaMap[i][0],...romaMap[i].slice(1)]
						}

					}

				}else{
					continuous_xtu_adjust()
				}

			}
            gameStart.updateTypingWordAreaStyles()
			effect.viewState("Romaji")
		}else{

			inputMode.kanaMode = true
			modHtml.kanaModeConfig.style.display = "block"

			const next_char_convert_target = kana_mode_convert_rule_before.indexOf(keyDown.nextChar[0])

			if(next_char_convert_target >= 0){
				keyDown.nextChar[0] = kana_mode_convert_rule_after[next_char_convert_target]
			}

			if(/←|↓|↑|→|『|』/.test(line.lineInputKana.join(""))){

				for(h=0;h<line.lineInputKana.length;h++){
					const convert_target = kana_mode_convert_rule_before.indexOf(line.lineInputKana[h])

					if(convert_target >= 0){
						line.lineInputKana[h] = kana_mode_convert_rule_after[convert_target]
					}

				}

			}

			if(keyDown.nextChar[0] && optionDb.duringPlayOptions['dakuten-handakuten-split-mode']){
				line.lineInputKana = daku_handaku_join(true,false,line.lineInputKana)
			}

            gameStart.updateTypingWordAreaStyles('KanaMode')
			effect.viewState("KanaMode")
		}

		line.updateLineView()

		//lineクリア色変更はupdateLineViewで行うと練習モードで誤作動を起こす。
		if(typingCounter.completed){
			typingCounter.lineComplete()
		}

		line.renderLyric(line.count-1)
		mapInfoDisplay.updateMapInfo()

		if(RTC_Switch){
			var updates = {};

			if(inputMode.kanaMode){
				updates['users/' + myID + '/status/InputMode'] = "かな";
			}else{
				updates['users/' + myID + '/status/InputMode'] = "ローマ字";
			}

			firebase.database().ref().update(updates);
		}
	}

    static daku_handaku_join(next_char_flag,Calculation,join_word){
        let tagstr1 = {
            "ゔ": "う゛","が": "か゛", "ぎ": "き゛", "ぐ": "く゛", "げ": "け゛", "ご": "こ゛",
            "ざ": "さ゛", "じ": "し゛", "ず": "す゛", "ぜ": "せ゛", "ぞ": "そ゛",
            "だ": "た゛", "ぢ": "ち゛", "づ": "つ゛", "で": "て゛", "ど": "と゛",
            "ば": "は゛", "び": "ひ゛", "ぶ": "ふ゛", "べ": "へ゛", "ぼ": "ほ゛",
            "ぱ": "は゜", "ぴ": "ひ゜", "ぷ": "ふ゜", "ぺ": "へ゜", "ぽ": "ほ゜",
        };
        let tagstr2 = {}; Object.keys(tagstr1).map(function (v, index, array) { return tagstr2[tagstr1[v]] = v }); // keyとvalueを逆にする
        let s1 = "ゔ|が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ";
        let s2 = "う゛|か゛|き゛|く゛|け゛|こ゛|さ゛|し゛|す゛|せ゛|そ゛|た゛|ち゛|つ゛|て゛|と゛|は゛|ひ゛|ふ゛|へ゛|ほ゛|は゜|ひ゜|ふ゜|へ゜|ほ゜";
        let reg, replacer;

        if((!inputMode.kanaMode || !optionDb.duringPlayOptions['dakuten-handakuten-split-mode']) && !Calculation){

            function replacer2(match, index, input) { // 「か゛」 → 「が」
                return tagstr2[match]
            }

            reg = new RegExp(s2, "g"); replacer = replacer2;

            if(next_char_flag){
                keyDown.nextChar[0] = keyDown.nextChar[0].replace(reg, replacer);
            }

            for(let i=0 ; join_word.length > i ; i++){
                join_word[i] = join_word[i].replace(reg, replacer);
            }

        }else if(optionDb.duringPlayOptions['dakuten-handakuten-split-mode'] || Calculation){

            function replacer1(match, index, input) { // 「が」 → 「か゛」
                return tagstr1[match]
            }

            reg = new RegExp(s1, "g"); replacer = replacer1;

            if(next_char_flag){
                keyDown.nextChar[0] = keyDown.nextChar[0].replace(reg, replacer);
            }

            for(let i=0 ; join_word.length > i ; i++){
                join_word[i] = join_word[i].replace(reg, replacer);
            }

        }

        return join_word;
    }
}



class TypingShortcut extends Handler {

	constructor(){
		super()
	}

	shortcuts(event){

		const iS_FOCUS_TEXTAREA = document.activeElement.type == "text"

		if(iS_FOCUS_TEXTAREA){return;}

		switch(event.code){

			case "ArrowDown":
				this.changeVolume(-10)
				event.preventDefault();
				break;

			case "ArrowUp":
				this.changeVolume(10)
				event.preventDefault();
				break;

			case "ArrowLeft" :

				if(game.playMode.value == "practice" && event.ctrlKey && !event.shiftKey) {
					this.arrowLeftPracticeMode()
				}else{
					this.changeDiffTime(-0.1)
				}

				event.preventDefault();
				break;

			case "ArrowRight":

				if(game.playMode.value == "practice" && event.ctrlKey  && !event.shiftKey){
					this.arrowRightPracticeMode()
				}else{
					this.changeDiffTime(0.1)
				}

				event.preventDefault();
				break;

			case "F4": //F4でやり直し

				retry.value.reset(event)
				event.preventDefault();
				break;

			case "F7": //F7で練習モードに切り替え


				event.preventDefault();
				break;
			case "F9": //F9で低速(練習モード)

				event.preventDefault();
				break;
			case "F10" ://F10で倍速

				if(game.playMode.value == "normal"){
					SpeedChange.realtimeChange()
				}else{

				}

				event.preventDefault();
				break;

			case "Escape" : //Escでポーズ

				youtube.value.pauseVideo()
				event.preventDefault();
				break;

			case "KanaMode" :
			case "Romaji" :
				this.changeInputMode()
				event.preventDefault();
				break;

			case "Backspace" :

				if(game.playMode.value == "practice" && practiceMode.setSeekTime){
					practiceMode.seekLine(practiceMode.setSeekTime);
					practiceMode.isLineRetry = true
					event.preventDefault();
				}

				break;
		}

		//間奏スキップ
		if(event.code == typeArea.value.skip){
			game.skip(event)
			event.preventDefault();
		}

		if(event.altKey && (event.key == "ArrowLeft" || event.key == "ArrowRight")) {
			//Alt + Leftキーは使えるようにする(ブラウザの戻るショートカットキー)
			return;
		}else if(disableKeys.includes(event.code) ) {
			event.preventDefault();
			return;
		}
	}


}

export const typingShortcut = new TypingShortcut()
const disableKeys = ["Home","End","PageUp","PageDown","CapsLock","Backquote","Tab","F3","Backspace"]


