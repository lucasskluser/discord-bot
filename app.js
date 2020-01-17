/**
 * Arquivo de inicialização da aplicação
 *
 * A aplicação é iniciada e programada para escutar a porta
 * definida nas variáveis de ambiente.
 *
 * Após isso, os eventos e os comandos do bot são registrados.
 *
 * @version 2.0.0
 * @date 17/01/2020
 * @since 03/01/2020
 * @author Lucas Samuel Kluser
 */
require("dotenv").config();

/**
 * Se o app estiver em ambiente de produção,
 * carrega o monitor de exceções, servidor Express
 * e realiza um autoping a cada 29min
 */
if (process.env.ENV === "production") {
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
    console.log("Autorequisição para manter o servidor ativo...");
    https.get(process.env.HEROKU_URL);
  }, 1740000);
}

/**
 * Inicialização do cliente Akairo
 */
const { AkairoClient } = require("discord-akairo");

const client = new AkairoClient({
  ownerID: process.env.OWNER_ID,
  prefix: process.env.PREFIX,
  commandDirectory: "./commands/",
  listenerDirectory: "./listeners/",
  allowMention: true
});

client.login(process.env.TOKEN);