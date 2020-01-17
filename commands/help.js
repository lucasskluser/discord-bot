const { Command } = require("discord-akairo");
const { RichEmbed, TextChannel } = require("discord.js");

module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "ajuda", "h"],
      category: "Util",
      description: "Lista todos os comandos disponíveis",
      args: [
        {
          id: "command",
          type: "string",
          default: "all"
        }
      ]
    });
  }

  exec(message, args) {
    const member = this.client.guilds
      .get(process.env.GUILD_ID)
      .members.get(message.author.id);

    const commands = new RichEmbed();
    const data = new Date(message.createdAt);

    commands.setColor("BLUE");
    commands.setFooter(
      `Solicitado por ${message.author.tag} em ${appendingZero(
        data.getDate()
      )}/${appendingZero(
        data.getMonth() + 1
      )}/${data.getFullYear()} - ${appendingZero(
        data.getHours()
      )}:${appendingZero(data.getMinutes())}`
    );

    if (args.command === "all") {
      commands.setTitle("Alguém precisa de ajuda?");
      commands.setDescription(
        `Comandos disponíveis para o seu usuário.\nPara mais informações, use \`?${this.id} <comando>\``
      );

      this.client.commandHandler.categories.forEach(category => {
        let list = "";

        category.forEach(command => {
          let hasPermission = true;

          if (
            (command.userPermissions &&
              !member.permissions.has(command.userPermissions)) ||
            (command.ownerOnly && this.client.ownerID !== message.author.id)
          ) {
            hasPermission = false;
          }

          if (command.enabled && hasPermission) {
            if (command.description !== "") {
              list += `**\`?${command}\`** - ${command.description}\n`;
            } else {
              list += `**\`?${command}\`**\n`;
            }
          }
        });

        commands.addField(category.id, list);
      });
    } else {
      const command = this.client.commandHandler.findCommand(args.command);

      if (command === null) {
        message.reply(`Não encontrei o comando \`${args.command}\``);
        return;
      }

      commands.setTitle(`**\`?${args.command}\`**`);
      commands.setDescription(command.description);
    }

    if (message.channel instanceof TextChannel) {
      message.reply("enviei no privado.");
      member.send(commands);
    } else {
      member.send(commands);
    }
  }
};

function appendingZero(n) {
  if (n <= 9) {
    return "0" + n;
  }

  return n;
}
