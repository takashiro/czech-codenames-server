import { Action, Driver } from '@karuta/core';

import NameCard from './model/NameCard';

export default class GameDriver implements Driver {
	protected names: NameCard[] = [];

	protected config = {};

	getName(): string {
		return 'codenames';
	}

	setConfig(config: unknown): void {
		Object.assign(this.config, config);
	}

	getConfig(): unknown {
		return this.config;
	}

	getAction(command: number): Action<unknown, unknown> | undefined {
		throw new Error('Method not implemented.');
	}
}
