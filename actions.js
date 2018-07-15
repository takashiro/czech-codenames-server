
const fs = require('fs');

const net = require('./protocol');
const NameCard = require('./NameCard');

/**
 * Shuffle the array in place
 * @param {Array} a
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
}

/**
 * Reservoir sampling algorithm
 * @param {number} num
 * @param {number} total
 * @return {number[]}
 */
function reservoir(num, total) {
	if (total <= num) {
		let selected = new Array(total);
		for (let i = 0; i < total; i++) {
			selected[i] = i;
		}
		return selected;
	}

	let selected = new Array(num);
	for (let i = 0; i < num; i++) {
		selected[i] = i;
	}
	for (i = num; i < total; i++) {
		let j = Math.floor(Math.random() * i);
		if (j < num) {
			selected[j] = i;
		}
	}

	return selected;
}

/**
 * Generate colors
 * @param {number} total number of name cards
 * @param {Array} colors
 * @return {number[]}
 */
function generateColors(total, colors) {
	let res = new Array(total);

	let i = 0;
	for (let color = 0; color < colors.length; color++) {
		let num = colors[color];
		for (let j = 0; j < num; j++) {
			res[i] = color;
			i++;
		}
	}

	shuffle(res);
	return res;
}

const act = new Map;

act.set(net.RefreshNameCards, async function () {
	let room = this.room;
	if (!room || !room.driver) {
		return;
	}

	let names = await NameCard.listNames();
	let cards = reservoir(25, names.length)
	.map(index => new NameCard(names[index]));

	let colors = generateColors(25, [
		1, // Black
		9, // Red
		8, // Blue
		7, // Yellow
	]);
	for (let i = 0; i < 25; i++) {
		cards[i].color = colors[i];
		cards[i].index = i;
	}

	let driver = room.driver;
	driver.cards = cards;

	this.send(net.RefreshNameCards);
	room.broadcast(net.FetchNames, cards.map(card => card.name));
});

act.set(net.FetchNames, function () {
	let room = this.room;
	if (!room || !room.driver) {
		return;
	}

	let cards = room.driver.cards;
	this.send(net.FetchNames, cards.map(card => card.name));
});

act.set(net.FetchColors, function () {
	let room = this.room;
	if (!room || !room.driver) {
		return;
	}

	let cards = room.driver.cards;
	this.send(net.FetchColors, cards.map(card => card.color));
});

act.set(net.FlipCard, function (index) {
	let room = this.room;
	if (!room || !room.driver) {
		return;
	}

	let cards = room.driver.cards;
	let card = cards[index];
	if (card) {
		card.flipped = true;
		room.broadcast(net.FlipCard, {
			index: index,
			color: card.color,
		});
	} else {
		this.send(net.FlipCard, {index: index});
	}
});

act.set(net.FetchFlippedCards, function () {
	let room = this.room;
	if (!room || !room.driver) {
		return;
	}

	let cards = room.driver.cards.filter(card => card.flipped);
	for (let card of cards) {
		this.send(net.FlipCard, {
			index: card.index,
			color: card.color,
		});
	}
});

module.exports = act;
