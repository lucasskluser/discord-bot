const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      eventName: 'ready',
      type: 'once'
    });
  }

  exec() {
    console.log(`Logado como ${this.client.user.tag}`);
  }
};
