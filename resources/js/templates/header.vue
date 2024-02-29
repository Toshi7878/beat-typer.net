<script setup>
import { ref } from 'vue'
import { useFixedHeader } from 'vue-use-fixed-header'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ModalNewCreate from '@/templates/ModalNewCreate.vue'
import { newCreateModal } from '@/templates/assets/JS/modalRef.js';

library.add(faPlusSquare)

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)

</script>

<template>
	<header class="Header navbar navbar-expand-lg fixed-top navbar-dark" ref="headerRef" :style="styles">
		<div class="container">
			<h4 class="h4">
				<a href="/" class="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover">BeatTyper</a>
			</h4>
			<div id="right_menu" class="lead me-5">
				<a class="cursor-pointer header-icon" title="新規作成" @click="newCreateModal = true">
					<FontAwesomeIcon icon="plus-square" />
				</a>
			</div>
		</div>
	</header>
	<ModalNewCreate />
</template>

<style scoped>
.header-icon {
	color: rgba(255, 255, 255, .6);
}

.header-icon:hover {
	color: rgba(255, 255, 255, .8);
	transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
}

.Header {
	position: fixed;
	/* or sticky */
	top: 0;
	/* Other styles... */
	background: #375a7f;
}

.cursor-pointer {
	cursor: pointer;
}
</style>