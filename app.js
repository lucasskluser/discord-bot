require('dotenv').config();

const Discord = require("discord.js");
const EventManager = require('./core/eventManager');

const client = new Discord.Client({ partials: ["CHANNEL", "MESSAGE"] });
client.login(process.env.TOKEN);

EventManager(client, __dirname);