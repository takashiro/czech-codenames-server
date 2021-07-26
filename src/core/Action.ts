import {
	User,
	ContextListener,
} from '@karuta/core';
import { Context } from '@karuta/codenames-core';

import GameDriver from './GameDriver';

export default class Action implements ContextListener {
	readonly context: Context;

	protected driver: GameDriver;

	protected user: User;

	constructor(context: Context, driver: GameDriver, user: User) {
		this.context = context;
		this.driver = driver;
		this.user = user;
	}
}
