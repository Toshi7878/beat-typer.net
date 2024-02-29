<script setup>

import { youtube, volume, convertMode } from '@/pages/edit/assets/JS/consts/refs.js';
import { db, option } from '@/pages/edit/assets/JS/DB/db.js';


class Event {

	static async volumeChange(event) {
		volume.value = event.target.value
		youtube.value.setVolume(volume.value)
		const ITEM = option.extract(event.target)
		db.options.put(ITEM)
	}

	static allTimeAdjust(event) {

	}

	static allWordConvert(event) {

	}

	static updateOptionDb(event) {
		const ITEM = option.extract(event.target)
		db.options.put(ITEM)
	}
}
</script>

<template>
	<div class="row mb-4">
		<h6>ツール</h6>
		<div id="time-adjuster" class="col-4">
			<label>
				全体タイム調整<input class="ms-3 w-25" id="time_adjust_box" type="number" max="0.5" min="-0.5" value="0">
			</label>
			<input type="button" value="実行" class="btn btn-outline-warning" @click="Event.allTimeAdjust">
		</div>

		<div class="user-select-none col d-flex align-items-end">
			<label for="volume_range" class="position-relative z-2">
				<p id="volume_label" class="position-absolute text-secondary" style="z-index:-1;">Volume</p>
				<input type="range" id="volume_range" name="volume" step="1" max="100" v-model="volume" @input="Event.volumeChange">
				<span id="volume_text" class="position-absolute bg-dark translate-middle border border-white rounded">
					<p class="text-white px-2 py-1 m-0">{{ volume }}</p>
				</span>
			</label>
		</div>

	</div>

	<div class="row mb-4">
		<h6>設定</h6>
		<div class="w-auto col-2 d-flex align-items-center">
			<p class="m-0">よみ変換</p>
		</div>
		<div class="col d-flex">
			<div class="me-3">
				<input type="radio" class="btn-check" name="word-convert-option" value="non_symbol" id="non_symbol" v-model="convertMode" @change="Event.updateOptionDb" checked>
				<label class="btn btn-outline-success" for="non_symbol">記号なし(一部除く)</label>
			</div>
			<div class="me-3">
				<input type="radio" class="btn-check" name="word-convert-option" value="add_symbol" id="add_symbol" v-model="convertMode" @change="Event.updateOptionDb">
				<label class="btn btn-outline-warning" for="add_symbol">記号あり(一部)</label>
			</div>
			<div class="me-3">
				<input type="radio" class="btn-check" name="word-convert-option" value="add_symbol_all" id="add_symbol_all" v-model="convertMode" @change="Event.updateOptionDb">
				<label class="btn btn-outline-danger" for="add_symbol_all">記号あり(全て)</label>
			</div>
		</div>


	</div>


	<div class="row">
		<h6>ショートカットキー</h6>
		<p class="col"><kbd class="me-1">←</kbd><kbd class="me-1">→</kbd><span>3秒スキップ</span></p>
		<p class="col"><kbd class="me-1">↑</kbd><kbd class="me-1">↓</kbd><span>ライン移動</span></p>
		<p class="col"><kbd class="me-1">S</kbd><span>追加</span></p>
		<p class="col"><kbd class="me-1">U</kbd><span>変更</span></p>
		<p class="col"><kbd class="me-1">Delete</kbd><span>削除</span></p>
		<p class="col"><kbd class="me-1">Esc</kbd><span>再生・停止</span></p>
	</div>
	<div class="row">
		<p class="col"><kbd class="me-1">D</kbd><span>ライン選択解除</span></p>
		<p class="col"><kbd class="me-1">Ctrl + Shift + F</kbd><span>よみ置換</span></p>
		<p class="col"><kbd class="me-1">Ctrl+Z</kbd><span>直前の追加取り消し</span></p>
		<p class="col"><kbd class="me-1">Ctrl+S</kbd><span>保存</span></p>
	</div>
</template>

<style>
#volume_label {
	top: -10px;
	left: 7px;
}

#volume_text {
	top: 40%;
	left: 115%;
}

#volume_range {
	-webkit-appearance: none;
	width: 11rem;
	background: transparent;
}

#volume_range::-webkit-slider-runnable-track {
	height: 1.5rem;
	margin: 0;
	width: 100%;
	cursor: pointer;
	background: linear-gradient(to bottom right,
			transparent 50%,
			#00000088 50%);
}

#volume_range::-moz-range-track {
	height: 1.5rem;
	margin: 0;
	width: 100%;
	cursor: pointer;
	background: linear-gradient(to bottom right,
			transparent 50%,
			#00000088 50%);
}

#volume_range::-webkit-slider-thumb {
	-webkit-appearance: none;
	height: 1.9rem;
	width: 0.5rem;
	background: #ffffff;
	border: 1px solid;
	margin-top: -3px;
	border-radius: 3px;
	cursor: pointer;
}

#volume_range::-moz-range-thumb {
	-webkit-appearance: none;
	height: 1.9rem;
	width: 0.5rem;
	background: #ffffff;
	border: 1px solid;
	border-radius: 3px;
	cursor: pointer;
	margin-top: 0;
}

#volume_range:focus::-moz-range-thumb {
	box-shadow: 0px 0px 7px 3px #0065c4;
}
</style>
