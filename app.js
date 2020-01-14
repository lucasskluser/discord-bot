/**
 * Arquivo de inicialização da aplicação
 *
 * A aplicação é iniciada e programada para escutar a porta
 * definida nas variáveis de ambiente.
 *
 * Após isso, os eventos e os comandos do bot são registrados.
 *
 * @since 03/01/2020
 * @version 1.2.1
 * @author Lucas Samuel Kluser
 */

const path = require("path");
require("dotenv").config();

console.log(`Aplicação iniciada em ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV === "production") {
  /**
   * Inicialização do monitoramento de exceções
   * do Sentry
   */
  const Sentry = require("@sentry/node");
  Sentry.init({ dsn: process.env.SENTRY_DSN });

  /**
   * Inicialização do servidor express embutido
   * do NodeJS para manter a aplicação online
   */
  const express = require("express");
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", function(req, res) {
    res.sendStatus(200);
  });

  app.listen(port);

  /**
   * Autoping para manter o servidor ativo
   *
   * Realiza uma requisição HTTP GET a cada 29 minutos
   * para manter o servidor online no Heroku
   */
  const https = require("https");

  setInterval(() => {
    console.log("Pinging to keep alive...");
    https.get(`https://anthem-bot-br.herokuapp.com/`);
  }, 1740000);
}

/**
 * Inicialização dos registradores de eventos
 * e comandos do bot
 */
const { CommandoClient } = require("discord.js-commando");

const client = new CommandoClient({
  commandPrefix: "!",
  owner: "352932842944069643",
  invite: "https://discord.gg/xgmEGg",
  unknownCommandResponse: false
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["utils", "Utilidade"],
    ["user", "Para usuários"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    prefix: false
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.login(process.env.TOKEN);

const EventManager = require("./core/eventManager");
EventManager(client, __dirname);