import { it, expect } from '@jest/globals';

import reservoir from '../../src/util/reservoir';

it('randomly select some numbers', () => {
	const nums = reservoir(5, 10);
	expect(nums).toHaveLength(5);
	for (const num of nums) {
		expect(num).toBeGreaterThanOrEqual(0);
		expect(num).toBeLessThan(10);
	}
});

it('returns all if there are fewer than requested', () => {
	const nums = reservoir(10, 5);
	expect(nums).toHaveLength(5);
	expect(nums).toStrictEqual([0, 1, 2, 3, 4]);
});
