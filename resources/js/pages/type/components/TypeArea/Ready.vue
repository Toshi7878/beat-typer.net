  
<script setup>
import { computed } from 'vue';
</script>

<template>
<form id="mode-select-area">
	<p id="esckey">Enterキー / 動画をクリックして開始</p>
	<group class="inline-radio" id="play-mode-select">
		<div id="playBotton1"><input type="radio" name="mode_select" value="kana_type" title="かな表示" class="roma" checked><label><div>ローマ字<wbr>入力</div></label></div>
		<div id="playBotton4"><input type="radio" name="mode_select" value="kanamode_type" title="かな入力" class="kana"><label>かな入力</label></div>
	</group>

	<div class="sub-button">
		<span class="mod-menu-round-wrapper speed-option" style="transform: scale(1);" id="playButton3">
		<span>挑戦速度</span>
		<button type="button" class="btn btn-link cursor-pointer" id="speed-down" data-toggle="tooltip" data-placement="bottom" title="再生速度を遅くして挑戦">-</button>
		<span id="playspeed">1.00倍速</span>
			<button type="button" class="btn btn-link cursor-pointer" id="speed-up" data-toggle="tooltip" data-placement="bottom" title="再生速度を早くして挑戦">+</button>
		</span>

		<div>
			<span class="btn btn-border cursor-pointer" id="practice-mode-button">練習モードで開始</span>
		</div>
	</div>
</form>
</template>

<style>
.speed-option {
    color: #FFF;
    display: inline-flex;
    align-content: center;
    align-items: center;
    font-size: inherit;
    width:"16rem";
    justify-content: center;
}
.sub-button{
  display: flex;
  justify-content: space-between;
  margin:3rem 0 1.5rem 0;
}
span.btn-border {
	border: 1px solid #FFF;
  font-weight:600;
  border-radius: 0;
  width:16rem;
  color: rgb(255, 255, 255);
  }

</style>