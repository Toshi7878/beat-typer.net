import { ref } from 'vue';

//Tabデータ
export const tabRef = ref(null);
export const changeTab = (tabName) => {
    tabRef.value.selectTab(`#${tabName}`);
  };
