import { ref } from 'vue';

//Tabデータ
export const tabRef = ref(null);
export const changeTab = (tabName) => {
    tabRef.value.selectTab(`#${tabName}`);
  };

//タイム補正データ
export const timeDiff = ref(0)

//YouTube API
export const youtube = ref('')

//ボリューム
export const volume = ref(50)

//動画スピード
export const speed = ref(1)









//ラインデータ
/*{ time: 0, lyrics: '', word: '' }*/
export const lineData = ref([]);