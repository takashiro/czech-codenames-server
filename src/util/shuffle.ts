/**
 * Shuffle the array in place
 * @param a
 */
export default function shuffle<T>(a: T[]): void {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
}
