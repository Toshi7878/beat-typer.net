import { typeArea } from '@/pages/type/assets/JS/consts/typeAreaRef.js';
import { status } from '@/pages/type/assets/JS/consts/statusRef.js';
import { Result, result } from '@/pages/type/assets/JS/consts/resultRef.js';
import { timer } from '@/pages/type/assets/JS/components/timer.js';
import { speed } from '@/templates/assets/JS/youtubeRef.js'
import _ from 'lodash';

const ZENKAKU_LIST = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９", "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", "ａ", "ｂ", "ｃ", "ｄ", "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ", "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ", "ｙ", "ｚ", "～", "＆", "％", "！", "？", "＠", "＃", "＄", "（", "）", "｜", "｛", "｝", "｀", "＊", "＋", "：", "；", "＿", "＜", "＞", "＝", "＾"]
const NN_LIST = ["あ", "い", "う", "え", "お", "な", "に", "ぬ", "ね", "の", "や", "ゆ", "よ", "ん", "'", "’","a","i","u","e","o","y","n"]
const SOKUON_JOIN_LIST = ["ヰ", "ゐ", "ヱ", "ゑ","ぁ", "ぃ", "ぅ", "ぇ", "ぉ","ゃ","ゅ","ょ","っ", "ゎ", "ヵ", "ヶ", "ゔ", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"]
const SYMBOL_LIST = [",",".","/","\"","'","[","]","z[","z]","!","?","^","|","(",")","`",":",";","<",">","_","~","{","}"," ","#","$","%","&","=","*","+","@","\\"]

class ParseLyrics{


	joinLyrics(){

		let	lyrics = ""

		for (let li=0; li<this.data.length; li++){
			let line = this.data[li];

			lyrics += line['word'].replace(/[ 　]+$/,"").replace(/^[ 　]+/,"")+"\n"

			if(line['lyrics'] == "end") {
				break;
			}
		};

		lyrics = lyrics
			.replace(/…/g,"...")
			.replace(/‥/g,"..")
			.replace(/･/g,"・")
			.replace(/〜/g,"～")
			.replace(/｢/g,"「")
			.replace(/｣/g,"」")
			.replace(/､/g,"、")
			.replace(/｡/g,"。")
			.replace(/　/g," ")
			.replace(/ {2,}/g," ")
			.replace(/ヴ/g,"ゔ")
			.replace(/－/g,"ー")

		return lyrics
	}


	createWord(lyrics){
		const ROMA_MAP_LEN = ROMA_MAP.length

		for (let i=0; i<ROMA_MAP_LEN; i++){
				lyrics = lyrics.replace(RegExp(ROMA_MAP[i]['k'],"g"),"\t"+i+"\t");
		};

		lyrics = lyrics.split("\n");

		for(let i=0;i<this.data.length;i++){

			if(lyrics[i] && this.data[i]['lyrics'] != "end"){
				const arr = this.hiraganaToRomaArray(lyrics[i]);
				this.typePattern.push(arr);
			} else {
				this.typePattern.push([])
			}

		}
	}


	hiraganaToRomaArray(str){
		this.lineWord = []

		str = str.split("\t").filter(word => word > "")
		const STR_LEN = str.length

		for (let i=0; i<STR_LEN; i++){

			const CHAR = _.cloneDeep(ROMA_MAP[parseInt(str[i])]);

			if(CHAR){
				this.lineWord.push(CHAR)

				//促音の打鍵パターン
				if(this.lineWord.length >= 2){
					const PREVIOUS_KANA = this.lineWord[this.lineWord.length-2]['k']

					if(PREVIOUS_KANA[PREVIOUS_KANA.length-1] == "っ"){
						const KANA = this.lineWord[this.lineWord.length-1]['k'][0]

						if(SOKUON_JOIN_LIST.includes(KANA)){
							this.joinSokuonPattern()
						}else if(["い", "う", "ん"].includes(KANA)){
							this.joinSokuonPattern('iunFlag')
						}
	
					}
				}
	

				//n→nn変換
				this.nConvert_nn()

				//記号の種類をカウント
				this.symbolCounter()

			} else{

				//打鍵パターン生成を行わなくて良い文字はそのままthis.typingArrayに追加
				for (let v=0; v<str[i].length; v++){
                    let char = str[i][v]

					//全角→半角に変換(英数字記号)
                    if(ZENKAKU_LIST.includes(str[i][v])){
                        char = String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
                    }

					//追加
                    this.lineWord.push({'k':char,'r':[char]});

					//n→nn変換
					if(v == 0){
						this.nConvert_nn()
					}

					this.symbolCounter()
				}
			}

		};

		//this.kanaArray最後の文字が「ん」だった場合も[nn]に置き換えます。
		if(this.lineWord[this.lineWord.length-1]['k'] == "ん"){
			this.lineWord[this.lineWord.length-1]['r'][0] = 'nn'
			this.lineWord[this.lineWord.length-1]['r'].push("n'")
		}

		return this.lineWord;

	}

	//'っ','か' → 'っか'等の繋げられる促音をつなげる
	joinSokuonPattern(iunFlag){
		const PREVIOUS_KANA = this.lineWord[this.lineWord.length-2]['k']
		const KANA = this.lineWord[this.lineWord.length-1]['k']

		this.lineWord[this.lineWord.length-1]['k'] = PREVIOUS_KANA + KANA
		this.lineWord.splice(-2,1)

		let repeat = []
		let xtu = []
		let ltu = []
		let xtsu = []
		let ltsu = []

		const XTU_LEN = ( PREVIOUS_KANA.match( /っ/g ) || [] ).length
		const ROMA_LEN = this.lineWord[this.lineWord.length-1]['r'].length
		//変数に値渡し？して処理する方がわかりやすい(後でリファクタリング)
		for(let i=0;i<ROMA_LEN;i++){

			if(!iunFlag || !["i","u","n"].includes(this.lineWord[this.lineWord.length-1]['r'][i][0])){
				repeat.push(this.lineWord[this.lineWord.length-1]['r'][i][0].repeat(XTU_LEN)+this.lineWord[this.lineWord.length-1]['r'][i])
			}

			xtu.push("x".repeat(XTU_LEN)+"tu"+this.lineWord[this.lineWord.length-1]['r'][i])
			ltu.push("l".repeat(XTU_LEN)+"tu"+this.lineWord[this.lineWord.length-1]['r'][i])
			xtsu.push("x".repeat(XTU_LEN)+"tsu"+this.lineWord[this.lineWord.length-1]['r'][i])
			ltsu.push("l".repeat(XTU_LEN)+"tsu"+this.lineWord[this.lineWord.length-1]['r'][i])
		}

		this.lineWord[this.lineWord.length-1]['r'] = [...repeat,...xtu,...ltu,...xtsu,...ltsu]
	}

	nConvert_nn(){
		//n→nn変換
		const PREVIOUS_KANA = this.lineWord.length >= 2 ? this.lineWord[this.lineWord.length-2]['k'] : false

		if(PREVIOUS_KANA && PREVIOUS_KANA[PREVIOUS_KANA.length-1] == "ん"){

			if(NN_LIST.includes(this.lineWord[this.lineWord.length-1]['k'])){

				for(let i=0;i<this.lineWord[this.lineWord.length-2]['r'].length;i++){

					const ROMA_PATTERN = this.lineWord[this.lineWord.length-2]['r'][i]
					const IS_N = (ROMA_PATTERN.length >= 2 && ROMA_PATTERN[ROMA_PATTERN.length-2] != "x" && ROMA_PATTERN[ROMA_PATTERN.length-1] == "n") || ROMA_PATTERN=="n"
			
					if(IS_N){
						this.lineWord[this.lineWord.length-2]['r'][i] = this.lineWord[this.lineWord.length-2]['r'][i]+"n"
						this.lineWord[this.lineWord.length-2]['r'].push("n'")
					}

				}

			//それ以外の文字でもnnの入力を可能にする
			}else if(this.lineWord[this.lineWord.length-1]['k']){

				const ROMA_PATTERN_LEN = this.lineWord[this.lineWord.length-1]['r'].length

				for (let i=0; i<ROMA_PATTERN_LEN; i++){
					this.lineWord[this.lineWord.length-1]['r'].push("n"+this.lineWord[this.lineWord.length-1]['r'][i])
					this.lineWord[this.lineWord.length-1]['r'].push("'"+this.lineWord[this.lineWord.length-1]['r'][i])
				}

			}

		}
	}


	symbolCounter(){
		const symbolEncount = SYMBOL_LIST.indexOf(this.lineWord[this.lineWord.length-1]['r'][0])

		if(symbolEncount > -1){

			if(this.symbolCount[this.lineWord[this.lineWord.length-1]['k']]){
				this.symbolCount[this.lineWord[this.lineWord.length-1]['k']]++
			}else{
				this.symbolCount[this.lineWord[this.lineWord.length-1]['k']] = 1
			}

		}

	}

}

export class Map extends ParseLyrics{

	constructor(data){
		super(data)
		this.typePattern = []
		this.lineWords = []
		this.data = data
		this.style = ''
		this.scoreParChar = 0
		this.missPenalty = 0
		
		this.startLine = 0

		//count
		this.lineLength = 0
		this.romaTotalNotes = 0
		this.kanaTotalNotes = 0
		this.romaLineNotesList = []
		this.kanaLineNotesList = []
		this.symbolCount = {};

		//typeSpeed
		this.romaMedianSpeed = 0
		this.kanaMedianSpeed = 0
		this.romaMaxSpeed = 0
		this.kanaMaxSpeed = 0
		this.romaLineSpeedList = []
		this.kanaLineSpeedList = []

		//totalTime
		this.movieTotalTime = 0
		this.movieTimeMM = 0
		this.movieTimeSS = 0

		//movieSpeedController = new MovieSpeedController()
		//movieSpeedController.addEvent()

        this.createWord(this.joinLyrics())
        this.getScorePerChar()
	}

	addRules(){
		const speed_ = window.title.match(/【\d?\.?\d?\d倍速】/)
		const caseSensitiveMode = window.title.match(/【英語大文字?.*】/)

		//動画スピード固定
		if(speed_){
			movieSpeedController.fixedSpeed = parseFloat(speed_[0].slice(1))

			if(!speedList.includes(movieSpeedController.fixedSpeed)){
				movieSpeedController.fixedSpeed = false
			}
		}

		//大文字あり固定
		if(caseSensitiveMode){
			document.getElementsByName("case-sensitive-mode")[0].checked = true;
			document.getElementsByName("case-sensitive-mode")[0].disabled = true;
		}

		//適用するCSSテーマ
		this.style = this.data[0]['lyrics'].match(/<style(?: .+?)?>.*?<\/style>/g)
	}

	setTotalTime(endTime){
		const TIME = endTime/speed.value;
		typeArea.value.durationTime = TIME;
		timer.currentTimeBarFrequency = TIME/1700 //1700 = 更新頻度の閾値
	}

	getScorePerChar(){
		const LINE_LEN = this.data.length

		for (let i=0; i<LINE_LEN; i++){
			let romaLineNotes = 0
			let kanaLineNotes = 0
			let dakuHandakuLineNotes = 0
			let lineSpeed = 0

			//ワード結合
			let kanaWord = []
			let romaWord = []

			if(this.data[i]['lyrics']!='end' && this.typePattern[i].length){

				if(this.startLine == 0){
					this.startLine = i+1
				}

				this.lineLength++;
				lineSpeed = this.data[i+1]['time']-this.data[i]['time']

				kanaWord = _.map(this.typePattern[i], 'k');
				romaWord = _.map(this.typePattern[i], obj => _.get(obj, 'r[0]'));

				//かな入力
				dakuHandakuLineNotes = (kanaWord.join("").match( /[ゔ|が|ぎ|ぐ|げ|ご|ざ|じ|ず|ぜ|ぞ|だ|ぢ|づ|で|ど|ば|び|ぶ|べ|ぼ|ぱ|ぴ|ぷ|ぺ|ぽ]/g ) || [] ).length
				kanaLineNotes = kanaWord.join("").length
				this.kanaTotalNotes += (kanaLineNotes+dakuHandakuLineNotes)

				//ローマ字入力
				romaLineNotes = romaWord.join('').length
				this.romaTotalNotes += romaLineNotes

			}else if(this.data[i]['lyrics'] == 'end'){

				this.romaMedianSpeed = this.median(this.romaLineSpeedList);
				this.kanaMedianSpeed = this.median(this.kanaLineSpeedList);
				this.romaMaxSpeed = Math.max(...this.romaLineSpeedList);
				this.kanaMaxSpeed = Math.max(...this.kanaLineSpeedList);

				this.scoreParChar = 100 / (this.romaTotalNotes)
				this.missPenalty = this.scoreParChar/4
				this.movieTotalTime = this.data[i].time
				this.setTotalTime(this.movieTotalTime)

				status.value.lineCount = this.lineLength
				result.value = new Result(LINE_LEN);
				// if(movieSpeedController.fixedSpeed){
				// 	movieSpeedController.speed = movieSpeedController.fixedSpeed
				// 	movieSpeedController.playSpeed = movieSpeedController.fixedSpeed;
				// }
				break;
			}

			this.kanaLineNotesList.push(kanaLineNotes+dakuHandakuLineNotes)
			this.romaLineNotesList.push(romaLineNotes)
			this.romaLineSpeedList.push(lineSpeed > 0 ? Math.round((romaLineNotes/lineSpeed) * 100) / 100 : 0)
			this.kanaLineSpeedList.push(lineSpeed > 0 ? Math.round(((kanaLineNotes+dakuHandakuLineNotes)/lineSpeed) * 100) / 100 : 0)
			this.lineWords.push({'k':kanaWord,'r':romaWord})

		};

		return;
	}

	median(arr) {
		arr = arr.filter(function(a) {return a !== 0;})
		var half = (arr.length/2)|0;
		var temp = arr.sort((a, b) => a - b);

		if (temp.length%2) {
			return temp[half];
		}

		return (temp[half-1] + temp[half])/2;
	};

}

const ROMA_MAP = [
	{"k": "0","r": ["0"]},
	{"k": "1","r": ["1"]},
	{"k": "2","r": ["2"]},
	{"k": "3","r": ["3"]},
	{"k": "4","r": ["4"]},
	{"k": "5","r": ["5"]},
	{"k": "6","r": ["6"]},
	{"k": "7","r": ["7"]},
	{"k": "8","r": ["8"]},
	{"k": "9","r": ["9"]},
	{"k": "ぎゃ","r": ["gya","gilya","gixya"]},
	{"k": "ぎぃ","r": ["gyi","gili","gixi","gilyi","gixyi"]},
	{"k": "ぎゅ","r": ["gyu","gilyu","gixyu"]},
	{"k": "ぎぇ","r": ["gye","gile","gixe","gilye","gixye"]},
	{"k": "ぎょ","r": ["gyo","gilyo","gixyo"]},
	{"k": "きゃ","r": ["kya","kilya","kixya"]},
	{"k": "きぃ","r": ["kyi","kili","kixi","kilyi","kixyi"]},
	{"k": "きゅ","r": ["kyu","kilyu","kixyu"]},
	{"k": "きぇ","r": ["kye","kile","kixe","kilye","kixye"]},
	{"k": "きょ","r": ["kyo","kilyo","kixyo"]},
	{"k": "ぐぁ","r": ["gwa","gula","guxa"]},
	{"k": "ぐぃ","r": ["gwi","guli","guxi","gulyi","guxyi"]},
	{"k": "ぐぅ","r": ["gwu","gulu","guxu"]},
	{"k": "ぐぇ","r": ["gwe","gule","guxe","gulye","guxye"]},
	{"k": "ぐぉ","r": ["gwo","gulo","guxo"]},
	{"k": "しゃ","r": ["sya","sha","silya","sixya","shilya","shixya","cilya","cixya"]},
	{"k": "しぃ","r": ["syi","sili","sixi","silyi","shixyi","shili","shixi","shilyi","shixyi","cili","cixi","cilyi","cixyi"]},
	{"k": "しゅ","r": ["syu","shu","silyu","sixyu","shilyu","shixyu","cilyu","cixyu"]},
	{"k": "しぇ","r": ["sye","she","sile","sixe","silye","sixye","shile","shixe","shilye","shixye","cile","cixe","cilye","cixye"]},
	{"k": "しょ","r": ["syo","sho","silyo","sixyo","shilyo","shixyo","cilyo","cixyo"]},
	{"k": "じゃ","r": ["ja","zya","jya","jilya","jixya","zilya","zixya"]},
	{"k": "じぃ","r": ["zyi","jyi","jili","jixi","jilyi","jixyi","zili","zixi","zilyi","zixyi"]},
	{"k": "じゅ","r": ["ju","zyu","jyu","jilyu","jixyu","zilyu","zixyu"]},
	{"k": "じぇ","r": ["je","zye","jye","jile","jixe","jilye","jixye","zile","zixe","zilye","zixye"]},
	{"k": "じょ","r": ["jo","zyo","jyo","jilyo","jixyo","zilyo","zixyo"]},
	{"k": "すぁ","r": ["swa","sula","suxa"]},
	{"k": "すぃ","r": ["swi","suli","suxi","sulyi","suxyi"]},
	{"k": "すぅ","r": ["swu","sulu","suxu"]},
	{"k": "すぇ","r": ["swe","sule","suxe","sulye","suxye"]},
	{"k": "すぉ","r": ["swo","sulo","suxo"]},
	{"k": "ちゃ","r": ["tya","cya","cha","tilya","tixya","chilya","chixya"]},
	{"k": "ちぃ","r": ["tyi","cyi","tili","tixi","tilyi","tixyi","chili","chixi","chilyi","chixyi"]},
	{"k": "ちゅ","r": ["tyu","cyu","chu","tilyu","tixyu","chilyu","chixyu"]},
	{"k": "ちぇ","r": ["tye","cye","che","tile","tixe","tilye","tixye","chile","chixe","chilye","chixye"]},
	{"k": "ちょ","r": ["tyo","cyo","cho","tilyo","tixyo","chilyo","chixyo"]},
	{"k": "ぢゃ","r": ["dya","dilya","dixya"]},
	{"k": "ぢぃ","r": ["dyi","dili","dixi","dilyi","dixyi"]},
	{"k": "ぢゅ","r": ["dyu","dilyu","dixyu"]},
	{"k": "ぢぇ","r": ["dye","dile","dixe","dilye","dixye"]},
	{"k": "ぢょ","r": ["dyo","dilyo","dixyo"]},
	{"k": "つぁ","r": ["tsa","tula","tuxa","tsula","tsuxa"]},
	{"k": "つぃ","r": ["tsi","tuli","tuxi","tulyi","tuxyi","tsuli","tsuxi","tsulyi","tsuxyi"]},
	{"k": "つぇ","r": ["tse","tule","tuxe","tulye","tuxye","tsule","tsuxe","tsulye","tsuxye"]},
	{"k": "つぉ","r": ["tso","tulo","tuxo","tsulo","tsuxo"]},
	{"k": "てゃ","r": ["tha","telya","texya"]},
	{"k": "てぃ","r": ["thi","t'i","teli","texi","telyi","texyi"]},
	{"k": "てゅ","r": ["thu","t'yu","telyu","texyu"]},
	{"k": "てぇ","r": ["the","tele","texe","telye","texye"]},
	{"k": "てょ","r": ["tho","telyo","texyo"]},
	{"k": "でゃ","r": ["dha","delya","dexya"]},
	{"k": "でぃ","r": ["dhi","d'i","deli","dexi","delyi","dexyi"]},
	{"k": "でゅ","r": ["dhu","d'yu","delyu","dexyu"]},
	{"k": "でぇ","r": ["dhe","dele","dexe","delye","dexye"]},
	{"k": "でょ","r": ["dho","delyo","dexyo"]},
	{"k": "とぁ","r": ["twa","tola","toxa"]},
	{"k": "とぃ","r": ["twi","toli","toxi","tolyi","toxyi"]},
	{"k": "とぅ","r": ["twu","t'u","tolu","toxu"]},
	{"k": "とぇ","r": ["twe","tole","toxe","tolye","toxye"]},
	{"k": "とぉ","r": ["two","tolo","toxo"]},
	{"k": "どぁ","r": ["dwa","dola","doxa"]},
	{"k": "どぃ","r": ["dwi","doli","doxi","dolyi","doxyi"]},
	{"k": "どぅ","r": ["dwu","d'u","dolu","doxu"]},
	{"k": "どぇ","r": ["dwe","dole","doxe","dolye","doxye"]},
	{"k": "どぉ","r": ["dwo","dolo","doxo"]},
	{"k": "にゃ","r": ["nya","nilya","nixya"]},
	{"k": "にぃ","r": ["nyi","nili","nixi","nilyi","nixyi"]},
	{"k": "にゅ","r": ["nyu","nilyu","nixyu"]},
	{"k": "にぇ","r": ["nye","nile","nixe","nilye","nixye"]},
	{"k": "にょ","r": ["nyo","nilyo","nixyo"]},
	{"k": "ひゃ","r": ["hya","hilya","hixya"]},
	{"k": "ひぃ","r": ["hyi","hili","hixi","hilyi","hixyi"]},
	{"k": "ひゅ","r": ["hyu","hilyu","hixyu"]},
	{"k": "ひぇ","r": ["hye","hile","hixe","hilye","hixye"]},
	{"k": "ひょ","r": ["hyo","hilyo","hixyo"]},
	{"k": "ぴゃ","r": ["pya","pilya","pixya"]},
	{"k": "ぴぃ","r": ["pyi","pili","pixi","pilyi","pixyi"]},
	{"k": "ぴゅ","r": ["pyu","pilyu","pixyu"]},
	{"k": "ぴぇ","r": ["pye","pile","pixe","pilye","pixye"]},
	{"k": "ぴょ","r": ["pyo","pilyo","pixyo"]},
	{"k": "びゃ","r": ["bya","bilya","bixya"]},
	{"k": "びぃ","r": ["byi","bili","bixi","bilyi","bixyi"]},
	{"k": "びゅ","r": ["byu","bilyu","bixyu"]},
	{"k": "びぇ","r": ["bye","bile","bixe","bilye","bixye"]},
	{"k": "びょ","r": ["byo","bilyo","bixyo"]},
	{"k": "ゔぁ","r": ["va","vula","vuxa"]},
	{"k": "ゔぃ","r": ["vi","vyi","vuli","vuxi","vulyi","vuxyi"]},
	{"k": "ゔぇ","r": ["ve","vye","vule","vuxe","vulye","vuxye"]},
	{"k": "ゔぉ","r": ["vo","vulo","vuxo"]},
	{"k": "ゔゃ","r": ["vya","vulya","vuxya"]},
	{"k": "ゔゅ","r": ["vyu","vulyu","vuxyu"]},
	{"k": "ゔょ","r": ["vyo","vulyo","vuxyo"]},
	{"k": "ふぁ","r": ["fa","fwa","hwa","fula","fuxa","hula","huxa"]},
	{"k": "ふぃ","r": ["fi","fwi","hwi","fuli","fuxi","fulyi","fuxyi","huli","huxi","hulyi","huxyi"]},
	{"k": "ふぅ","r": ["fwu","fulu","fuxu","hulu","huxu"]},
	{"k": "ふぇ","r": ["fe","fwe","fye","hwe","fule","fuxe","fulye","fuxye","hule","huxe","hulye","huxye"]},
	{"k": "ふぉ","r": ["fo","fwo","hwo","fulo","fuxo","hulo","huxo"]},
	{"k": "ふゃ","r": ["fya","fulya","fuxya","hulya","huxya"]},
	{"k": "ふゅ","r": ["fyu","hwyu","fulyu","fuxyu","hulyu","huxyu"]},
	{"k": "ふょ","r": ["fyo","fulyo","fuxyo","hulyo","huxyo"]},
	{"k": "みゃ","r": ["mya","milya","mixya"]},
	{"k": "みぃ","r": ["myi","mili","mixi","milyi","mixyi"]},
	{"k": "みゅ","r": ["myu","milyu","mixyu"]},
	{"k": "みぇ","r": ["mye","mile","mixe","milye","mixye"]},
	{"k": "みょ","r": ["myo","milyo","mixyo"]},
	{"k": "りゃ","r": ["rya","rilya","rixya"]},
	{"k": "りぃ","r": ["ryi","rili","rixi","rilyi","rixyi"]},
	{"k": "りゅ","r": ["ryu","rilyu","rixyu"]},
	{"k": "りぇ","r": ["rye","rile","rixe","rilye","rixye"]},
	{"k": "りょ","r": ["ryo","rilyo","rixyo"]},
	{"k": "いぇ","r": ["ye","ile","ixe","ilye","ixye","yile","yixe","yilye","yixye"]},
	{"k": "うぁ","r": ["wha","ula","uxa","wula","wuxa","whula","whuxa"]},
	{"k": "うぃ","r": ["wi","whi","uli","uxi","ulyi","uxyi","wuli","wuxi","wulyi","wuxyi","whuli","whuxi","whulyi","whuxyi"]},
	{"k": "うぇ","r": ["we","whe","ule","uxe","ulye","uxye","wule","wuxe","wulye","wuxye","whule","whuxe","whulye","whuxye"]},
	{"k": "うぉ","r": ["who","ulo","uxo","wulo","wuxo","whulo","whuxo"]},
	{"k": "くぁ","r": ["qa","qwa","kwa","kula","kuxa","qula","quxa","cula","cuxa"]},
	{"k": "くぃ","r": ["qi","qwi","qyi","kwi","kuli","kuxi","kulyi","kuxyi","quli","quxi","qulyi","quxyi","culi","cuxi","culyi","cuxyi"]},
	{"k": "くぅ","r": ["qwu","kwu","kulu","kuxu","qulu","quxu","culu","cuxu"]},
	{"k": "くぇ","r": ["qe","qwe","qye","kwe","kule","kuxe","kulye","kuxye","qule","quxe","qulye","quxye","cule","cuxe","culye","cuxye"]},
	{"k": "くぉ","r": ["qo","qwo","kwo","kulo","kuxo","qulo","quxo","culo","cuxo"]},
	{"k": "くゃ","r": ["qya","kulya","kuxya","qulya","quxya","culya","cuxya"]},
	{"k": "くゅ","r": ["qyu","kulyu","kuxyu","qulyu","quxyu","culyu","cuxyu"]},
	{"k": "くょ","r": ["qyo","kulyo","kuxyo","qulyo","quxyo","culyo","cuxyo"]},
	{"k": "あ","r": ["a"]},
	{"k": "い","r": ["i","yi"]},
	{"k": "う","r": ["u","wu","whu"]},
	{"k": "え","r": ["e"]},
	{"k": "お","r": ["o"]},
	{"k": "か","r": ["ka","ca"]},
	{"k": "き","r": ["ki"]},
	{"k": "く","r": ["ku","cu","qu"]},
	{"k": "け","r": ["ke"]},
	{"k": "こ","r": ["ko","co"]},
	{"k": "さ","r": ["sa"]},
	{"k": "し","r": ["si","ci","shi"]},
	{"k": "す","r": ["su"]},
	{"k": "せ","r": ["se","ce"]},
	{"k": "そ","r": ["so"]},
	{"k": "た","r": ["ta"]},
	{"k": "ち","r": ["ti","chi"]},
	{"k": "つ","r": ["tu","tsu"]},
	{"k": "て","r": ["te"]},
	{"k": "と","r": ["to"]},
	{"k": "な","r": ["na"]},
	{"k": "に","r": ["ni"]},
	{"k": "ぬ","r": ["nu"]},
	{"k": "ね","r": ["ne"]},
	{"k": "の","r": ["no"]},
	{"k": "は","r": ["ha"]},
	{"k": "ひ","r": ["hi"]},
	{"k": "ふ","r": ["hu","fu"]},
	{"k": "へ","r": ["he"]},
	{"k": "ほ","r": ["ho"]},
	{"k": "ま","r": ["ma"]},
	{"k": "み","r": ["mi"]},
	{"k": "む","r": ["mu"]},
	{"k": "め","r": ["me"]},
	{"k": "も","r": ["mo"]},
	{"k": "や","r": ["ya"]},
	{"k": "ゆ","r": ["yu"]},
	{"k": "よ","r": ["yo"]},
	{"k": "ら","r": ["ra"]},
	{"k": "り","r": ["ri"]},
	{"k": "る","r": ["ru"]},
	{"k": "れ","r": ["re"]},
	{"k": "ろ","r": ["ro"]},
	{"k": "わ","r": ["wa"]},
	{"k": "を","r": ["wo"]},
	{"k": "ん","r": ["n","xn"]},
	{"k": "ゔ","r": ["vu"]},
	{"k": "が","r": ["ga"]},
	{"k": "ぎ","r": ["gi"]},
	{"k": "ぐ","r": ["gu"]},
	{"k": "げ","r": ["ge"]},
	{"k": "ご","r": ["go"]},
	{"k": "ざ","r": ["za"]},
	{"k": "じ","r": ["zi","ji"]},
	{"k": "ず","r": ["zu"]},
	{"k": "ぜ","r": ["ze"]},
	{"k": "ぞ","r": ["zo"]},
	{"k": "だ","r": ["da"]},
	{"k": "ぢ","r": ["di"]},
	{"k": "づ","r": ["du"]},
	{"k": "で","r": ["de"]},
	{"k": "ど","r": ["do"]},
	{"k": "ば","r": ["ba"]},
	{"k": "び","r": ["bi"]},
	{"k": "ぶ","r": ["bu"]},
	{"k": "べ","r": ["be"]},
	{"k": "ぼ","r": ["bo"]},
	{"k": "ぱ","r": ["pa"]},
	{"k": "ぴ","r": ["pi"]},
	{"k": "ぷ","r": ["pu"]},
	{"k": "ぺ","r": ["pe"]},
	{"k": "ぽ","r": ["po"]},
	{"k": "ぁ","r": ["xa","la"]},
	{"k": "ぃ","r": ["xi","li","lyi","xyi"]},
	{"k": "ぅ","r": ["xu","lu"]},
	{"k": "ぇ","r": ["xe","le","lye","xye"]},
	{"k": "ぉ","r": ["xo","lo"]},
	{"k": "ゃ","r": ["xya","lya"]},
	{"k": "ゅ","r": ["xyu","lyu"]},
	{"k": "ょ","r": ["xyo","lyo"]},
	{"k": "ゎ","r": ["xwa","lwa"]},
	{"k": "っ","r": ["xtu","ltu","xtsu","ltsu"]},
	{"k": "ヵ","r": ["xka","lka"]},
	{"k": "ヶ","r": ["xke","lke"]},
	{"k": "←","r": ["zh"]},
	{"k": "↓","r": ["zj"]},
	{"k": "↑","r": ["zk"]},
	{"k": "→","r": ["zl"]},
	{"k": "『","r": ["z["]},
	{"k": "』","r": ["z]"]},
	{"k": "ヰ","r": ["wyi"]},
	{"k": "ゐ","r": ["wyi"]},
	{"k": "ヱ","r": ["wye"]},
	{"k": "ゑ","r": ["wye"]},
	{"k": "ー","r": ["-"]},
	{"k": "、","r": [","]},
	{"k": "。","r": ["."]},
	{"k": "・","r": ["/","z/"]},
	{"k": "”","r": ['"']},
	{"k": "“","r": ['"']},
	{"k": "’","r": ["'"]},
	{"k": "￥","r": ["\\"]},
	{"k": "「","r": ["["]},
	{"k": "」","r": ["]"]}
]