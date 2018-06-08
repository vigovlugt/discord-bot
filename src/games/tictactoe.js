import discord from 'discord.js';
import config from '../../config.json';

import commandManager from '../index.js'
import Game from './game.js'

export default class TicTacToe extends Game{
    constructor(channel,owner){
        super(channel,owner);

        this.maxPlayers = 2;
        this.minPlayers = 2;

        this.turnUser = owner;
        this.board = [0,1,2,3,4,5,6,7,8];
    }

    start(){
        super.start();
        this.channel.send(`TicTacToe has started! ${this.owner.username} begins`);
        this.sendBoard();
    }

    onMessage(message){
        super.onMessage(message);
        console.log(message.content,parseInt(message.content),isNaN(message.content))
        if(this.players.includes(message.author)){
            const msgInt = parseInt(message.content);
            if(!isNaN(msgInt)){
                if(msgInt >= 0 && msgInt <= 8){
                    if(message.author == this.turnUser){
                        this.doTurn(msgInt);
                    }
                }
            }
        }
    }

    doTurn(cell){
        this.board[cell] = (this.owner === this.turnUser) ? "X" : "O"
        this.turnUser = (this.owner === this.turnUser) ? this.players[1] : this.owner;
        this.sendBoard();
    }

    sendBoard(){
        //TODO: improve this shit
        let boardString = `
-----------
| ${this.board[0]} | ${this.board[1]} | ${this.board[2]} |
-----------
| ${this.board[3]} | ${this.board[4]} | ${this.board[5]} |
-----------
| ${this.board[6]} | ${this.board[7]} | ${this.board[8]} |
-----------
        `
        this.channel.send(boardString);
    }

}