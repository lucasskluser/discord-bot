const { Listener } = require("discord-akairo");
const RoleManager = require('./../utils/roleManager');

module.exports = class ReadyListener extends Listener {
  constructor() {
    super("messageReactionAdd", {
      emitter: "client",
      eventName: "messageReactionAdd",
    });

    this.RoleManager = null;
  }

  async exec(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();

    const roleName = reaction.emoji.name.toLowerCase();
    const member = reaction.message.guild.members.get(user.id);

    if (member.user.bot) return;

    this.RoleManager = new RoleManager(this.client);
    this.RoleManager.addRole(roleName, member).then(
      console.log(`${roleName} adicionado para ${user.tag}`)
    );;
  }
};
