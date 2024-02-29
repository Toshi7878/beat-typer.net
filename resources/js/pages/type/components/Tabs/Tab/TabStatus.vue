<script setup>
import { score, point, missCount, lostCount, typeCount, typeSpeed, rank, lineCount } from '@/pages/type/assets/JS/consts/statusRef.js';
</script>

<template>
	<div id="status" class="shadow bg-body-tertiary rounded ms-2">
		<table class="w-100 position-relative h-100 fs-4 fw-bold font-monospace" style="table-layout: fixed;">
			<tr id="status_top" class="position-relative">

				<td id="score"><span class="label">Score</span>
					<span class="position-relative"><span id='score_value'>{{ score }}</span><span class="status-border-bottom"></span></span>
				</td>

				<td id='lost'><span class="label">Lost</span>
					<span class="position-relative"><span id='lost_value'>{{ lostCount }}</span><span class="status-border-bottom"></span></span>
				</td>

				<td id='type_speed'><span class="label">kpm</span>
					<span class="position-relative"><span id='type_speed_value'>{{ typeSpeed }}</span><span class="status-border-bottom"></span></span>
				</td>


				<td id='rank'><span class="label">Rank</span>
					<span class="position-relative"><span id='rank_value'>{{ rank }}</span><span class="status-border-bottom"></span></span>
				</td>
			</tr>

			<tr id="status_bottom" class="position-relative">
				<td id='point'><span class="label">Point</span>
					<span class="position-relative"><span id='point_value'>{{ point }}</span><span class="status-border-bottom"></span></span>
				</td>

				<td id='miss'><span class="label">Miss</span>
					<span class="position-relative"><span id='miss_value'>{{ missCount }}</span><span class="status-border-bottom"></span></span>
				</td>

				<td id='type'><span class="label">Type</span>
					<span class="position-relative"><span id='type_value'>{{ typeCount }}</span><span class="status-border-bottom"></span></span>
				</td>

				<td id='line'><span class="label">Line</span>
					<span class="position-relative"><span id='line_value'>{{ lineCount }}</span><span class="status-border-bottom"></span></span>
				</td>
			</tr>
		</table>
	</div>
</template>

<style>
#status {
	height: 168px;
}

#status_top,
#status_bottom {
	left: 3%;
}

#score .status-border-bottom,
#point .status-border-bottom {
	min-width: 4.2em;
}

#score,
#point {
	width: 30%;
}

#status [id*=_value] {
	letter-spacing: 1px;
}

.status-border-bottom {
	border-top: solid thin;
	position: absolute;
	bottom: -1px;
	min-width: 2.5em;
	left: -1px;
}



.label {
	position: relative;
	right: 8px;
}

#type_speed .label {
	letter-spacing: 0.2em;
}
</style>