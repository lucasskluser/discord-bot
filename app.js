require('dotenv').config();

import { Client } from "discord.js";
import { loadEvents, loadCommands } from './core/managers/eventManager';

const path = require('path');
const client = new Client({ partials: ["CHANNEL", "MESSAGE"] });

client.login(process.env.TOKEN);

const eventsDir = path.join(__dirname, 'events');
const commandsDir = path.join(__dirname, 'commands');
loadEvents(eventsDir, client);
loadCommands(commandsDir, client);