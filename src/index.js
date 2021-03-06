import discord from 'discord.js';
import config from '../config.json';

import CommandManager from './commands/commandManager.js'
import GameManager from './games/gameManager.js'

import loadGames from './games/gameLoader.js'

const client = new discord.Client();

const commandManager = new CommandManager();
const gameManager = new GameManager(commandManager);

//load games
loadGames(gameManager);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.charAt(0) == config.prefix) {
        // Send command to commandManager to do check for valid command and execute it
        commandManager.onMessage(message);
    }
    gameManager.onMessage(message);
});

client.login('MjcwMjkyODc5MjgzNDUzOTYy.DfB6Mw.Ws1UOVrqJs81uMkqjj9ObNEElnI');