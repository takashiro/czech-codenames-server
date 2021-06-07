/**
 * Reservoir sampling algorithm
 * @param num
 * @param total
 */
function reservoir(num: number, total: number): number[] {
	if (total <= num) {
		const selected = new Array(total);
		for (let i = 0; i < total; i++) {
			selected[i] = i;
		}
		return selected;
	}

	const selected = new Array(num);
	for (let i = 0; i < num; i++) {
		selected[i] = i;
	}

	for (let i = num; i < total; i++) {
		const j = Math.floor(Math.random() * i);
		if (j < num) {
			selected[j] = i;
		}
	}

	return selected;
}

export default reservoir;
