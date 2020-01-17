const { Listener } = require("discord-akairo");
const RoleManager = require("./../utils/roleManager");

module.exports = class ReadyListener extends Listener {
  constructor() {
    super("messageReactionRemove", {
      emitter: "client",
      eventName: "messageReactionRemove"
    });

    this.RoleManager = null;
  }

  async exec(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();

    const roleName = reaction.emoji.name.toLowerCase();
    const member = reaction.message.guild.members.get(user.id);

    if (member.user.bot) return;

    this.RoleManager = new RoleManager(this.client);
    this.RoleManager.removeRole(roleName, member).then(
      console.log(`${roleName} removido para ${user.tag}`)
    );
  }
};
