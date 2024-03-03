import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { Type, Miss } from '@/pages/type/assets/JS/components/Typing/typeCalc.js';

import _ from 'lodash';
import { ref } from 'vue';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { typingShortcut } from '@/pages/type/assets/JS/components/KeyDown/shortcutKey.js';
import { lineResult } from '@/pages/type/assets/JS/consts/resultRef.js';

const keyboardCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "~", "&", "%", "!", "?", "@", "#", "$", "(", ")", "|", "{", "}", "`", "*", "+", ":", ";", "_", "<", ">", "=", "^"]

const dakuKanaList = ["ゔ","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ"];
const handakuKanaList = ["ぱ","ぴ","ぷ","ぺ","ぽ"];
const yoonFlickList = ["ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","っ","ゎ"]
const yoonFlickListLarge = ["あ","い","う","え","お","や","ゆ","よ","つ","わ"]
const smallKanaList = ["っ","ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","ゎ","ヵ","ヶ","ん"]
const OptimisationWhiteList = ["っっ","っん","っい","っう"]

const kana_mode_convert_rule_before = ["←", "↓", "↑", "→", "『", "』"]
const kana_mode_convert_rule_after = ["ひだり", "した", "うえ", "みぎ", "「", "」"]


class Event {

	addEvent(){
		this.Event = this.handleKeyDown.bind(this)
		window.addEventListener('keydown',this.Event, true);
	}

	removeEvent(){
		window.removeEventListener('keydown',this.Event,true);
	}

}



class KeyCalc extends Event {

	constructor(){
		super()
	}

	hasRomaPattern(){
		let romaPattern = typeArea.value.nextChar['r']
		let kana = typeArea.value.nextChar['k']
		const CHAR = this.char['key'][0]


		const IS_SUCCESS = _.some(romaPattern, pattern => pattern[0] === CHAR);

		if(!IS_SUCCESS){
			//←ミス
			return false;
		}

		//↓↓↓正答↓↓↓

		this.romaPatternFilter(kana, CHAR, romaPattern)

		//先頭の文字(現在入力してるモノ)を削除
		for (let i=0; i<romaPattern.length; i++){

				if(this.char['key'][0] == romaPattern[i][0]){
					romaPattern[i] = romaPattern[i].slice(1);
					if(romaPattern[i].length == 0){
						romaPattern.splice( i, 1 );
						i--
					}
				}else{
					//入力したキーから始まる打鍵パターン以外を削除
					romaPattern.splice( i, 1 );
					i--
				}
		}

		this.kanaFilter(kana, CHAR, romaPattern)
		return true;
	}

	romaPatternFilter(kana, CHAR, romaPattern){

		if(kana == 'ん'){
			// xnで「ん」を打鍵する場合、次の文字から[nn, n']の打鍵パターンを除外する
			this.nextNNFilter(CHAR)
		}


	}

	kanaFilter(kana, CHAR, romaPattern){
		if(kana.length >= 2 && romaPattern.length){

			const IS_SOKUON_YOUON = kana[0] != 'っ' && (romaPattern[0][0] == 'x' || romaPattern[0][0] == 'l') || kana[0] == 'っ' && (CHAR == 'u' || romaPattern[0][0] == CHAR)

			if(IS_SOKUON_YOUON){
				this.updateSokuonYoon()
			}

		}
	}

