import { lineData } from '@/pages/type/assets/JS/consts/refs.js';
import { MapData } from '@/pages/type/assets/JS/components/createTypeWord.js';


class Map {
	constructor() {
	  this.get();
	}
  
	get() {
	//ユーザーもコンソールから叩けば取得可能になっているが、あとでどうにかする。
	  // Retrieve mapId from the window object
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
		  lineData.value = new MapData(JSON.parse(data));

		})
		.catch(error => {
		  // Handle errors and log to the console
		  console.log({ error });
		});
	}
  }
  
  // Create an instance of the Map class
  new Map();