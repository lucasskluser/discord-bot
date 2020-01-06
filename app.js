require('dotenv').config();

const Discord = require("discord.js");
const EventManager = require('./core/eventManager');

const client = new Discord.Client({ partials: ["CHANNEL", "MESSAGE"] });
const path = require('path');

client.login(process.env.TOKEN);

const eventsDir = path.join(__dirname, 'events');
const commandsDir = path.join(__dirname, 'commands');

EventManager.loadEvents(eventsDir, client);
EventManager.loadCommands(commandsDir, client);