import discord from 'discord.js';
import config from '../../config.json';

import commandManager from '../index.js'
import Game from './game.js'

export default class TicTacToe extends Game{
    constructor(channel,owner){
        super(channel,owner);
    }
}