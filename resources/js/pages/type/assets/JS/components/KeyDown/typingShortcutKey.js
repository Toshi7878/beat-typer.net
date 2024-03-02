class TypingShortcutKeys {

	static shortcuts(){

		switch(event.key){

			case "ArrowDown":

				if(optionDb.duringPlayOptions['disable-up-down-shortcut']){
					event.preventDefault();
					return;
				}

				TypingShortcutKeys.changeVolume(-10)
				event.preventDefault();
				break;

			case "ArrowUp":

				if(optionDb.duringPlayOptions['disable-up-down-shortcut']){
					event.preventDefault();
					return;
				}

				TypingShortcutKeys.changeVolume(10)
				event.preventDefault();
				break;

			case "ArrowLeft" :

				if(!event.altKey){

					if(play_mode == "practice" && event.ctrlKey && !event.shiftKey) {
						TypingShortcutKeys.arrowLeftPracticeMode()
					}else{

						if(optionDb.duringPlayOptions['disable-left-right-shortcut']){
							event.preventDefault();
							return;
						}

						if(event.ctrlKey && event.shiftKey){
							TypingShortcutKeys.changeDiffTime(-0.01)
						}else{
							TypingShortcutKeys.changeDiffTime(-0.1)
						}

					}

				}
				event.preventDefault();
				break;

			case "ArrowRight":

				if(!event.altKey){

					if(play_mode == "practice" && event.ctrlKey  && !event.shiftKey){
						TypingShortcutKeys.arrowRightPracticeMode()
					}else{

						if(optionDb.duringPlayOptions['disable-left-right-shortcut']){
							event.preventDefault();
							return;
						}

						if(event.ctrlKey && event.shiftKey){
							TypingShortcutKeys.changeDiffTime(0.01)
						}else{
							TypingShortcutKeys.changeDiffTime(0.1)
						}
					}
				}

				event.preventDefault();
				break;

			case "F4": //F4でやり直し

				if(!RTC_Switch){

					if(play_mode == 'normal'){
						retry.reset()
					}else{
						retry.practiceModeReset()
                        practiceMode.seekLine(0)
					}

				}

				event.preventDefault();
				break;

			case "F7": //F7で練習モードに切り替え

				if(play_mode == "normal"){

					if(!RTC_Switch || Object.keys(Players_ID).length == 1){
						practiceMode.movePracticeMode()
					}

				}
				event.preventDefault();
				break;
			case "F9": //F9で低速(練習モード)

				if(play_mode=="practice"){
					movieSpeedController.setDownPlaySpeed()
					effect.viewState("x"+movieSpeedController.speed.toFixed(2))
				}

				event.preventDefault();
				break;
			case "F10" ://F10で倍速

				if(play_mode=="normal"){

					if(!RTC_Switch || Object.keys(Players_ID).length == 1){
						movieSpeedController.setDynamicSpeed();
					}

				}else{
					movieSpeedController.setUpPlaySpeed()
					effect.viewState("x"+movieSpeedController.speed.toFixed(2))
				}

				event.preventDefault();
				break;

			case "F1" : //対戦のランキング表示方法変更

				if(RTC_Switch){
					changeBattleContainer()
				}

				event.preventDefault();
				break;

			case "Escape" : //Escでポーズ

				if(!RTC_Switch || Object.keys(Players_ID).length == 1){
					player.pauseVideo()
				}
				event.preventDefault();
				break;

			case "KanaMode" :
			case "Romaji" :

				if(keyboard != "mac" && !optionDb.duringPlayOptions['disable-change-mode']){
					TypingShortcutKeys.changeInputMode()
					event.preventDefault();
					break;
				}

			case "Backspace" :

				if(play_mode == "practice" && document.activeElement.tagName != "INPUT" && practiceMode.setSeekTime){
					practiceMode.seekLine(practiceMode.setSeekTime);
					practiceMode.isLineRetry = true
					event.preventDefault();
				}

				break;
		}

		//間奏スキップ
		if(event.code == timeSkip.skipCode || gameStart.duringPlayAccessElements['skip-guide'].textContent.includes("Tap")){
			timeSkip.triggerSkip()

			if(typing_play_mode != 'flick'){
				event.preventDefault();
			}

		}

		if(event.altKey && (event.key == "ArrowLeft" || event.key == "ArrowRight")) {
			//Alt + Leftキーは使えるようにする(ブラウザの戻るショートカットキー)
			return;
		}else if(disableKeys.includes(event.code) || (event.altKey || (event.code=="Space" && typing_play_mode != 'flick') || window.navigator.userAgent.indexOf('Firefox') != -1 && (event.key=="'" || event.key=="/") ) ) {
			event.preventDefault();
			return;
		}
	}

	static changeVolume(diff){
		volume = player.getVolume();
		volume += diff;

		if(volume < 0) {
			volume = 0;
		}else if(volume > 100) {
			volume = 100;
		}

		player.setVolume(volume);
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

		createjs.Ticker.removeAllEventListeners('tick');
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


        createjs.Ticker.removeAllEventListeners('tick');
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

		typingWordRenderer.update('kanaUpdate')
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