import { youtube, playSpeed, speed } from '@/templates/assets/JS/youtubeRef.js'


export class SpeedChange {
	static speedList = [0.25,0.50,0.75,1.00,1.25,1.50,1.75,2.00]

	static realtimeChange() {

		if(playSpeed.value == 2){return}

		const SPEED_CHANGE_LIST = SpeedChange.speedList.filter(function(x){return x >= playSpeed.value});

		if(speed.value < 2){

			for(let i=0;i<SPEED_CHANGE_LIST.length;i++){

				if(SPEED_CHANGE_LIST[i] > speed.value){
					speed.value = SPEED_CHANGE_LIST[i]
					break;
				}

			}

		}else{
			speed.value = playSpeed.value;
		}

		youtube.value.setPlaybackRate(speed.value);
		//movieSpeedController.updateTimeAdjust(this.speed)
	}
}