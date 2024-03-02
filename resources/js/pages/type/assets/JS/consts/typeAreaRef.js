import { ref } from 'vue';

export class TypeArea {
	constructor(){
		//Top
		this.combo = ref(0)
		this.notify = ref(`<font-awesome-icon icon="pause" />`)
		this.lineTypeSpeed = ref(0)
		this.lineRemainTime = ref(0)
		this.lineTimeBar = ref(0)
		this.lineTimeBarMax = ref(100)

		//Center
		this.mainInput = ref(' ')
		this.mainNextChar = ref('')
		this.mainWord = ref([])
		this.subInput = ref(' ')
		this.subNextChar = ref('')
		this.subWord = ref([])
		this.countDown = ref('')
		this.lyrics = ref('')
		this.nextLyrics = ref('')
		this.nextTypeSpeed = ref(' ')

		//Bottom
		this.skip = ref('')
		this.currentTime = ref(0)
		this.durationTime = ref('00:00')
		this.currentTimeBar = ref(0)
		this.currentTimeBarMax = ref(100)

	}
}

export let typeArea = new TypeArea()