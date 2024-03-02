<script setup>
import { changeTab, lineData, NUMBER, TIME, LYRIC, WORD } from '@/pages/edit/assets/JS/consts/refs.js';
import { LineBlur } from '@/pages/edit/assets/JS/components/selectBlur.js';
import { youtube, speed, volume } from '@/templates/assets/JS/youtubeRef.js'

const columns = [
	{
		label: 'time',
		field: 'time',
		type: 'number',
		width: '70px',
		class: 'cursor-pointer'
	},
	{
		label: '歌詞',
		field: 'lyrics',
		type: 'text',
	},
	{
		label: '読み',
		field: 'word',
		type: 'text',
	},
];



const onRowClick = (params) => {
	changeTab('ライン編集');
	RowClick.selectColor(params)
	RowClick.addLineEdit(params)
};

const onCellClick = (params) => {
	// Handle cell click if needed
	const CELL = params.column.field

	if (CELL == 'time') {
		youtube.value.seekTo(+params.row.time)
	}
};

class RowClick {

	static selectColor(params) {
		LineBlur.colorBlur()
		const TARGET_ROW = params.event.target.closest('tr')
		TARGET_ROW.classList.add('bg-info');
	}

	static addLineEdit(params) {
		NUMBER.value = params.pageIndex + 1
		TIME.value = params.row.time
		LYRIC.value = params.row.lyrics
		WORD.value = params.row.word
	}
}
</script>

<template>
	<div>
		<vue-good-table :columns="columns" max-height="30vw" :rows="lineData" theme="nocturnal" row-style-class="line" styleClass="vgt-table bordered" :sort-options="{
			enabled: false,
			initialSortBy: { field: 'time', type: 'asc' },
		}" :line-numbers="true" v-on:row-click="onRowClick" v-on:cell-click="onCellClick">
		</vue-good-table>
	</div>
</template>

<style>
.line:hover {
	background: #29749771;
}

.line td:nth-child(2) {
	cursor: pointer;
}

.line td:nth-child(2):hover {
	background: #14557ac7;
}

.line td:nth-child(2)::before {
	content: '▶';
	font-size: xx-small;
	position: absolute;
	margin: -10px;
	left: 58px;
}
</style>