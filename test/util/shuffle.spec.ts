import { it, expect } from '@jest/globals';

import shuffle from '../../src/util/shuffle';

it('shuffles an array', () => {
	const arr: number[] = new Array(100);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = i;
	}
	shuffle(arr);
	expect(arr.some((v, i) => v !== i));
});
