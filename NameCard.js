
const path = require('path');
const fs = require('fs');
const readline = require('readline');

class NameCard {

	/**
	 * Create an unused name card
	 * @param {string} name
	 * @param {number} color
	 */
	constructor(name, color = 0) {
		this.name = name;
		this.color = color;
		this.uncovered = true;
	}

	/**
	 * List all names from the dictionary
	 * @return {Promise<string[]>}
	 */
	static listNames() {
		return new Promise(function (resolve, reject) {
			let dict = fs.createReadStream(path.join(__dirname, 'words.txt'));
			let reader = readline.createInterface({input: dict});

			let names = [];
			reader.on('line', name => {
				names.push(name);
			});

			reader.on('close', function () {
				resolve(names);
			});
			reader.on('SIGINT', reject);
		});
	}

}

module.exports = NameCard;
