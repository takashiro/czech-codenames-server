
const net = require('../../core/protocol');
const Enum = require('../../core/Enum');

const cmd = new Enum(
	...net.enums,
	'RefreshNameCards',
	'FetchNames',
	'FetchColors',
	'FlipCard',
);

module.exports = cmd;
