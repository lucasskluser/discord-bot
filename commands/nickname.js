const { Command } = require('discord-akairo');

module.exports = class NicknameCommand extends Command {
  constructor() {
    super('nickname', {
      aliases: ['nick', 'name', 'nickname'],
      category: 'Usuario',
      channelRestriction: 'dm',
      description: 'Altera o seu apelido no servidor',
      args: [
        {
          id: 'nickname',
          type: 'string',
          prompt: {
            start: 'Qual apelido você quer definir?'
          }
        }
      ]
    });
  }

  exec(message, args) {
    const guild = this.client.guilds.get(process.env.GUILD_ID);
    const member = guild.members.get(message.author.id);

    if (member.hasPermission("ADMINISTRATOR")) {
      message.reply('Eu não posso alterar o seu apelido porque você é um administrador.');
      return;
    }

    member.setNickname(args.nickname, `Usuário solicitou através do comando ${this.prefix}${this.aliases}`);    
    message.reply(`O seu apelido foi definido como **${args.nickname}**.`);
  }
};