import { Color } from '@karuta/codenames-core';

import NameCard from '../../src/model/NameCard';

it('generates random words', async () => {
	const names = await NameCard.listNames();
	expect(names.length).toBeGreaterThan(0);
});

it('reveals a card', () => {
	const card = new NameCard('test', Color.Black);
	expect(card.getName()).toBe('test');
	expect(card.getColor()).toBe(Color.Black);
	expect(card.isRevealed()).toBe(false);
	card.setRevealed(true);
	expect(card.isRevealed()).toBe(true);
});
