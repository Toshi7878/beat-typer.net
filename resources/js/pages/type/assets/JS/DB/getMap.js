import { map } from '@/pages/type/assets/JS/consts/refs.js';
import { Map } from '@/pages/type/assets/JS/components/createTypeWord.js';
import { ShortcutHandler } from '@/pages/type/assets/JS/components/KeyDown/shortcutKey.js';

const ID = window.mapId;

// Fetch data from the server
fetch(`/map/get/${ID}`, {
method: 'GET', // Specify the HTTP method
headers: {
	'Content-Type': 'application/json',
	'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value, // CSRF token
},
})
.then(response => response.text())
.then(data  => {
	// Process the returned data from the server
	map.value = new Map(JSON.parse(data));

	//Enterキーで開始ショートカットキー
	window.addEventListener('keydown', ShortcutHandler.start);
})
.catch(error => {
	// Handle errors and log to the console
	console.log({ error });
});