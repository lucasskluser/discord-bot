const Discord = require('discord.js');
const template = require('./../templates/messages.json');

module.exports = (client, member) => {
  if (member.user.bot) return;

  member.user.send(
    template.guildMemberAdd.first
  );

  member.user.send(
    "Qualquer dúvida, é só chamar um agente @Corvus ou um @Sentinela. Nos vemos em Forte Tarsis! :wink:"
  );

  const nickname = new Discord.RichEmbed();
  nickname.setTitle("Mudança de apelido");
  nickname.setColor("BLUE");
  nickname.setDescription(
    `Use o comando \`${process.env.PREFIX}nickname\` nesta conversa seguido do seu nome no jogo para alterar seu apelido no servidor.`
  );
  member.user.send(nickname);
};
