  
<script setup>
import { tabRef } from '@/pages/edit/assets/JS/consts/refs.js';

import TabMovieInfo from '@/pages/edit/components/Tabs/components/TabMovieInfo.vue';
import TabLineInput from '@/pages/edit/components/Tabs/components/TabLineInput.vue';
import TabToolOption from '@/pages/edit/components/Tabs/components/TabToolOption.vue';
import TabUpload from '@/pages/edit/components/Tabs/components/TabUpload.vue';




</script>

<template>
	<tabs ref="tabRef" class="col-9" :options="{ useUrlFragment: false }">
		<tab name="曲情報" id="曲情報" class="row gap-4 form-control-lg">
			<TabMovieInfo />
		</tab>
		<tab name="ライン編集" id="ライン編集" class="row gap-2 form-control-sm">
			<TabLineInput />
		</tab>
		<tab name="保存" id="保存" class="row gap-2 form-control-lg">
			<TabUpload />
		</tab>
		<tab name="ツール・設定" id="ツール・設定" class="row gap-2 form-control-sm">
			<TabToolOption />
		</tab>
	</tabs>
</template>

<style>
.tabs-component-tabs {
	border: solid 1px #333;
	/* Dark mode border color */
	border-radius: 6px;
	margin-bottom: 5px;
}

@media (min-width: 700px) {
	.tabs-component-tabs {
		border: 0;
		align-items: stretch;
		display: flex;
		justify-content: flex-start;
		margin-bottom: -1px;
	}
}

.tabs-component-tab,
.tabs-component-tab--custom {
	color: #ccc;
	/* Dark mode text color */
	font-size: 14px;
	font-weight: 600;
	margin-right: 0;
	list-style: none;
}

.tabs-component-tab:not(:last-child) {
	border-bottom: dotted 1px #555;
	/* Dark mode border color */
}

.tabs-component-tab:hover {
	color: #999;
	/* Dark mode hover color */
}

.tabs-component-tab.is-active {
	color: #fff;
	/* Dark mode active color */
}

.tabs-component-tab.is-disabled *,
.tabs-component-tab--custom.is-disabled * {
	color: #555;
	cursor: not-allowed !important;
}

@media (min-width: 700px) {

	.tabs-component-tab,
	.tabs-component-tab--custom {
		background-color: #222;
		/* Dark mode background color */
		border: solid 1px #333;
		/* Dark mode border color */
		border-radius: 3px 3px 0 0;
		margin-right: .5em;
		transform: translateY(2px);
		transition: transform .3s ease;
	}

	.tabs-component-tab.is-active,
	.tabs-component-tab--custom.is-active {
		border-bottom: solid 1px #222;
		/* Dark mode border color */
		z-index: 2;
		transform: translateY(0);
	}
}

.tabs-component-tab-a,
.tabs-component-tab-a--custom {
	align-items: center;
	color: inherit;
	display: flex;
	padding: 0em 1em;
	text-decoration: none;
}

.tabs-component-panels {
	padding: 4em 0;
}

@media (min-width: 700px) {
	.tabs-component-panels {
		background-color: #222;
		/* Dark mode background color */
		border: solid 1px #333;
		/* Dark mode border color */
		border-radius: 0 6px 6px 6px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .05);
		padding: 1em 2em;
	}
}

.tabs-component-btn {
	cursor: pointer;
	background: #123;
	/* Dark mode button background color */
	border-radius: 3px;
	border: 1px solid #456;
	/* Dark mode button border color */
	padding: 4px 8px;
	color: #789;
	/* Dark mode button text color */
}

.tabs-component-btn:hover {
	background-color: #345;
	/* Dark mode button hover background color */
	color: #678;
	/* Dark mode button hover text color */
}

.tabs-component-btn:active {
	background-color: #234;
	/* Dark mode button active background color */
	box-shadow: none;
	color: #567;
	/* Dark mode button active text color */
}

.tabs-component-tab--custom {
	border-color: #123;
	/* Dark mode border color */
	color: #456;
	/* Dark mode text color */
}

.tabs-component-tab--custom:hover {
	border-color: #123;
	/* Dark mode border color */
	color: #789;
	/* Dark mode hover color */
}

.tabs-component-tab--custom.is-active {
	color: #789;
	/* Dark mode active color */
	border-color: #456;
	/* Dark mode border color */
	border-bottom: solid 1px #222;
	/* Dark mode border color */
}
</style>
