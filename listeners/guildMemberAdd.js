const { Listener } = require("discord-akairo");
const { RichEmbed } = require('discord.js');

module.exports = class ReadyListener extends Listener {
  constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      eventName: "guildMemberAdd"
    });
  }

  exec(member) {
    member.send("**Olá, Freelancer!**\nObrigado por se juntar ao servidor Anthem:tm: Brasil. Dê uma olhada em <#662847251676397588> para habilitar os canais para seu usuário.");
    member.send("Qualquer dúvida, é só chamar um agente @Corvus ou um @Sentinela. Nos vemos em Forte Tarsis! :wink:");

    const nickname = new RichEmbed();
    nickname.setTitle("Mudança de apelido");
    nickname.setColor("BLUE");
    nickname.setDescription(
      `Use o comando \`?${this.client.commandHandler.findCommand('nickname').id}\` nesta conversa seguido do seu nome no jogo para alterar seu apelido no servidor.`
    );
    member.send(nickname);
  }
};
