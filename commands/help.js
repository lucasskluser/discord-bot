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
        },
        {
          id: "user",
          type: "user",
          match: "prefix",
          prefix: "-u=",
          default: message => message.author
        }
      ]
    });
  }

  exec(message, args) {
    const user = args.user || message.author;
    const member = this.client.guilds
      .get(process.env.GUILD_ID)
      .members.get(user.id);

    const commands = new RichEmbed();
    const data = new Date(message.createdAt);
    const prefix = process.env.PREFIX;

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
        `Comandos disponíveis para o seu usuário.\nPara mais informações, use **\`${prefix}${this.id} <comando>\`**`
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
              list += `**\`${prefix}${command}\`** - ${command.description}\n`;
            } else {
              list += `**\`${prefix}${command}\`**\n`;
            }
          }
        });

        if (list !== "") {
          commands.addField(category.id, list);
        }
      });
    } else {
      const command = this.client.commandHandler.findCommand(args.command);

      if (command === null || command === undefined) {
        message.reply(
          `Não encontrei o comando **\`${prefix}${args.command}\`**.`
        );
        return;
      }

      commands.setTitle(`**\`?${args.command}\`**`);
      commands.setDescription(command.description);
    }

    if (message.channel instanceof TextChannel) {
      if (user.id !== message.author.id) {
        message.reply(`enviei no privado para ${user.tag}.`);
      } else {
        message.reply(`enviei no privado.`);
      }

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
