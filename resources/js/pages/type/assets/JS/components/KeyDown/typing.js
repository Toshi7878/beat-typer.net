import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { timer, line } from '@/pages/type/assets/JS/components/timer.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import _ from 'lodash';
import { ref } from 'vue';
import { game } from '@/pages/type/assets/JS/consts/gameRef.js';
import { typingShortcut } from '@/pages/type/assets/JS/components/KeyDown/shortcutKey.js';

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

class KeyJudge extends Event {

	constructor(){
		super()
	}

	hasRomaPattern(){
		let romaPattern = typeArea.nextChar.value['r']

		const IS_SUCCESS = _.some(romaPattern, pattern => pattern[0] === this.char['keys'][0]);

		if(!IS_SUCCESS){
			return false;
		}


		//先頭の文字(現在入力してるモノ)を削除
		for (let i=0; i<romaPattern.length; i++){

				if(this.char['keys'][0] == romaPattern[i][0]){
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
		return true;
	}

	wordUpdate(chank){

		//一チャンク打ち終わったら加点
		let kana = typeArea.nextChar.value['k'];
		let romaPattern = typeArea.nextChar.value['r'];
		const POINT = typeArea.nextChar.value['point'];

		if(chank){
			typeArea.kanaInputed.value += kana;
			//スコア加算
			status.point.value += POINT;
			typeArea.nextChar.value = this.add();
		}

		typeArea.romaInputed.value += this.char['keys'][0];

	}

	add(){
		if(line.typePattern.length){
			const NEXT_CHAR = line.typePattern.shift(1)
			NEXT_CHAR['point'] = 10 * NEXT_CHAR['r'][0].length
			typeArea.kanaWord.value.shift(1)
			typeArea.romaWord.value.shift(1)
			return NEXT_CHAR;
		}else{
			return {'k':'','r':[],'point':0};
		}
	}

	romaDistinguish(){
		typeArea.kanaInputed.value += typeArea.nextChar.value['k'].slice( 0, 1 )
		typeArea.nextChar.value['k'] = typeArea.nextChar.value['k'].slice(1)
	}



	keyJudge(event){

		const IS_SUCCESS = this.hasRomaPattern()

		if(IS_SUCCESS){


			const NEXT_CHAR = typeArea.nextChar.value
			if(!NEXT_CHAR['r'].length){
				this.wordUpdate('chank')
			}else{
				this.wordUpdate()
			}
		}

    }
}


const CODES = ["Space","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","IntlYen","BracketLeft","BracketRight","Semicolon","Quote","Backslash","Backquote","IntlBackslash","Comma","Period","Slash","IntlRo"]
const TENKEYS = ["Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","Numpad0","NumpadDivide","NumpadMultiply","NumpadSubtract","NumpadAdd","NumpadDecimal"]

export class Typing extends KeyJudge {

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

		let kana = typeArea.nextChar.value['k']

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
			keys:[(event.key).toLowerCase()],
			code:event.code,
			Shift:event.shiftKey
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