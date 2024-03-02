  
<script setup>
import { computed } from 'vue';
</script>

<template>
<form id="mode-select-area">
	<p class="mx-3 mt-2">Enterキー / 動画をクリックして開始</p>
	<group class="d-flex border border-2 border-white mx-3 my-1" id="play-mode-select">
		<div><input type="radio" name="mode_select" value="kana_type" title="かな表示" class="roma" checked><label><div>ローマ字<wbr>入力</div></label></div>
		<div><input type="radio" name="mode_select" value="kanamode_type" title="かな入力" class="kana"><label>かな入力</label></div>
		<div><input type="radio" name="mode_select" value="kanamode_mac_type" title="フリック入力" class="flick" id="flick-mode"><label>フリック入力</label></div>
	</group>

	<div class="d-flex justify-content-between text-white mt-5 mx-3">
		<div class="d-inline-flex align-items-center px-2 pb-1 rounded border border-1 border-white" style="transform: scale(1);" id="speed_button">
		<button type="button" class="btn text-info" id="speed_down" title="再生速度を遅くして挑戦">-</button>
		<span id="play_speed">1.00倍速</span>
			<button type="button" class="btn text-info" id="speed_up" title="再生速度を早くして挑戦">+</button>
		</div>

		<div class="border border-1 border-white" id="practice-button">
  			<button type="button" class="btn px-5 py-3">練習モードで開始</button>
		</div>
	</div>
</form>
</template>

<style>
.speed-option {
    display: inline-flex;
    align-items: center;
}



  #play-mode-select div {
	position: relative;
	flex: 1;
    text-align: center;
  }

  #play-mode-select input {
	width:100%;
	height: 70px;
	opacity: 0;
  }

  #play-mode-select label {
	display: grid;
    align-content: center;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-right: 1.5px solid #ffffff;
}

  #play-mode-select .roma:checked + label {
	background: #17a3b8d2!important;
  }
  #play-mode-select .kana:checked + label {
	background: #de781fde!important;
  }
  #play-mode-select .flick:checked + label {
	background: #59e04db6!important;
  }
  #play-mode-select .roma:hover + label {
	background: #17a3b856;
  }
  #play-mode-select .kana:hover + label {
	background: #de781f85;
  }
  #play-mode-select .flick:hover + label {
	background: #59e04d3b;
  }
  #practice-button:hover {
	background: rgba(245, 245, 245, 0.356);
  }
</style>