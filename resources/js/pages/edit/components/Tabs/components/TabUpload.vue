<script setup>
import { lineData, URL, TITLE, COMMENT } from '@/pages/edit/assets/JS/consts/refs.js';

class Event {

	static upload() {
		const param = {
			"title": TITLE.value,
			"movie_id": URL.value.match(/v=([^&]+)/)[1],
			"creator_comment": COMMENT.value,
			"creator_id": 0,
			"line_data": lineData.value
		}

		fetch('/edit/post',
			{
				method: 'POST', // HTTP-メソッドを指定
				headers: { "Content-Type": "application/json", 'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value }, // CSRFトークン対策
				body: JSON.stringify(param),
			}
		) // Serverから返ってきたレスポンスをjsonで受け取って、次のthenに渡す
			.then(response => response)
			.then(res => {
				// 最終的に返ってきたデータ => Server-Sideでのデータ処理が行われている！
				console.log({ res });
			})
			.catch(error => {
				// エラー発生の場合の catch & console出力
				console.log({ error });
			});
	}

}
</script>

<template>
	<div>
		<input class="col-12" placeholder="制作者コメント" v-model="COMMENT">
	</div>
	<div>
		<input class="col-1 btn btn-outline-info" type="button" value="保存" @click="Event.upload">
		<span class="col-10 offset-1">保存されたらここに表示</span>
	</div>
</template>

<style></style>
