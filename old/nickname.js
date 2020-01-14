module.exports = (client, message) => {
  if (!(message.channel.type === "dm")) return;

  const nick = message.content.split(" ")[1];
  const guild = client.guilds.get(process.env.GUILD_ID);
  const member = guild.members.get(message.author.id);

  member
    .setNickname(nick)
    .then(message.channel.send(`O seu apelido foi alterado para **${nick}**.`))
    .catch(err => {
      console.log(err);
      message.channel.send('Ops, não consegui alterar o seu apelido. :confused:');
    })
};
