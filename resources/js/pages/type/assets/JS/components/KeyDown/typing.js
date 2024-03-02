class KeyDown {

	constructor(){
		this.flickInputMaxValue = 0
		this.continuousSokuonFlag = false
		this.sokuonChain = ''
		this.isNWhu = false
		this.dakuKanaFlag = false
		this.kanaKeyObjects = 0
		this.tsuFlag = false
		this.nextChar = []
		this.nextPoint = 0

		if(keyDown){
			keyDown.removeEvent()
		}

		this.addEvent()
	}

	addEvent(){
		this.Event = this.handleKeyDown.bind(this)

		if(typing_play_mode == 'flick'){
			gameStart.duringPlayAccessElements['flick-input'].addEventListener('input',this.Event);
			gameStart.duringPlayAccessElements['flick-input-second'].addEventListener('input',this.Event);
		}else{
            //useCapture(第3引数)をtrueにする必要あり(スペースキーのスクロールが無効にならないため)
			window.addEventListener('keydown',this.Event,true);
		}

	}

	removeEvent(){

		if(typing_play_mode == 'flick'){
			gameStart.duringPlayAccessElements['flick-input'].removeEventListener('input',this.Event);
			gameStart.duringPlayAccessElements['flick-input-second'].removeEventListener('input',this.Event);
		}else{
            //useCapture(第3引数)をtrueにする必要あり(スペースキーのスクロールが無効にならないため)
			window.removeEventListener('keydown',this.Event,true);
		}

	}

    handleKeyDown(event){
        this.inputChar = null
        this.flickChar = event.type == "input" && event.data != null ? event.data.slice(0.-1) : false

        const ACTIVE_ELEMENT = document.activeElement
        //Check
        const replayFlag = (!optionDb.duringPlayOptions['replay-mode'] || optionDb.duringPlayOptions['replay-mode'] && line.count && !lineResult.lineResultObj['lineTypingResult'][line.count-1][replay.pushCounter]) ? true : false
        const focusCheck = event.type == "input" || ACTIVE_ELEMENT.type != "text"
        const charKeyCheck = this.flickChar !== false || ((event.keyCode >= 65 && event.keyCode <= 90) || keyboardCodes.includes(event.code) || tenkeyCodes.includes(event.code)) && event.key != "Process" ? true : false


        if(replayFlag && charKeyCheck && focusCheck && this.nextChar[0]){

            this.createInputChar()

            if(event.type == "keydown" && !(event.ctrlKey && event.code == "KeyC")){
                event.preventDefault()
            }

        }

        if(focusCheck && event.type == "keydown"){
            TypingShortcutKeys.shortcuts();
        }

    }

    createInputChar(){
        tick.headTime = player.getCurrentTime() + optionDb.duringPlayOptions['initial-time-diff'];
        tick.updateLineTime()

        if(inputMode.kanaMode){

            this.daku = dakuKanaList.includes(this.nextChar[0][0]) ? dakuKanaList[dakuKanaList.indexOf(this.nextChar[0][0])] : false
            this.handaku = handakuKanaList.includes(this.nextChar[0][0]) ? handakuKanaList[handakuKanaList.indexOf(this.nextChar[0][0])] : false

            if(event.type == "keydown"){
                this.createKanaInputChar()
            }else{
                this.createFlickInputChar()
            }

        }else{
            this.inputChar = optionDb.duringPlayOptions['case-sensitive-mode'] && keyboardCharacters.includes(this.nextChar[0]) ? event.key : (event.key).toLowerCase()
        }

        this.keyJudge(event.key, event.code, event.shiftKey)
    }

    keyJudge(eventKey, eventCode, shiftKey){

        if(inputMode.kanaMode){

            if(KeyJudge.checkNextKana()){
                //正答した
                typingWordRenderer.update('kanaUpdate')

                if(this.daku || this.handaku){
                    this.inputChar = this.daku ? this.daku.normalize('NFD')[0] : this.handaku.normalize('NFD')[0]
                }else{
                    this.inputChar = this.inputChar[this.kanaKeyObjects]
                }

                this.continuousSokuonFlag = false // ローマ字モードの「っ」連鎖判定
                typingCounter.addTypingCount(this.inputChar, shiftKey);
                effect.typeEffect();

            }else if(!typingCounter.completed){
                //ミスした

                //フリック入力モードで小文字を入力する際の大文字ひらがな入力はミスにしない。
                if(this.flickChar && yoonFlickList.includes(this.nextChar[0][0]) && yoonFlickListLarge.indexOf(this.inputChar[0]) == yoonFlickList.indexOf(this.nextChar[0][0]) ){return;}

                if(typingWordRenderer.alreadyInputKana.length != 0) {
                    Flick.dakuHandakuRedoNextChar()
                    const checkKanaChar = (!this.flickChar && /[!-~]/.test(this.nextChar[0]))
                    typingCounter.typingResult.push([tick.headTime, (checkKanaChar ? eventKey : this.inputChar[0]), Math.round(typingCounter.score-parseLyric.scoreParChar/4), line.count, 0, 0]);
                    typingCounter.lineTypingResult.push({char:(checkKanaChar ? eventKey : this.inputChar[0]), result:false, time:tick.headTime, kanaMode:inputMode.kanaMode, shiftKey:shiftKey});
                    typingCounter.addMissCount();
                }

                effect.missEffect();
                if(challengeMode.judgeTypingAccuracy(true)){return;}
            }

        }else{

            //zCommand() eventCode == "KeyZ"かどうかを確認
            if(KeyJudge.checkNextChar(KeyJudge.zCommand(eventCode, shiftKey))){
                //正答した

                typingCounter.addTypingCount(this.inputChar, shiftKey);
                effect.typeEffect();
            }else if(!typingCounter.completed) {
                //ミスした

                if(typingWordRenderer.alreadyInputRoma.length != 0) {
                    typingCounter.addMissCount();
                    typingCounter.typingResult.push([tick.headTime, this.inputChar, Math.round(typingCounter.score), line.count,0,0]);
                    typingCounter.lineTypingResult.push({char:this.inputChar, result:false, time:tick.headTime, kanaMode:inputMode.kanaMode, shiftKey:shiftKey});
                }

                effect.missEffect();
                if(challengeMode.judgeTypingAccuracy(true)){return;}
            }

        }
    }

    createKanaInputChar(){
        this.inputChar = kanaCodeKeyMap[event.code] ? kanaCodeKeyMap[event.code] : kanaKeyMap[event.key];

        if(event.shiftKey){
            if(event.code == "KeyE"){this.inputChar[0] = "ぃ";}
            if(event.code == "KeyZ"){this.inputChar[0] = "っ";}

            //ATOK入力 https://support.justsystems.com/faq/1032/app/servlet/qadoc?QID=024273
            if(event.code == "KeyV"){this.inputChar.push("ゐ","ヰ")}
            if(event.code == "Equal"){this.inputChar.push("ゑ","ヱ")}
            if(event.code == "KeyT"){this.inputChar.push("ヵ")}
            if(event.code == "Quote"){this.inputChar.push("ヶ")}
            if(event.code == "KeyF"){this.inputChar.push("ゎ")}
            if(event.key == "0"){this.inputChar = ["を"];}
        }

        if(keyboardCharacters.includes(event.key)){
            !optionDb.duringPlayOptions['case-sensitive-mode'] ? this.inputChar.push(event.key.toLowerCase() , event.key.toLowerCase().replace(event.key.toLowerCase(), function(s) {return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);})) : this.inputChar.push(event.key , event.key.replace(event.key, function(s) {return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);}))
        }
    }

    createFlickInputChar(){

		if(this.flickInputMaxValue == event.target.value){
			return;
		}

		if(this.flickInputMaxValue.length > event.target.value.length){
			this.flickInputMaxValue = event.target.value

			Flick.dakuHandakuRedoNextChar()
			return;
		}

		this.flickInputMaxValue = event.target.value
		this.inputChar = [this.flickChar]

		if(this.inputChar[0] == "~" || this.inputChar[0] == "～"){
			this.inputChar = ["~","～"]
		}

		if(this.inputChar[0] == "\\" || this.inputChar[0] == "￥"){
			this.inputChar = ["\\","￥"]
		}

		if(this.inputChar[0] == "　"){
			this.inputChar = [" "]
		}

		if(this.inputChar[0] == "！" || this.inputChar[0] == "!"){
			this.inputChar = ["!","！"]
		}

		if(this.inputChar[0] == "？" || this.inputChar[0] == "?"){
			this.inputChar = ["?","？"]
		}

		if(this.nextChar[0][0] == "゛" && dakuKanaList.includes(this.inputChar[0]) || this.nextChar[0][0] == "゜" && handakuKanaList.includes(this.inputChar[0])){

			if(this.inputChar[0].normalize('NFD')[0] == typingWordRenderer.alreadyInputKana.slice(-1)|| this.inputChar[0] == this.nextChar.slice(-1)[0]){
				this.inputChar = [this.nextChar[0][0]]
			}

		}
		const zenkaku = keyboardCharacters.indexOf(this.inputChar[0])

		if(zenkaku > -1){
			this.inputChar.push(this.inputChar[0].replace(this.inputChar[0], function(s) {return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)}));
		}else if(this.inputChar[0] == "\\"){
			this.inputChar.push("￥")
		}else if(this.inputChar[0] == "\""){
			this.inputChar.push("“","”")
		}else if(this.inputChar[0] == "'"){
			this.inputChar.push("’")
		}

	}

}

