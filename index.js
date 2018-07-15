
const actions = require('./actions');

class GameDriver {

	constructor(room) {
		this.cards = [];
	}

	setConfig(config) {
	}

	getConfig() {
	}

	get actions() {
		return actions;
	}

}

module.exports = GameDriver;
