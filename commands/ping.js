const { Command } = require("discord-akairo");

module.exports = class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ['ping'],
      category: 'Util',
      description: 'Retorna o ping do servidor'
    });
  }

  exec(message) {
    return message.reply('Pinging').then(sent => {
      const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
      const text = `🔂\u2000**RTT**: ${timeDiff} ms\n💟\u2000**Heartbeat**: ${Math.round(this.client.ping)} ms`;
      return message.reply(`Pong!\n${text}`);
    });
  }
}
