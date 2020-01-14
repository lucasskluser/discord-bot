const { Command } = require('discord.js-commando');

class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      group: 'usuario',
      memberName: 'reply',
      description: 'Replies with a Message.',
      examples: ['reply']
    });
  }

  run(msg) {
    return msg.say('Hi, I\'m awake!');
  }
}

module.exports = ReplyCommand;