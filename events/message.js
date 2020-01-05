module.exports = (client, message) => {
  if (message.content.startsWith('!')) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let command = client.commands.get(cmd.slice(process.env.PREFIX.length));
  
  if(!command) return;    
    command(client,message,args);
  }
  
  // if (message.author.bot) {
  //   if (message.embeds) {
  //     const plataformas = message.embeds.find(
  //       msg => msg.title === "Definição de Plataforma"
  //     );

  //     if (plataformas) {
  //       plataformas.message
  //         .react("662861112878039050")
  //         .then(reaction => reaction.message.react("662861125922062347"))
  //         .then(reaction => reaction.message.react("662861149397581861"))
  //         .catch(err => console.log(err));
  //     }

  //     const lancas = message.embeds.find(
  //       msg => msg.title === "Definição opcional de Lança"
  //     );

  //     if (lancas) {
  //       lancas.message
  //         .react("662873658334773288")
  //         .then(reaction => reaction.message.react("662873694812504094"))
  //         .then(reaction => reaction.message.react("662873724374220800"))
  //         .then(reaction => reaction.message.react("662873751154589698"))
  //         .catch(err => console.log(err));
  //     }

  //     const lore = message.embeds.find(
  //       msg => msg.title === "Torne-se um Arcanista"
  //     );

  //     if (lore) {
  //       builds.message
  //         .react("662875147287658502")
  //         .catch(err => console.log(err));
  //     }

  //     const builds = message.embeds.find(
  //       msg => msg.title === "Torne-se o próximo Arden Vassa"
  //     );

  //     if (builds) {
  //       builds.message
  //         .react("662875147287658502")
  //         .catch(err => console.log(err));
  //     }
  //   }
  //   return;

  // }

  // if (message.content.toLowerCase() === "!roles") {
  //   if(message.channel.type === 'dm') return;
  //   if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

  //   message.channel.send(
  //     "Olá, Freelancer! Para acessar outros canais em nosso servidor, reaja de acordo com suas preferências abaixo."
  //   );

  //   const plataformas = new RichEmbed();
  //   plataformas.setTitle("Definição de Plataforma");
  //   plataformas.setColor("RED");
  //   plataformas.setDescription(
  //     "Reaja com cada uma das plataformas que você joga clicando no ícone correspondente abaixo."
  //   );
  //   message.channel.send(plataformas);

  //   const lancas = new RichEmbed();
  //   lancas.setTitle("Definição opcional de Lança");
  //   lancas.setColor("GREEN");
  //   lancas.setDescription(
  //     "Reaja com as lanças que você prefere jogar clicando no ícone correspondente abaixo. O seu nome assumirá a cor da lança escolhida.\n<:patrulheiro:662873658334773288> <@&662871633618403348>\n<:colosso:662873694812504094> <@&662871756318572595>\n<:interceptador:662873724374220800> <@&662871836236709900>\n<:tempestade:662873751154589698> <@&662871899780677651>"
  //   );
  //   message.channel.send(lancas);

  //   const builds = new RichEmbed();
  //   builds.setTitle("Torne-se o próximo Arden Vassa");
  //   builds.setColor("BLUE");
  //   builds.setDescription(
  //     "Reaja abaixo se você deseja acessar os canais de discussões sobre builds."
  //   );
  //   message.channel.send(builds);
  // }

  // if (message.content.startsWith("!nickname")) {
  //   if (!(message.channel.type === 'dm')) return;

  //   const nick = message.content.split(" ")[1];

  //   client.guilds.get('662399736724324362').members.get(message.author.id).setNickname(nick).then(console.log(`Nickname de ${message.author.username} alterado`)).catch(err => console.log(err));

  //   message.channel.send(`O seu apelido foi alterado para **${nick}**.`);
  // }
