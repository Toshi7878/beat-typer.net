<script setup>
const props = defineProps({
	mapInfo: Object,
});
</script>

<template>
	<v-card class="bg-grey-darken-3 rounded" elevation="2">
		<div class="content">
			<img class="cover" :src='`https://i.ytimg.com/vi/${props.mapInfo.movie_id}/mqdefault.jpg`'>
			<div class="info m-1"><a class="font-weight-bold" :href="`/type/${props.mapInfo.id}`">{{ props.mapInfo.title }}</a>
				<p><a href="/">wanran</a> - <time datetime="2024-03-31T06:18:32.352Z" title="2024-03-31T06:18:32.352139Z">4 hours ago</time></p>
			</div>
		</div>
	</v-card>
</template>

<style scoped>
.content {
	display: flex;
}

.cover {
	width: 200px;
	display: inline-block;
	position: relative;
}
</style>
