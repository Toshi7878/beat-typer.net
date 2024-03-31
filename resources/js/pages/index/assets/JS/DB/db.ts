import { convertMode } from '@/pages/type/assets/JS/consts/refs.js';
import { volume } from '@/templates/assets/JS/youtubeRef.js'

import Dexie from 'dexie';

export const db = new Dexie('DataBase');

db.version(1).stores({
	options: 'key, value', // Primary key and indexed props
});


class Load {

	constructor() {
		this.options()
	}

	async options() {
		let data = await db.table("options").toArray()

		for (let i = 0; i < data.length; i++) {
			const OPTIONS = document.getElementsByName(data[i].key)

			if (!OPTIONS) { continue }

			if (OPTIONS[0].type == 'radio') {
				OPTIONS[data[i].value].checked = true;
				convertMode.value = OPTIONS[data[i].value].value
			} else if (OPTIONS[0].type == 'range') {
				volume.value = data[i].value
			} else if (OPTIONS[0].type == 'number') {
				OPTIONS[0].value = data[i].value
			}
		}

	}

}

new Load()

class Option {

	extract(target) {

		if (target.type === 'checkbox') {

			return { key: target.name, value: target.checked };
		} else if (target.type === 'radio') {

			const OPTIONS = document.getElementsByName(target.name)

			for (let i = 0; i < OPTIONS.length; i++) {

				if (OPTIONS[i].checked) {
					return { key: target.name, value: i };
				}

			}

		} else if (target.type === 'number' || target.type === 'range') {
			return { key: target.name, value: target.value };
		} else if (target.tagName === 'SELECT') {
			return { key: target.name, value: target.selectedIndex };
		}
	}
}

export let option = new Option()