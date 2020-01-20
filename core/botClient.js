const { AkairoClient } = require("discord-akairo");

module.exports = class BotClient extends AkairoClient {
  constructor() {
    super({
      ownerID: process.env.OWNER_ID,
      prefix: process.env.PREFIX,
      commandDirectory: "./commands/",
      listenerDirectory: "./listeners/",
      allowMention: true
    });
  }

  async login(token) {
    return await super.login(token);
  }
};
