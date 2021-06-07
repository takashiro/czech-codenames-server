import path from 'path';
import fs from 'fs';
import rl from 'readline';

import { Color } from '@karuta/codenames-core';

export default class NameCard {
	protected name: string;

	protected color: Color;

	protected revealed = false;

	/**
	 * Create an unused name card
	 * @param name
	 * @param color
	 */
	constructor(name: string, color = Color.Unknown) {
		this.name = name;
		this.color = color;
	}

	/**
	 * @return Name
	 */
	getName(): string {
		return this.name;
	}

	/**
	 * @return Color
	 */
	getColor(): Color {
		return this.color;
	}

	/**
	 * @return Whether the card is revealed.
	 */
	isRevealed(): boolean {
		return this.revealed;
	}

	/**
	 * Reveal / unreveal the card.
	 * @param flipped
	 */
	setRevealed(flipped: boolean): void {
		this.revealed = flipped;
	}

	/**
	 * List all names from the dictionary
	 */
	static listNames(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			const dict = fs.createReadStream(path.join(__dirname, '..', '..', 'words.txt'));
			const reader = rl.createInterface({ input: dict });

			const names: string[] = [];
			reader.on('line', (name) => {
				names.push(name);
			});
			reader.once('close', () => {
				resolve(names);
			});
			reader.once('error', reject);
		});
	}
}