class KeyJudge {

	static redoFlickAlreadyInput(){
		keyDown.nextChar[0] = typingWordRenderer.alreadyInputKana.slice(-1)+keyDown.nextChar[0]
		typingWordRenderer.alreadyInputKana = typingWordRenderer.alreadyInputKana.slice(0,-1)
		typingCounter.typeCount--
		typingWordRenderer.update('kanaUpdate')
	}

	static checkNextKana(){
		keyDown.kanaKeyObjects = [].indexOf.call(keyDown.inputChar, !optionDb.duringPlayOptions['case-sensitive-mode'] ? keyDown.nextChar[0].slice(0,1).toLowerCase(): keyDown.nextChar[0].slice(0,1))

		if(keyDown.dakuKanaFlag && keyDown.inputChar[keyDown.kanaKeyObjects] && (keyDown.nextChar[0][0] == "゛" || keyDown.nextChar[0][0] == "゜")){
			typingCounter.kanaCombo --
			keyDown.dakuKanaFlag = false
		}

		if(keyDown.flickChar){

			if(optionDb.duringPlayOptions['dakuten-handakuten-split-mode'] && keyDown.inputChar[0] && keyDown.nextChar[0].length >= 2){
				const boin = (dakuKanaList.includes(keyDown.inputChar[0]) || handakuKanaList.includes(keyDown.inputChar[0])) ? keyDown.inputChar[0] : false

				if(boin && keyDown.nextChar[0][0] == boin.normalize('NFD')[0] && ( (keyDown.nextChar[0][1] == "゛" && dakuKanaList.includes(keyDown.inputChar[0])) || (keyDown.nextChar[0][1] == "゜" || handakuKanaList.includes(keyDown.inputChar[0])) ) ){
					KeyJudge.addNextChar(true)
					return true
				}

			}

		}

		let yoon = ""
        const isDakuHandakuYoon = keyDown.nextChar[0].length >= 2 && (keyDown.daku || keyDown.handaku)

		if(isDakuHandakuYoon){
            //濁点・半濁点 + 小文字の小文字部分を抽出
			yoon = keyDown.nextChar[0][1]
		}

        let isDakuten = keyDown.daku && keyDown.inputChar.includes(keyDown.daku.normalize('NFD')[0])
        let isHandaku = keyDown.handaku && keyDown.inputChar.includes(keyDown.handaku.normalize('NFD')[0])
        let isNormal = keyDown.kanaKeyObjects > -1

		//return trueは正解　return falseは不正解。
		if(isDakuten || isHandaku) {

            if(isDakuten){
                keyDown.nextChar = ["゛"+yoon, ...keyDown.nextChar.slice(1),keyDown.daku];
            }else if(isHandaku){
                keyDown.nextChar = ["゜"+yoon, ...keyDown.nextChar.slice(1),keyDown.handaku];
            }

			typingCounter.kanaCombo ++
            keyDown.dakuKanaFlag = true

            return true;
        }else if(isNormal) {

			if(keyDown.nextChar[0].length >= 2){
				KeyJudge.romaDistinguish()
			}else{
				KeyJudge.addNextChar(true)
			}

			return true
		}

		return false;
	}

