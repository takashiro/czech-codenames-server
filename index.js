
const actions = require('./actions');

class GameDriver {

	constructor(room) {
		this.cards = [];
	}

	setConfig(config) {
	}

	getConfig() {
		let cards = this.cards;
		let result = [];
		for (let card of cards) {
			let color = card.color;
			if (result[color]) {
				result[color]++;
			} else {
				result[color] = 1;
			}
		}

		return result;
	}

	get actions() {
		return actions;
	}

}

module.exports = GameDriver;
