  
<script setup>
import {
	combo, notify, lineTypeSpeed, remainTime, lineTimeBar,
	mainInput, mainNextChar, mainWord,
	subInput, subNextChar, subWord,
	countDown, lyrics, nextLyrics, nextTypeSpeed,
	Skip, currentTime, durationTime, currentTimeBar
} from '@/pages/type/assets/JS/consts/typeAreaRef.js';
</script>

<template>
	<div class="w-100 pt-3 pb-4 shadow bg-body-tertiary rounded fw-bold">
		<div id="top_area">
			<div id="top_notify" class="mx-2 d-flex justify-content-between font-monospace">
				<div id="combo_notify" class="fs-4 position-relative">0</div>
				<div id="effect_notify" class="position-absolute fs-4">∣∣</div>
				<div id="line_time_notify" class="position-relative fs-5">
					<span>0kpm</span> - 残り10.0秒
				</div>
			</div>
			<progress class="w-100" value="100"></progress>
		</div>
		<div id="word_area" class="my-1 mx-2">
			<div id="type_area">
				<div id="main" class="text-shadow">
					<span class='correct-input text-secondary'>め</span><span class='next-char text-danger'>い</span><span class='word'>ん</span>
				</div>
				<div id="sub" class="mt-1 text-shadow">
					<span class='correct-input text-secondary'>s</span><span class='next-char text-danger'>u</span><span class='word'>b</span>
				</div>
			</div>
			<div id="lyrics" class="h3 mt-4 text-nowrap text-truncate">
				<ruby>　<rt>　</rt></ruby><ruby>歌詞<rt>かし</rt></ruby>
			</div>
			<div id="next" class="mt-4 text-white-50">
				<div id="next_lyrics" class="text-nowrap text-truncate">
					<ruby>　<rt>　</rt></ruby>次の<ruby>歌詞<rt>かし</rt></ruby>
				</div>
				<div id="next_speed" class="fw-normal">
					NEXT:5.00打/秒
				</div>
			</div>

		</div>
		<div id="bottom_area">
			<div id="bottom_notify" class="d-flex justify-content-between mx-2">
				<div id="skip_notify" class="fst-italic text-secondary">skip⏩</div>
				<div id="total_time" class="fw-bold"><span id="current_time">00:00</span> / <span id="duration_time">00:00</span></div>
			</div>
			<progress class="w-100" value="100"></progress>
		</div>
	</div>
</template>

<style>
#effect_notify {
	letter-spacing: 2px;
	position: absolute;
	left: 48%;
	transform: translate(-50%);
	-webkit-transform: translate(-50%);
	top: 303px;
	bottom: 0;

}

.text-shadow {
	text-shadow: black 0.6px 0px, black -0.6px 0px,
		black 0px -0.6px, black 0px 0.6px,
		black 0.6px 0.6px, black -0.6px 0.6px,
		black 0.6px -0.6px, black -0.6px -0.6px,
		black 1px 0.6px, black -1px 0.6px,
		black 1px -0.6px, black -1px -0.6px,
		black 0.6px 1px, black -0.6px 1px,
		black 0.6px -1px, black -0.6px -1px;
}

#combo_notify {
	height: 5px;
	bottom: 14.4px;
}

#line_time_notify {
	height: 20px;
	bottom: 10px;
}

#main {
	font-size: 32.0px;
	letter-spacing: 1.0px;
}

#sub {
	font-size: 28.0px;
	letter-spacing: 2.2px;
}

#lyrics,
#next_lyrics {
	text-indent: -1rem;
}
</style>
