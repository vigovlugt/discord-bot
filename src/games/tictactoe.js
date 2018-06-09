import discord from 'discord.js';
import config from '../../config.json';

import commandManager from '../index.js'
import Game from './game.js'

export default class TicTacToe extends Game{
    constructor(channel,owner){
        super(channel,owner);

        this.maxPlayers = 2;
        this.minPlayers = 2;
        this.turnIndex = 0;
        this.board = [0,1,2,3,4,5,6,7,8];
        this.winWays = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
    }

    start(){
        super.start();
        this.channel.send(`TicTacToe has started! ${this.owner.username} begins`);
        this.sendBoard();
    }

    onMessage(message){
        super.onMessage(message);
        if(this.players.includes(message.author)){
            const msgInt = parseInt(message.content);
            if(!isNaN(msgInt)){
                if(msgInt >= 0 && msgInt <= 8){
                    if(message.author == this.players[this.turnIndex]){
                        if(this.board[msgInt] === "X" || this.board[msgInt] === "O"){
                            message.channel.send(`That spot is already taken`);
                        }
                        else{
                            this.doTurn(msgInt);
                        }
                    }
                }
            }
        }
    }

    doTurn(cell){
        this.board[cell] = (this.turnIndex === 0) ? "X" : "O"
        this.turnIndex = (this.turnIndex === 0) ? 1 : 0;
        this.sendBoard();
        this.checkWon();
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

    checkWon(){
        for(let winWay of this.winWays){
            let cellValues = [];
            for(let cell of winWay){
                cellValues.push(this.board[cell]);
            }
            if(cellValues[0] === cellValues[1] && cellValues[1] === cellValues[2]){
                const winner = this.players[cellValues[0] === "X" ? 0 : 1];
                this.channel.send(`${winner.username} has won!`);
                this.onEnd();
            }
        }
    }

}