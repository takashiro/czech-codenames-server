import { User } from '@karuta/core';

import Action from '../core/Action';
import GameDriver from '../core/GameDriver';

type Creator = new (driver: GameDriver, user: User) => Action;

const creators: Creator[] = [
];

export default creators;
