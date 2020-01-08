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

require("dotenv").config();

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

/**
 * Inicialização dos registradores de eventos
 * e comandos do bot
 */
const Discord = require("discord.js");
const EventManager = require("./core/eventManager");

const client = new Discord.Client({ partials: ["CHANNEL", "MESSAGE"] });
client.login(process.env.TOKEN);

EventManager(client, __dirname);
