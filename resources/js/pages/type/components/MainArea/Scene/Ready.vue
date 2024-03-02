  
<script setup>
import { computed } from 'vue';
import SpeedButton from '@/templates/SpeedButton.vue'

</script>

<template>
<div id="mode_select" class="fs-4">
	<p class="mx-3 fs-5">Enterキー / 動画をクリックして開始</p>
	<group id="play_mode_select" class="d-flex border border-2 border-white mx-3">
		<div><input type="radio" name="mode_select" value="kana_type" title="かな表示" class="roma" checked><label><div>ローマ字<wbr>入力</div></label></div>
		<div><input type="radio" name="mode_select" value="kanamode_type" title="かな入力" class="kana"><label>かな入力</label></div>
		<div><input type="radio" name="mode_select" value="kanamode_mac_type" title="フリック入力" class="flick" id="flick-mode"><label>フリック入力</label></div>
	</group>

	<div class="d-flex justify-content-between text-white mx-3 mt-5">
		<div class="d-inline-flex align-items-center px-4 rounded border border-1 border-white" id="speed_button">
			<SpeedButton />
		</div>

		<div class="border border-1 border-white">
  			<button id="practice_button" type="button" class="btn px-5 py-2 fw-bold fs-4">練習モードで開始</button>
		</div>
	</div>
</div>
</template>

<style>
.speed-option {
    display: inline-flex;
    align-items: center;
}



  #play_mode_select div {
	position: relative;
	flex: 1;
    text-align: center;
  }

  #play_mode_select input {
	width:100%;
	height: 73px;
	opacity: 0;
  }

  #play_mode_select label {
	display: grid;
    align-content: center;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

#play_mode_select label {
  border-right: 1.5px solid #ffffff;
}

  #play_mode_select .roma:checked + label {
	background: #17a3b8d2!important;
  }
  #play_mode_select .kana:checked + label {
	background: #de781fde!important;
  }
  #play_mode_select .flick:checked + label {
	background: #59e04db6!important;
  }
  #play_mode_select .roma:hover + label {
	background: #17a3b856;
  }
  #play_mode_select .kana:hover + label {
	background: #de781f85;
  }
  #play_mode_select .flick:hover + label {
	background: #59e04d3b;
  }
  #practice_button:hover {
	background: rgba(245, 245, 245, 0.356);
  }
</style>