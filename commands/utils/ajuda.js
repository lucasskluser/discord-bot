const { stripIndents, oneLine } = require('common-tags');
const { Command } = require("discord.js-commando");
const { disambiguation } = require('../../core/util');

module.exports = class AjudaCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ajuda",
      aliases: ["help"],
      group: "utils",
      memberName: "ajuda",
      description: "Exibe uma lista com todos os comandos disponíveis",
      examples: ["ajuda", "ajuda prefixo"],
      guarded: true,
      args: [
        {
          key: "command",
          prompt: "Qual comando você quer saber mais?",
          type: "string",
          default: ""
        }
      ]
    });
  }

  async run(msg, args) {
    const groups = this.client.registry.groups;
    const commands = this.client.registry.findCommands(
      args.command,
      false,
      msg
    );

    const showAll = args.command && args.command.toLowerCase() === "all";

    if (args.command && !showAll) {
      if (commands.length === 1) {
        let help = stripIndents`
					${oneLine`
						__Command **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? " (Apenas no servidor)" : ""}
						${commands[0].nsfw ? " (NSFW)" : ""}
					`}
					**Formato:** ${msg.anyUsage(
            `${commands[0].name}${
              commands[0].format ? ` ${commands[0].format}` : ""
            }`
          )}
				`;
        if (commands[0].aliases.length > 0)
          help += `\n**Apelidos:** ${commands[0].aliases.join(", ")}`;
        help += `\n${oneLine`
					**Grupo:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
        if (commands[0].details)
          help += `\n**Detalhes:** ${commands[0].details}`;
        if (commands[0].examples)
          help += `\n**Exemplos:**\n${commands[0].examples.join("\n")}`;

        const messages = [];
        try {
          messages.push(await msg.direct(help));
          if (msg.channel.type !== "dm")
            messages.push(await msg.reply("enviei no privado."));
        } catch (err) {
          messages.push(
            await msg.reply(
              "Não consigo enviar mensagens privadas para você. Provavelmente você desativou!"
            )
          );
        }
        return messages;
      } else if (commands.length > 15) {
        return msg.reply("Muitos comandos encontrados. Por favor, seja específico.");
      } else if (commands.length > 1) {
        return msg.reply(disambiguation(commands, "commands"));
      } else {
        return msg.reply(
          `Não consegui identificar o comando. Use ${msg.usage(
            null,
            msg.channel.type === "dm" ? null : undefined,
            msg.channel.type === "dm" ? null : undefined
          )} para ver uma lista com todos os comandos.`
        );
      }
    } else {
      const messages = [];
      try {
        messages.push(
          await msg.direct(
            stripIndents`
					${oneLine`
						Para usar um comando em ${msg.guild ? msg.guild.name : "servidor"},
						use ${Command.usage(
              "comando",
              msg.guild ? msg.guild.commandPrefix : null,
              this.client.user
            )}. Por exemplo, ${Command.usage(
              "ajuda",
              msg.guild ? msg.guild.commandPrefix : null,
              this.client.user
            )}. 
					`} Para usar um comando nessa conversa, simplesmente use ${Command.usage(
            "comando",
            null,
            null
          )} sem o prefixo.
          
          Use ${this.usage(
            "<comando>",
            null,
            null
          )} para ver detalhes de um comando específico.
					Use ${this.usage(
            "all",
            null,
            null
          )} para ver **todos** os comandos disponíveis.
          
          __**${
            showAll
              ? "Todos os comandos"
              : `Comandos disponíveis para ${msg.guild || "essa conversa"}`
          }**__
          
          ${groups
            .filter(grp =>
              grp.commands.some(
                cmd => !cmd.hidden && (showAll || cmd.isUsable(msg))
              )
            )
            .map(
              grp => stripIndents`
							__${grp.name}__
							${grp.commands
                .filter(cmd => !cmd.hidden && (showAll || cmd.isUsable(msg)))
                .map(
                  cmd =>
                    `**${cmd.name}:** ${cmd.description}${
                      cmd.nsfw ? " (NSFW)" : ""
                    }`
                )
                .join("\n")}
						`
            )
            .join("\n\n")}
				`,
            { split: true }
          )
        );
        if (msg.channel.type !== "dm")
          messages.push(await msg.reply("enviei uma mensagem privada para você."));
      } catch (err) {
        messages.push(
          await msg.reply(
            "Não consigo enviar mensagens privadas para você. Provavelmente você desativou!"
          )
        );
      }
      return messages;
    }
  }
};