const UnknownCommandCommand = require('../commands/utils/unknown-command');

module.exports = (client, message) => {
    const unknownCommand = new UnknownCommandCommand(client);
    unknownCommand.run(message);
}