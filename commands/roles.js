const { Command } = require("discord-akairo");
const { RichEmbed } = require('discord.js');

module.exports = class RolesCommand extends Command {
  constructor() {
    super("roles", {
      aliases: ["roles"],
      userPermissions: ["MANAGE_CHANNELS"],
      category: "Moderacao",
      description: "Lista os cargos disponíveis no servidor",
      protected: true,
      channelRestriction: "guild"
    });
  }

  exec(message) {
    message.channel.send(
      "Olá, Freelancer! Para acessar outros canais em nosso servidor, reaja de acordo com suas preferências abaixo."
    );

    const plataformas = new RichEmbed();
    plataformas.setTitle("Definição de Plataforma");
    plataformas.setColor("RED");
    plataformas.setDescription(
      "Reaja com cada uma das plataformas que você joga clicando no ícone correspondente abaixo."
    );
    message.channel.send(plataformas);

    const lancas = new RichEmbed();
    lancas.setTitle("Definição opcional de Lança");
    lancas.setColor("GREEN");
    lancas.setDescription(
      "Reaja com as lanças que você prefere jogar clicando no ícone correspondente abaixo. O seu nome assumirá a cor da lança escolhida.\n<:patrulheiro:662873658334773288> <@&662871633618403348>\n<:colosso:662873694812504094> <@&662871756318572595>\n<:interceptador:662873724374220800> <@&662871836236709900>\n<:tempestade:662873751154589698> <@&662871899780677651>"
    );
    message.channel.send(lancas);

    const lore = new RichEmbed();
    lore.setTitle("Torne-se um Arcanista");
    lore.setColor("BLUE");
    lore.setDescription("Reaja abaixo se você deseja acessar os canais de discussões sobre a história de Anthem.");
    message.channel.send(lore);

    const builds = new RichEmbed();
    builds.setTitle("Torne-se o próximo Arden Vassa");
    builds.setColor("BLUE");
    builds.setDescription(
      "Reaja abaixo se você deseja acessar os canais de discussões sobre builds."
    );
    message.channel.send(builds);
  }
};
