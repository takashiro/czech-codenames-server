import {
	Driver,
	User,
	ContextListener,
	DriverProfile,
} from '@karuta/core';
import { Color } from '@karuta/codenames-core';

import ContextHandlers from '../cmd';
import NameCard from '../model/NameCard';

import reservoir from '../util/reservoir';
import shuffle from '../util/shuffle';
import Config from './Config';

export default class GameDriver implements Driver<Config> {
	protected cards: NameCard[] = [];

	protected name = '@karuta/codenames';

	protected config: Config = {
		row: 5,
		column: 5,
	};

	getName(): string {
		return this.name;
	}

	getProfile(): DriverProfile<Config> {
		return {
			name: this.getName(),
			config: this.getConfig(),
		};
	}

	updateConfig(config: Config): void {
		Object.assign(this.config, config);
	}

	getConfig(): Config {
		return this.config;
	}

	createContextListeners(user: User): ContextListener[] {
		return ContextHandlers.map((ContextHandler) => new ContextHandler(this, user));
	}

	async createCards(): Promise<NameCard[]> {
		const allNames = await NameCard.listNames();
		const names = reservoir(25, allNames.length).map((i) => allNames[i]);

		const colors: Color[] = new Array(25);
		colors.fill(Color.Black, 0, 1);
		colors.fill(Color.Red, 1, 9);
		colors.fill(Color.Blue, 9, 17);
		colors.fill(Color.Yellow, 17, 25);
		shuffle(colors);

		this.cards = names.map((name, i) => new NameCard(name, colors[i]));
		return this.cards;
	}

	getCards(): NameCard[] {
		return [...this.cards];
	}

	getCard(index: number): NameCard | undefined {
		return this.cards[index];
	}
}
