const { stripIndents, oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');

module.exports = class PrefixoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefixo',
			group: 'utils',
			memberName: 'prefixo',
            description: 'Mostra ou define o prefixo dos comandos.',
            ownerOnly: true,
			format: '[prefix/"default"/"none"]',
			details: oneLine`
				If no prefix is provided, the current prefix will be shown.
				If the prefix is "default", the prefix will be reset to the bot's default prefix.
				If the prefix is "none", the prefix will be removed entirely, only allowing mentions to run commands.
				Only administrators may change the prefix.
			`,
			examples: ['prefixo', 'prefixo -', 'prefixo omg!', 'prefixo default', 'prefixo none'],

			args: [
				{
					key: 'prefix',
					prompt: 'Qual prefixo você quer definir?',
					type: 'string',
					max: 15,
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		// Just output the prefix
		if(!args.prefix) {
			const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
			return msg.reply(stripIndents`
				${prefix ? `O prefixo de comando é \`\`${prefix}\`\`.` : 'Não há prefixo definido.'}
				Para usar os comandos, escreva ${msg.anyUsage('comando')}.
			`);
		}

		// Check the user's permission before changing anything
		if(msg.guild) {
			if(!msg.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
				return msg.reply('Apenas administradores podem mudar o prefixo.');
			}
		} else if(!this.client.isOwner(msg.author)) {
			return msg.reply('Apenas os donos dos bots podem mudar o prefixo.');
		}

		// Save the prefix
		const lowercase = args.prefix.toLowerCase();
		const prefix = lowercase === 'none' ? '' : args.prefix;
		let response;
		if(lowercase === 'default') {
			if(msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
			const current = this.client.commandPrefix ? `\`\`${this.client.commandPrefix}\`\`` : 'no prefix';
			response = `Restaura o prefixo padrão \`${current}\`.`;
		} else {
			if(msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
			response = prefix ? `Prefixo de comandos definido como \`\`${args.prefix}\`\`.` : 'Prefixo de comando removido.';
		}

		await msg.reply(`${response} Para usar os comandos, escreva ${msg.anyUsage('comando')}.`);
		return null;
	}
};