import { lineData, NUMBER, TIME, lyricsBox, changeTab, undoSet, redoSet } from '@/pages/edit/assets/JS/consts/refs.js';
import { youtube, playSpeed } from '@/templates/assets/JS/youtubeRef.js'
import { LineBlur } from '@/pages/edit/assets/JS/components/selectBlur.js';
import { setLyrics } from '@/pages/edit/assets/JS/components/lyricsBox.js';
import { ytState } from '@/pages/edit/assets/JS/components/ytState.js';
import { tableScroll } from '@/pages/edit/assets/JS/components/scroll.js';

class WordReplace {

	getKanaSearchLength(searchReg){
		let lyricsKana = ""
	
		for(let i=0,len=lineData.value.length; i<len; i++){
			lyricsKana += lineData.value[i]['word']
		}
	
		const Result = lyricsKana.match(searchReg)
	
		return Result ? Result.length:0;
	}

	replaceFoundFocus(i, search) {

		return new Promise(resolve => {
		  setTimeout(() => {
			// 指定された行にスクロール
			tableScroll(i-2,'instant');

			let range = document.createRange();
			
			// 取得した要素の内側を範囲とする
			const WORD_NODE = document.getElementsByClassName('line')[i].children[3].firstElementChild;
			const textMatch = WORD_NODE.textContent.match(new RegExp(search));
	  
			if (textMatch) {
			  range.selectNodeContents(WORD_NODE);
	  
			  // 範囲を選択状態にする
			  range.setStart(WORD_NODE.firstChild, textMatch.index);
			  range.setEnd(WORD_NODE.firstChild, textMatch.index + textMatch[0].length);
	  
			  // 選択範囲をクリアして新しい範囲を追加
			  window.getSelection().removeAllRanges();
			  window.getSelection().addRange(range);
	  
			  resolve(1);
			} else {
			  console.error('検索語が見つかりませんでした。');
			  resolve(0);
			}
		  }, 50);
		});
	  }

	replaceDialog(i,searchReg,replace,matchLength){
		return new Promise(resolve => {
			setTimeout(() => {
				if(confirm(`残り${matchLength}件\n${lineData.value[i]['word']}\n置き換えますか？`)){
					let n = 0
					lineData.value[i]['word'] = lineData.value[i]['word'].replace(searchReg,function(match){ if(++n==1) return replace; else return match; })
				}
				resolve(1)
			}, 50)
		})
	}

	escapeRegExp(string) {
		return string ? string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') : null;
	}

}

class KeyHandler extends WordReplace {

	constructor(){
		super()
	}

	undo(){

		const LAST = undoSet[undoSet.length-1]

		if(LAST.state == 'add'){
			lineData.value.splice(LAST.number, 1);
			lyricsBox.value = `${LAST.value.lyrics}\n${lyricsBox.value}`
			undoSet.pop()
			youtube.value.seekTo(LAST.value.time-3)
			setLyrics()
		}
	}

	lineSeek(num){
		const seekLine = document.getElementsByClassName("line")[NUMBER.value + num]
		seekLine.children[1].click()

		const scLine = NUMBER.value + (num-3)

		tableScroll(scLine, 'smooth')
	}

	async wordSearchReplace(){

		const search = this.escapeRegExp(prompt("置き換えしたい読みを入力してください。"))
	
		if(!search){return;}
	
		let matchLength = this.getKanaSearchLength(new RegExp(search,"g"))
		const replace = prompt("置き換えする文字を入力してください。")
		const searchReg = new RegExp(`${replace ? `(?!${replace})` : ""}${search}`,"g");
	
		if(search && replace.match(search)){
			alert("sorry...置き換えする文字に検索する文字が含まないようにしてください。")
			return;
		}
	
		for(let i=0,len=lineData.value.length; i<len; i++){
	
			const match = lineData.value[i]['word'].match(searchReg)
			if(!match){continue;}
			let replacedWord = lineData.value[i]['word']
			let replacedLength = 0
	
	
			for(let j=1;j<match.length+1;j++){
				await this.replaceFoundFocus(i,search)
				await this.replaceDialog(i,searchReg,replace,matchLength)
				replacedWord = replacedWord.replace(search,"")
				replacedLength += search.length
				matchLength--
			}
	
		}
	
	}
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
					youtube.value.seekTo(+TIME.value - (3 * playSpeed.value))
					event.preventDefault();
					break
				case "ArrowRight" :
					youtube.value.seekTo(+TIME.value + (3 * playSpeed.value))
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


