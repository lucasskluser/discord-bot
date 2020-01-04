const RoleManager = require('./commands/roleManager.js');

const { Client, RichEmbed } = require("discord.js");
const client = new Client({ partials: ["CHANNEL", "MESSAGE"] });
const config = require("./config.json");

client.on("ready", () => {
  console.log("O bot foi iniciado.");
  client.user.setPresence({ game: { name: "Anthem™" } });
});

client.on("message", async message => {
  if (message.author.bot) {
    if (message.embeds) {
      const plataformas = message.embeds.find(
        msg => msg.title === "Definição de Plataforma"
      );

      if (plataformas) {
        plataformas.message
          .react("662861112878039050")
          .then(reaction => reaction.message.react("662861125922062347"))
          .then(reaction => reaction.message.react("662861149397581861"))
          .catch(err => console.log(err));
      }

      const lancas = message.embeds.find(
        msg => msg.title === "Definição opcional de Lança"
      );

      if (lancas) {
        lancas.message
          .react("662873658334773288")
          .then(reaction => reaction.message.react("662873694812504094"))
          .then(reaction => reaction.message.react("662873724374220800"))
          .then(reaction => reaction.message.react("662873751154589698"))
          .catch(err => console.log(err));
      }

      const lore = message.embeds.find(
        msg => msg.title === "Torne-se um Arcanista"
      );

      if (lore) {
        builds.message
          .react("662875147287658502")
          .catch(err => console.log(err));
      }

      const builds = message.embeds.find(
        msg => msg.title === "Torne-se o próximo Arden Vassa"
      );

      if (builds) {
        builds.message
          .react("662875147287658502")
          .catch(err => console.log(err));
      }
    }
    return;
  }

  if (message.content.startsWith("!nickname")) {
    if (!(message.channel.type === 'dm')) return;

    const nick = message.content.split(" ")[1];

    client.guilds.get('662399736724324362').members.get(message.author.id).setNickname(nick).then(console.log(`Nickname de ${message.author.username} alterado`)).catch(err => console.log(err));

    message.channel.send(`O seu apelido foi alterado para **${nick}**.`);
  }

  if (message.content.toLowerCase() === '!bemvindo') {
    if (!(message.channel.type === 'dm')) {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    }

    message.channel.send(
      '**Olá, Freelancer!**\nObrigado por se juntar ao servidor Anthem:tm: Brasil. Dê uma olhada em <#662847251676397588> para habilitar os canais para seu usuário.'
    );

    const nickname = new RichEmbed();
    nickname.setTitle("Mudança de apelido");
    nickname.setColor("BLUE");
    nickname.setDescription(
      `Use o comando \`${config.prefix}nickname\` nesta conversa seguido do seu nome no jogo para alterar seu apelido no servidor.`
    );
    message.channel.send(nickname);

    message.channel.send(
      'Qualquer dúvida, é só chamar um agente @Corvus ou um @Sentinela. Nos vemos em Forte Tarsis! :wink:'
    );
  }

  if (message.content.toLowerCase() === "!roles") {
    if(message.channel.type === 'dm') return;
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    

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

    // const lore = new RichEmbed();
    // lore.setTitle("Torne-se um Arcanista");
    // lore.setColor("BLUE");
    // lore.setDescription("Reaja abaixo se você deseja acessar os canais de discussões sobre a história de Anthem.");
    // message.channel.send(lore);

    const builds = new RichEmbed();
    builds.setTitle("Torne-se o próximo Arden Vassa");
    builds.setColor("BLUE");
    builds.setDescription(
      "Reaja abaixo se você deseja acessar os canais de discussões sobre builds."
    );
    message.channel.send(builds);
  }

  // if (message.content.toLowerCase().startsWith('!registro')) {
  //     const nickname = message.content.split(" ")[1];
  //     var role = message.guild.roles.find(role => role.name.toLowerCase() === 'membro');
  //     var member = message.guild.members.find(member => member.id === user.id);

  //     if (member.user.bot) return;

  //     member.setNickname(nickname, "Definição de apelido inicial via registro de membro").catch(err => console.log(err));

  //     member
  //         .addRole(role.id)
  //         .catch(err => console.log(err));

  //     message.channel.send("Olá, freelancer! Obrigado por se registrar como um membro em nosso servidor.\nAgora, você já pode definir sua plataforma de jogos em <#662848999581024272>.\n\nAté mais! 😉");
  // }
});

client.on("messageReactionAdd", async function(reaction, user) {
  if (reaction.message.partial) await reaction.message.fetch();

  var roleName = reaction.emoji.name;
  var member = reaction.message.guild.members.find(
    member => member.id === user.id
  );

  var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

    if (member.user.bot) return;

    member
        .addRole(role.id)
        .catch(err => console.log(err));

    console.log(`${roleName} adicionado para ${member.user.username}`);
});

client.on("messageReactionRemove", async function(reaction, user) {
  if (reaction.message.partial) await reaction.message.fetch();

  var roleName = reaction.emoji.name;
  var role = reaction.message.guild.roles.find(
    role => role.name.toLowerCase() === roleName.toLowerCase()
  );
  var member = reaction.message.guild.members.find(
    member => member.id === user.id
  );

  if (member.user.bot) return;

  member.removeRole(role.id).catch(err => console.log(err));

  console.log(`${roleName} removido para ${member.user.username}`);
});

client.on("guildMemberAdd", member => {
  member.send(
    `**Olá, Freelancer!**
Obrigado por se juntar ao servidor Anthem:tm: Brasil. Dê uma olhada em <#662847251676397588> para habilitar os canais para seu usuário.
    
Qualquer dúvida, só chamar um agente @Corvus ou um @Sentinela. Até mais! :wink:`
  );
});

// check for reactions on unloaded messages and trigger the appropriate events
client.on("raw", packet => {
  if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t))
    return;
  const channel = client.channels.get(packet.d.channel_id);
  if (channel.messages.has(packet.d.message_id)) return;
  channel.fetchMessage(packet.d.message_id).then(message => {
    const emoji = packet.d.emoji.id
      ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
      : packet.d.emoji.name;
    const reaction = message.reactions.get(emoji);
    if (packet.t === "MESSAGE_REACTION_ADD") {
      client.emit(
        "messageReactionAdd",
        reaction,
        client.users.get(packet.d.user_id)
      );
    }
    if (packet.t === "MESSAGE_REACTION_REMOVE") {
      client.emit(
        "messageReactionRemove",
        reaction,
        client.users.get(packet.d.user_id)
      );
    }
  });
});

client.login(config.token);