	// xnで「ん」を打鍵する場合、次の文字から[nn, n']の打鍵パターンを除外する
	nextNNFilter(CHAR){
		const NEXT_TO_NEXT_CHAR = typeArea.value.romaWord[0]
		const isXN = ( CHAR == 'x' && NEXT_TO_NEXT_CHAR && (NEXT_TO_NEXT_CHAR[0] != 'n' && NEXT_TO_NEXT_CHAR[0] != 'N') )
	
		if(isXN){
			line.typePattern[0]['r'] = line.typePattern[0]['r'].filter(function(value) { return value.match(/^(?!(n|')).*$/)})
		}
	}

	wordUpdate(chank){

		//一チャンク打ち終わったら加点
		let kana = typeArea.value.nextChar['k'];
		let romaPattern = typeArea.value.nextChar['r'];
		const POINT = typeArea.value.nextChar['point'];

		if(chank){
			typeArea.value.kanaInputed += kana;
			//スコア加算
			status.value.point.type += POINT;
			typeArea.value.nextChar = this.add();
		}

		typeArea.value.romaInputed += this.char['key'][0];
	}

	add(){

		if(line.typePattern.length){
			const NEXT_CHAR = line.typePattern.shift(1)
			NEXT_CHAR['point'] = 10 * NEXT_CHAR['r'][0].length
			typeArea.value.kanaWord.shift(1)
			typeArea.value.romaWord.shift(1)
			return NEXT_CHAR;
		}else{
			return {'k':'','r':[],'point':0};
		}

	}

	updateSokuonYoon(){
		typeArea.value.kanaInputed += typeArea.value.nextChar['k'].slice( 0, 1 )
		typeArea.value.nextChar['k'] = typeArea.value.nextChar['k'].slice(1)
	}




}


class Judge extends KeyCalc {

	constructor(){
		super()
	}

	keyJudge(event){

		const IS_SUCCESS = this.hasRomaPattern()

		if(IS_SUCCESS){ //正答
			this.success()
		}else { //ミス

		}

    }

	success(){
		const NEXT_CHAR = typeArea.value.nextChar

		if(!NEXT_CHAR['r'].length){
			this.wordUpdate('chank')
		}else{
			this.wordUpdate()
		}

		const NEXT_POINT = typeArea.value.nextChar['point']

		if(NEXT_POINT == 0){
			Type.completed()
		}

		Type.add()

		const KANA_MODE = game.inputMode != 'roma'
		
		this.char.key = this.char.key[0]
		lineResult.value.typingResult.push({char:this.char, result:true, time:timer.currentTime, kanaMode:KANA_MODE});

	}

}

const CODES = ["Space","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","IntlYen","BracketLeft","BracketRight","Semicolon","Quote","Backslash","Backquote","IntlBackslash","Comma","Period","Slash","IntlRo"]
const TENKEYS = ["Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","Numpad0","NumpadDivide","NumpadMultiply","NumpadSubtract","NumpadAdd","NumpadDecimal"]

export class Typing extends Judge {

	constructor(){
		super()

		if(typing.value){
			typing.value.removeEvent()
		}

		this.addEvent()
	}

	isTyped(event){
		const KEY_CODE = event.keyCode
		const CODE = event.code
		const KEY = event.key

		// isTyped
		const TYPE = (KEY_CODE >= 65 && KEY_CODE <= 90) || CODES.includes(CODE) || TENKEYS.includes(CODE) 

		//event.keyが"Process"になるブラウザの不具合が昔はあったので場合によっては追加する
		//ChatGPT「'Process' キーは通常、国際的なキーボードで入力方法やプロセスのキーを指すために使用されます。」
		return TYPE
	}

    handleKeyDown(event){

		const IS_TYPED = this.isTyped(event)
		const HAS_FOCUS = document.activeElement.type != "text"

		let kana = typeArea.value.nextChar['k']

        if(HAS_FOCUS && IS_TYPED && kana){

			this.char = this.makeInput(event)
			this.keyJudge(event)

			const IS_COPY = event.ctrlKey && event.code == "KeyC"
            if(event.type == "keydown" && !IS_COPY){
                event.preventDefault()
            }

        }else if(HAS_FOCUS && event.type == "keydown"){
            typingShortcut.shortcuts(event);
        }

    }

    makeInput(event){
		const Input = {
			key:[(event.key).toLowerCase()],
			shift:event.shiftKey
		}

		return Input;
    }

}

export const typing = ref('')

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