import {
	User,
	Method,
} from '@karuta/core';
import { Context } from '@karuta/codenames-core';

import Action from '../core/Action';
import GameDriver from '../core/GameDriver';

interface PostParams {
	index?: number;
}

export default class NameCardHandler extends Action {
	constructor(driver: GameDriver, user: User) {
		super(Context.NameCard, driver, user);
	}

	async patch(params: unknown): Promise<void> {
		const { user } = this;
		const room = user.getRoom();
		if (!room) {
			return;
		}

		const { index } = params as PostParams;
		if (typeof index !== 'number' || index < 0) {
			return;
		}

		const card = this.driver.getCard(index);
		if (!card) {
			return;
		}

		room.broadcast(Method.Patch, Context.NameCard, {
			index,
			color: card.getColor(),
		});
	}
}
