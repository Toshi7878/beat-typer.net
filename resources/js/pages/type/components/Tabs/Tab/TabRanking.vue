<script setup>
</script>

<template>
	<div id="ranking">
		<table class="table table-striped table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">名前</th>
					<th scope="col">Score</th>
					<th scope="col">打鍵率</th>
					<th scope="col">モード</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Pandita</td>
					<td>310,681</td>
					<td>99.00%</td>
					<td class="text-info">ローマ字</td>

				</tr>
				<tr>
					<th scope="row">1</th>
					<td>Pandita</td>
					<td>310,681</td>
					<td>99.00%</td>
					<td class="text-info">ローマ字</td>
				</tr>
				<tr>
					<th scope="row">1</th>
					<td>Pandita</td>
					<td>310,681</td>
					<td>99.00%</td>
					<td class="text-info">ローマ字</td>
				</tr>
				<tr>
					<th scope="row">1</th>
					<td>Pandita</td>
					<td>310,681</td>
					<td>99.00%</td>
					<td class="text-info">ローマ字</td>
				</tr>
				<tr>
					<th scope="row">1</th>
					<td>Pandita</td>
					<td>310,681</td>
					<td>99.00%</td>
					<td class="text-info">ローマ字</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
#ranking tbody {
	height: 143.5px;
	overflow-y: scroll;
	table-layout: fixed;
	display: block;
}

#ranking thead,
#ranking tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}

#ranking tr {
	line-height: 14px;
	cursor: pointer;
}

#ranking tbody tr:hover {
	opacity: 0.6;
	text-decoration: underline;
}

#ranking table {
	border-radius: 0.25rem !important;
}

/* ランク */
#ranking th:nth-child(1),
#ranking td:nth-child(1) {
	width: 42px;
}

/* スコア */
#ranking th:nth-child(3),
#ranking td:nth-child(3) {
	width: 100px;
}

/* 打鍵率 */
#ranking th:nth-child(4),
#ranking td:nth-child(4) {
	width: 85px;
}

/* モード */
#ranking th:nth-child(5),
#ranking td:nth-child(5) {
	width: 85px;
	text-align: center;
}

#ranking th:nth-child(6) {
	width: 17px;
	padding: 12px 0;
}
</style>