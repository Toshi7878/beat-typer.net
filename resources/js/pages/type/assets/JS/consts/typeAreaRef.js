import { ref } from 'vue';

export class TypeArea {
	constructor(){
		//Top
		this.combo = ref(0)
		this.notify = ref(``)
		this.lineTypeSpeed = ref(0)
		this.lineRemainTime = ref(0)
		this.lineTimeBar = ref(0)
		this.lineTimeBarMax = ref(100)

		//Center
		this.kanaInputed = ref('')
		this.kanaWord = ref([])
		this.romaInputed = ref('')
		this.nextChar = ref({'k':'','r':[]})
		this.romaWord = ref([])
		this.countDown = ref('')
		this.lyrics = ref('')
		this.nextLyrics = ref('')
		this.nextTypeSpeed = ref('')

		//Bottom
		this.skip = ref('')
		this.currentTime = ref(0)
		this.durationTime = ref(0)
		this.currentTimeBar = ref(0)
	}
}

export const typeArea = ref(new TypeArea())