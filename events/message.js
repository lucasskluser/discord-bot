module.exports = (client, message) => {
  if (message.author.bot) {
    addRoleReactions(message);
    return;
  }

  if (!message.content.startsWith('!')) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let command = client.commands.get(cmd.slice(process.env.PREFIX.length));
  
  if(!command) return;
  
  command(client,message,args);
}

function addRoleReactions(message) {
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
      lore.message
        .react("664285135490777108")
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