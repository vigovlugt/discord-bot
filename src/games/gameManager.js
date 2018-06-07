import discord from 'discord.js';
import config from '../../config.json';

import Game from './game.js';
import CommandManager from '../commands/commandManager.js'

export default class GameManager{
    constructor(commandManager){
        // Dict with games by channelid
        this.games = {"453633789726425112":new Game("453633789726425112",null)};
        this.gameTypes = {};
        // reference to the commandManager
        this.commandManager = commandManager;

        const commands = {
            game: (args,message) => {
                // create game with game type as args[1]
                if(args[0] === "create"){
                    
                }
                // join game in that channel
                else if(args[0] === "join"){
                    if(message.channel.id in this.games){
                        const game = this.games[message.channel.id];
                        // check if game not full
                        if(game.currentPlayers < game.maxPlayers){
                            game.join(message.author);
                            message.channel.send(`${message.author.username} succesfully joined the game, ${game.currentPlayers}/${game.maxPlayers} in the game`)
                        }
                        else{
                            message.channel.send("That game is already full")
                        }
                    }
                    else{
                        message.channel.send(`There is no game running in this channel, to create a game use ${config.prefix}game create`)
                    }
                }
            }
        }
        
        commandManager.registerCommands(commands);
    }

    registerGames(games){
        this.gameTypes = Object.assign(this.gameTypes,games)
    }
}


