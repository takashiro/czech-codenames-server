import { User } from '@karuta/core';

import Action from '../core/Action';
import GameDriver from '../core/GameDriver';

import NameCardHandler from './NameCardHandler';
import NameCardsHandler from './NameCardsHandler';

type Creator = new (driver: GameDriver, user: User) => Action;

const creators: Creator[] = [
	NameCardHandler,
	NameCardsHandler,
];

export default creators;
