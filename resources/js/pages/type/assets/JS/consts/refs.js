import { ref } from 'vue';

//Tabデータ
export const tabRef = ref(null);
export const changeTab = (tabName) => {
    tabRef.value.selectTab(`#${tabName}`);
  };

//タイム補正データ
export const timeDiff = ref(0)


export const map = ref(0);