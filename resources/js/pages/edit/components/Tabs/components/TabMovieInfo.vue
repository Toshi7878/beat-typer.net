<script setup>
import { URL, TITLE } from '@/pages/edit/assets/JS/consts/refs.js';

class Event {

}

(() => {

	if (window.mapTitle) {
		TITLE.value = window.mapTitle
	}
})()
</script>

<template>
	<div>
		<input class="col-12" placeholder="YouTube URL" v-model="URL">
	</div>
	<div>
		<input class="col-12" placeholder="タイトル" v-model="TITLE">
	</div>
</template>

<style></style>
