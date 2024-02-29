
export function tableScroll(lineNum, behavior = 'smooth'){
	const tableContainer = document.getElementById("vgt-table").parentElement;

	if (lineNum >= 1) {
		const addedLine = document.getElementsByClassName("line")[lineNum]
		tableContainer.scrollTo({
			top: addedLine.offsetTop + addedLine.clientHeight,
			behavior: behavior,
		})
	} else {
		tableContainer.scrollTo({
			top: 0,
			behavior: behavior,
		})
	}

}