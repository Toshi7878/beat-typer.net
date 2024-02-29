import { ref } from 'vue';

//Tabデータ
export const tabRef = ref(null);
export const changeTab = (tabName) => {
    tabRef.value.selectTab(`#${tabName}`);
  };

//musicInfo
export const URL = ref("")
export const TITLE = ref("")
export const COMMENT = ref("")


//ラインセレクトデータ
export const NUMBER = ref("")
export const TIME = ref("")
export const LYRIC = ref("")
export const WORD = ref("")


//追加時タイム補正データ
export const timeDiff = ref(-0.15)

//YouTube API
export const youtube = ref('')

//ボリューム
export const volume = ref(50)

//動画スピード
export const speed = ref(1)
//タイムプログレスバー タイム値
export const TIME_BAR_VAL = ref('')

//歌詞一括挿入ボックス
export const lyricsBox = ref('')

//よみ変換モード
export const convertMode = ref('')

//undoやり直し redo繰り返し
export const undoSet = [] // Ctrl+Z
export const redoSet = [] // Ctrl+Y

//ラインデータ
/*{ time: 0, lyrics: '', word: '' }*/
export const lineData = ref([]);