	static checkNextChar(z_command){
		let flag = false;
		let romaNextChar = keyDown.nextChar.slice(1)
		let isKanaUpdate = z_command ? 'kanaUpdate' : false

		//入力したキー == 打鍵パターン1文字目  確認
		for (let i=0; i<romaNextChar.length; i++){

			if(keyDown.inputChar == romaNextChar[i][0]){
				flag = true;
				break;
			}

		}

		if(keyDown.continuousSokuonFlag && keyDown.inputChar == "t"){
			KeyJudge.continuousSokuonAdjust(keyDown.inputChar)
		}else if(keyDown.tsuFlag && keyDown.inputChar == "s"){
			typingWordRenderer.alreadyInputRoma += keyDown.inputChar
			typingWordRenderer.update(isKanaUpdate)
			return true;
		}else if(keyDown.isNWhu && (line.lineInputKana[0][0] == "う" && keyDown.inputChar == "w" || line.lineInputKana[0][0] == "ん" && keyDown.inputChar == "x")){
			KeyJudge.addNextChar(true)
			typingWordRenderer.update('kanaUpdate')
		}else if(keyDown.nextChar[0] == "..." && keyDown.inputChar == ","){
			keyDown.nextChar = ["..", ","]
			keyDown.nextPoint = 2 * parseLyric.scoreParChar
			line.lineInput.unshift(".")
			line.lineInputRoma.unshift(".")
			line.lineInputKana.unshift(".")
		}else if(!flag){
			return false;
		}

		keyDown.continuousSokuonFlag = false
		keyDown.isNWhu = false

		if(keyDown.nextChar[0] == 'ん'){
            const isXN = keyDown.inputChar == 'x' && line.lineInputRoma[0] && (line.lineInputRoma[0][0] != 'n' && line.lineInputRoma[0][0] != 'N')
            const isNextWhu = line.lineInputKana[0] && (line.lineInputKana[0][0] == "う" || line.lineInputKana[0][0] == "ん") && keyDown.inputChar == 'n' && keyDown.nextChar[1] == 'nn'
			if(isXN){
                // xnで「ん」を打鍵する場合、次の文字から[nn, n']の打鍵パターンを除外する
				line.lineInput[0] = line.lineInput[0].filter(function(value) { return value.match(/^(?!(n|')).*$/)})
			}else if(isNextWhu){
                //nnの入力中(最初のnを入力した時)にwu,whuの判定を追加するフラグ。
				keyDown.isNWhu = true
			}

		}

		//打ってない方のパターン削除
		if(keyDown.nextChar.length >= 3){

			//拗音・促音クリア判定
			//先頭の文字(現在入力してるモノ)を削除
			for (let j=0; j<keyDown.nextChar.length; j++){

				if(j > 0){

					if(keyDown.inputChar == keyDown.nextChar[j][0]){
						keyDown.nextChar[j] = keyDown.nextChar[j].slice(1);
					}else{
						//入力したキーから始まる打鍵パターン以外を削除
						keyDown.nextChar.splice( j, 1 );
						j--
					}

				}

			}

		}else{
			keyDown.nextChar[1] = keyDown.nextChar[1].slice(1)
		}


		if(keyDown.nextChar[0].length >= 2){

			if(keyDown.nextChar[0][0] != 'っ' && (keyDown.nextChar[1][0] == 'x' || keyDown.nextChar[1][0] == 'l') || keyDown.nextChar[0][0] == 'っ' && (keyDown.inputChar == 'u' || keyDown.nextChar[1][0] == keyDown.inputChar)){

				if(keyDown.nextChar[0][0] == 'っ' && keyDown.nextChar[0][1] == 'っ' && (keyDown.nextChar[1][0] == 'x' || keyDown.nextChar[1][0] == 'l') && (keyDown.inputChar == "x"|| keyDown.inputChar == "l")){
					keyDown.continuousSokuonFlag = true
				}

				KeyJudge.romaDistinguish()
				isKanaUpdate = 'kanaUpdate'

				if(keyDown.nextChar[0][0] == 'っ' && keyDown.inputChar == 'u'){
					keyDown.tsuFlag = false
				}

			}

		}

		typingWordRenderer.alreadyInputRoma += keyDown.inputChar;

		if(!keyDown.nextChar[1]) {
			KeyJudge.addNextChar(true)
			isKanaUpdate = true
		}

		typingWordRenderer.update(isKanaUpdate)

		return true;
	}

	static continuousSokuonAdjust(){

		const SOKUON_TIMES = ( keyDown.sokuonChain[0].match( /っ/g ) || [] ).length-( keyDown.nextChar[0].match( /っ/g ) || [] ).length

		if(keyDown.continuousSokuonFlag){
			keyDown.nextChar[0] = typingWordRenderer.alreadyInputKana.slice(-1)+keyDown.nextChar[0]
			typingWordRenderer.alreadyInputKana = typingWordRenderer.alreadyInputKana.slice(0,-1)
			keyDown.tsuFlag = true
		}

		for(let h=1;h<keyDown.sokuonChain.length;h++){
			keyDown.nextChar[h] = (keyDown.continuousSokuonFlag?"tu":"") + keyDown.sokuonChain[h].slice(SOKUON_TIMES)
		}

		if(keyDown.continuousSokuonFlag){
			typingWordRenderer.update('kanaUpdate')
		}

	}

	static zCommand(pushkey,shiftkey){

		if(pushkey == "KeyZ" && !shiftkey){

			if(keyDown.nextChar[0] == "." && line.lineInputKana[0] == "."){

				if(line.lineInputKana[1] == "."){
					keyDown.nextChar = ["...", keyDown.inputChar + "."]
					keyDown.nextPoint = 3 * parseLyric.scoreParChar
					line.lineInput.splice(0, 2)
					line.lineInputRoma.splice(0, 2)
					line.lineInputKana.splice(0, 2)
				}else{
					keyDown.nextChar = ["..", keyDown.inputChar + ","]
					keyDown.nextPoint = 2 * parseLyric.scoreParChar
					line.lineInput.splice(0, 1)
					line.lineInputRoma.splice(0, 1)
					line.lineInputKana.splice(0, 1)
				}

				return true
			}else if(keyDown.nextChar[0] == "～" && keyDown.nextChar[1] != "-"){
				keyDown.nextChar[1] = keyDown.inputChar + "-"
			}

		}
	}

	static romaDistinguish(){
		typingWordRenderer.alreadyInputKana += inputMode.kanaMode && !optionDb.duringPlayOptions['dakuten-handakuten-split-mode'] && ["゛", "゜"].includes(keyDown.nextChar[0][0]) ? keyDown.nextChar[keyDown.nextChar.length-1] : keyDown.nextChar[0].slice( 0, 1 )
		keyDown.nextChar[0] = keyDown.nextChar[0].slice(1)
	}

	static addNextChar(flag){

		if(flag){
			typingWordRenderer.alreadyInputKana += inputMode.kanaMode && !optionDb.duringPlayOptions['dakuten-handakuten-split-mode'] && ["゛", "゜"].includes(keyDown.nextChar[0]) ? keyDown.nextChar[keyDown.nextChar.length-1] : keyDown.nextChar[0];

			//スコア加算
			typingCounter.lineScore += keyDown.nextPoint;

			if(lineResult.lineResultObj['lineScoreResult'][line.count-1]['score'] < typingCounter.lineScore){
				typingCounter.score += keyDown.nextPoint;
				StatusRenderer.statusCountsUpdate(["Score"])
			}

		}

		if(inputMode.kanaMode && flag && keyDown.nextChar.length >= 2 && keyDown.nextChar[0].length == 1){
			typingWordRenderer.alreadyInputRoma += keyDown.nextChar[1];
			line.lineInputRoma.shift(1)
		}else if(!inputMode.kanaMode || !flag){
			line.lineInputRoma.shift(1)
		}

		keyDown.sokuonChain = ""
		keyDown.nextChar = !line.lineInput[0] ? ["",""] : [line.lineInputKana.shift(1), ...line.lineInput.shift(1)]

		if(keyDown.nextChar[0][0] == "っ" && keyDown.nextChar[0][1] == "っ"){
			keyDown.sokuonChain = keyDown.nextChar.concat()
		}

		if(optionDb.duringPlayOptions['case-sensitive-mode'] && keyDown.nextChar[0] == keyDown.nextChar[1].toUpperCase()){
			keyDown.nextChar[1] = keyDown.nextChar[1].toUpperCase()
		}

		if(!keyDown.nextChar[0]) {
			typingCounter.lineComplete()
		}else{
			keyDown.nextPoint = keyDown.nextChar[1].length * parseLyric.scoreParChar

			if(!inputMode.kanaMode){
				KeyJudge.optimizeKeystrokePattern()
			}

		}

	}

	//打鍵パターンを最適化
	static optimizeKeystrokePattern(){
		//ひらがな2文字の周りくどい入力方法ltuta,xtufu,silya,ltuteleなどを入力できなくする機能
		if(optionDb.duringPlayOptions['sokuon-yoon-disable'] && keyDown.nextChar[0].length >= 2 && keyDown.nextChar.length >= 4){

			const next_char_before = keyDown.nextChar[0][keyDown.nextChar[0].length-2]
			const next_char_last = keyDown.nextChar[0][keyDown.nextChar[0].length-1]

			if( !(smallKanaList.includes(next_char_before) && smallKanaList.includes(next_char_last)) ){
				keyDown.nextChar = keyDown.nextChar.filter(function(value) { return value.match(/^(?!.*(x|l)).*$/)})
			}else if(!OptimisationWhiteList.includes(next_char_before+next_char_last)){
				keyDown.nextChar = keyDown.nextChar.filter(function(value) { return value.match(/^(?!.*(tu|tsu)).*$/)})
			}

		}

	}
}

let keyDown

const keyboardCodes = ["Space","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","IntlYen","BracketLeft","BracketRight","Semicolon","Quote","Backslash","Backquote","IntlBackslash","Comma","Period","Slash","IntlRo"]//keyboardCodes.includes(event.code)
const tenkeyCodes = ["Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","Numpad0","NumpadDivide","NumpadMultiply","NumpadSubtract","NumpadAdd","NumpadDecimal"]//tenkeyCodes.includes(event.code)
const keyboardCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "&", "%", "!", "?", "@", "#", "$", "(", ")", "|", "{", "}", "`", "*", "+", ":", ";", "_", "<", ">", "=", "^"]
const disableKeys = ["Home","End","PageUp","PageDown","CapsLock","Backquote","Tab","F3","Backspace"]

const dakuKanaList = ["ゔ","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ"];
const handakuKanaList = ["ぱ","ぴ","ぷ","ぺ","ぽ"];
const yoonFlickList = ["ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","っ","ゎ"]
const yoonFlickListLarge = ["あ","い","う","え","お","や","ゆ","よ","つ","わ"]
const smallKanaList = ["っ","ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","ゎ","ヵ","ヶ","ん"]
const OptimisationWhiteList = ["っっ","っん","っい","っう"]

const kana_mode_convert_rule_before = ["←", "↓", "↑", "→", "『", "』"]
const kana_mode_convert_rule_after = ["ひだり", "した", "うえ", "みぎ", "「", "」"]

//↓マイナー配列をUserScript等で作成できるようにletで宣言
let kanaKeyMap = {
	"0": ["わ"],
	"1": ["ぬ"],
	"!":["ぬ"],
	"2": ["ふ"],
	"3": ["あ"],
	"4": ["う"],
	"5": ["え"],
	"6": ["お"],
	"7": ["や"],
	"8": ["ゆ"],
	"9": ["よ"],
	"-": ["ほ","-"],
	"q": ["た"],
	"Q": ["た"],
	"w": ["て"],
	"W": ["て"],
	"e": ["い"],
	"E": ["い"],
	"r": ["す"],
	"R": ["す"],
	"t": ["か"],
	"T": ["か"],
	"y": ["ん"],
	"Y": ["ん"],
	"u": ["な"],
	"U": ["な"],
	"i": ["に"],
	"I": ["に"],
	"o": ["ら"],
	"O": ["ら"],
	"p": ["せ"],
	"P": ["せ"],
	"a": ["ち"],
	"A": ["ち"],
	"s": ["と"],
	"S": ["と"],
	"d": ["し"],
	"D": ["し"],
	"f": ["は"],
	"F": ["は"],
	"g": ["き"],
	"G": ["き"],
	"h": ["く"],
	"H": ["く"],
	"j": ["ま"],
	"J": ["ま"],
	"k": ["の"],
	"K": ["の"],
	"l": ["り"],
	"L": ["り"],
	"z": ["つ"],
	"Z": ["つ"],
	"x": ["さ"],
	"X": ["さ"],
	"c": ["そ"],
	"C": ["そ"],
	"v": ["ひ"],
	"V": ["ひ"],
	"b": ["こ"],
	"B": ["こ"],
	"n": ["み"],
	"N": ["み"],
	"m": ["も"],
	"M": ["も"],
	",": ["ね",","],
	"<": ["、"],
	".": ["る","."],
	">": ["。"],
	"/": ["め","/"],
	"?": ["・"],
	"#": ["ぁ"],
	"$": ["ぅ"],
	"%": ["ぇ"],
	"'": ["ゃ","’","'"],
	"^": ["へ"],
	"~": ["へ"],
	"&": ["ぉ"],
	"(": ["ゅ"],
	")": ["ょ"],
	"|": ["ー"],
	"_": ["ろ"],
	"=": ["ほ"],
	"+": ["れ"],
	";": ["れ"],
	'"': ["ふ","”","“","\""],
	"@": ["゛"],
	"`": ["゛"],
	"[": ["゜"],
	"]": ["む"],
	"{": ["「"],
	"}": ["」"],
	":": ["け"],
	"*": ["け"]
}
let kanaCodeKeyMap = {
	"IntlYen":["ー","￥","\\"],
	"IntlRo":["ろ","￥","\\"],
	"Space":[" "],
	"Numpad1":[],
	"Numpad2":[],
	"Numpad3":[],
	"Numpad4":[],
	"Numpad5":[],
	"Numpad6":[],
	"Numpad7":[],
	"Numpad8":[],
	"Numpad9":[],
	"Numpad0":[],
	"NumpadDivide":[],
	"NumpadMultiply":[],
	"NumpadSubtract":[],
	"NumpadAdd":[],
	"NumpadDecimal":[]
}