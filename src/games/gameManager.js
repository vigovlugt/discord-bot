import discord from 'discord.js';
import config from '../../config.json';

import Game from './game.js';
import CommandManager from '../commands/commandManager.js'

export default class GameManager{
    constructor(commandManager){
        // Dict with games by channelid
        this.games = {};
        this.gameTypes = {};
        // reference to the commandManager
        this.commandManager = commandManager;

        const commands = {
            game: (args,message) => {
                // create game with game type as args[1]
                if(args[0] === "create"){
                    if(!(args[1] in this.gameTypes) ){
                        message.channel.send(`${args[1]} is not a game`);
                    }
                    else{
                        if(message.channel.id in this.games){
                            message.channel.send(`There is already a game runnin in this channel, to join type ${config.prefix}game join`);
                        }
                        else{
                            const game = new this.gameTypes[args[1]](message.channel,message.author);
                            this.games[message.channel.id] = game;
                            message.channel.send(`Game succesfully created, to join type ${config.prefix}game join, ${game.minPlayers - game.currentPlayers} remaining to start, out of max ${game.maxPlayers} players`);
                        }
                    }
                }
                // join game in that channel
                else if(args[0] === "join"){
                    if(message.channel.id in this.games){
                        const game = this.games[message.channel.id];
                        // check if game not full
                        if(message.author.id in game.players){
                            message.channel.send("You are already in that game")
                        }
                        else{
                            if(game.currentPlayers < game.maxPlayers){
                                game.join(message.author);
                                message.channel.send(`${message.author.username} succesfully joined the game, ${game.currentPlayers}/${game.maxPlayers} in the game`)
                            }
                            else{
                                message.channel.send("That game is already full")
                            }
                        }
                    }
                    else{
                        message.channel.send(`There is no game running in this channel, to create a game use ${config.prefix}game create`)
                    }
                }
                else if(args[0] === "start"){
                    if(message.channel.id in this.games){
                        if(message.author === this.games[message.channel.id].owner){
                            if(this.games[message.channel.id].currentPlayers >= this.games[message.channel.id].minPlayers){
                                this.games[message.channel.id].start();
                            }
                            else{
                                message.channel.send(`The minimum amount of players for this game is ${this.games[message.channel.id].minPlayers} while there are only ${this.games[message.channel.id].currentPlayers}`);
                            }
                        }
                        else{
                            message.channel.send(`You are not the owner of this game, only ${this.games[message.channel.id].owner.username} can start the game`);
                        }
                    }
                    else{
                        message.channel.send(`There is no active game in this channel, to start a game type ${config.prefix}game create`);
                    }
                }
            }
        }
        
        commandManager.registerCommands(commands);
    }

    onMessage(message){
        if(message.channel.id in this.games){
            if( this.games[message.channel.id].started ){
                this.games[message.channel.id].onMessage(message);
            }
        }
    }

    registerGames(games){
        this.gameTypes = Object.assign(this.gameTypes,games)
    }
}


