const { Command } = require("discord.js-commando");

module.exports = class NicknameCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nickname",
      aliases: ["nick", "name"],
      group: "user",
      memberName: "nickname",
      description: "Altera o seu apelido no servidor",
      examples: ["nickname nomeLegal"],
      args: [
        {
          key: "nickname",
          prompt: "Qual o apelido que você quer usar?",
          type: "string"
        }
      ],
      argsType: 'single'
    });
  }

  hasPermission(msg, ownerOverride = false) {
    const guildMembers = this.client.guilds.find(guild => guild.id === process.env.GUILD_ID).members;
    const member = guildMembers.find(member => member.user.id === msg.author.id);

    return member.roles.find(role => role.hasPermission('ADMINISTRATOR')) === null;
  }

  onBlock(message, reason, data = null) {
    console.log(reason);
  }

  onError(err, message, args, fromPattern, result) {
    message.reply('Não consegui alterar o seu apelido. Por favor, converse com um agente @Corvus ou @Sentinela!');
  }

  run(msg, args) {
      const guildMembers = this.client.guilds.find(guild => guild.id === process.env.GUILD_ID).members;
      const member = guildMembers.find(member => member.user.id === msg.author.id);

      try {
        member.setNickname(args.nickname)
      .catch(
        'Não consegui alterar o seu apelido. Por favor, converse com um agente @Corvus ou @Sentinela!'
      );

      msg.reply(`O seu apelido foi alterado para **${args.nickname}**.`)
      } catch {
        msg.reply('Não consegui alterar o seu apelido. Por favor, converse com um agente @Corvus ou @Sentinela!');
      }
    ;
  }
};
