import {
	User,
	Method,
} from '@karuta/core';
import { Context } from '@karuta/codenames-core';

import Action from '../core/Action';
import GameDriver from '../core/GameDriver';

export default class NameCardsHandler extends Action {
	constructor(driver: GameDriver, user: User) {
		super(Context.NameCards, driver, user);
	}

	async post(): Promise<void> {
		const { user } = this;
		const room = user.getRoom();
		if (!room || room.getOwner() !== user) {
			return;
		}

		const cards = await this.driver.createCards();
		room.broadcastExcept(user, Method.Put, Context.NameCards, cards.map((card) => ({
			name: card.getName(),
		})));
		user.notify(Method.Put, Context.NameCards, cards.map((card) => ({
			name: card.getName(),
			color: card.getColor(),
			revealed: card.isRevealed(),
		})));
	}

	async get(): Promise<unknown> {
		const cards = this.driver.getCards();
		return cards.map((card) => ({
			name: card.getName(),
			color: card.isRevealed() ? card.getColor() : undefined,
			revealed: card.isRevealed(),
		}));
	}
}
