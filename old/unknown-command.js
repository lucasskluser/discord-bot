const { Command } = require('discord.js-commando');

module.exports = class UnknownCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unknown-command',
			group: 'utils',
			memberName: 'unknown-command',
			description: 'Exibe informações de ajuda quando um comando não existe.',
			examples: ['unknown-command kickeverybodyever'],
			unknown: true,
			hidden: true
		});
	}

	run(msg) {
		return msg.reply(
			`comando desconhecido. Use ${msg.anyUsage(
				'ajuda',
				msg.guild ? undefined : null,
				msg.guild ? undefined : null
			)} para ver uma lista com os comandos.`
		);
	}
};