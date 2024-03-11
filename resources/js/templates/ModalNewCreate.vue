<script setup>
import { ref, watch } from 'vue'
import { newCreateModal } from '@/templates/assets/JS/modalRef.js';
import { Modal } from '@kouts/vue-modal'

const createBtnRef = ref(false);
const urlRef = ref('')

watch(urlRef, (newValue) => {
	// 値が入っていたらTrue
	const ID = new YouTubeID(newValue).id

	if (ID && ID.length == 11) {
		createBtnRef.value = true;
	} else {
		createBtnRef.value = false;
	}

});


class Event {

	static newCreate(event) {
		const ID = new YouTubeID(document.getElementById("url_input").value).id

		if (ID && ID.length == 11) {
			window.location.href = `/edit/new?id=${ID}`;
		}
	}

}

class YouTubeID {

	constructor(url) {
		this.id = this.extractYouTubeVideoId(url)
	}

	extractYouTubeVideoId(url) {
		const regex = /[?&]v=([^?&]+)/;
		const match = url.match(regex);

		// If match is not found, try to match using short URL format
		if (!match) {
			const shortUrlRegex = /youtu\.be\/([^?&]+)/;
			const shortUrlMatch = url.match(shortUrlRegex);

			if (shortUrlMatch && shortUrlMatch[1]) {
				return shortUrlMatch[1];
			}
		}

		// Check if a match is found
		if (match && match[1]) {
			return match[1];
		} else {
			// No match found or invalid URL
			return null;
		}
	}

}


</script>

<template>
	<Modal v-model="newCreateModal" title="新規作成ウィンドウ" wrapper-class="modal-wrapper" modal-class="kouts-modal dark">
		<p class="text-center">譜面を作成したいYouTube動画のURLを入力</p>
		<div class="row">
			<input id="url_input" class="m-auto w-75" placeholder="YouTube 動画 URL" v-model="urlRef">
			<div class="offset-7 mt-3">

				<input class="btn btn-success me-3" type="button" @click="Event.newCreate" value="新規作成" v-if="createBtnRef">
				<input class="btn btn-outline-secondary me-3" type="button" value="新規作成" disabled v-else>

				<input class="btn btn-secondary" type="button" @click="newCreateModal = false" value="閉じる">
			</div>
		</div>

	</Modal>
</template>

<style>
.kouts-modal {
	min-width: 300px;
}

@media (min-width: 480px) {
	.kouts-modal.modal-sm {
		max-width: 300px;
	}
}

@media (min-width: 992px) {

	.kouts-modal.modal-lg,
	.kouts-modal.modal-xl {
		max-width: 800px;
	}
}

@media (min-width: 1200px) {
	.kouts-modal.modal-xl {
		max-width: 1140px;
	}
}

.modal-wrapper .vm {
	top: 50px;
	left: 400px;
}

.dark {
	background: #111827 !important;
}
</style>