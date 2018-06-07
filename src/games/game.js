// Base class for game, to create a new game extend from this
export default class Game {
    constructor(channel,owner){
        this.channel = channel;
        this.players = [owner];

        this.maxPlayers = 0;
        this.currentPlayers = 0;
    }

    join(player){
        this.players.push(player)
    }

    onMessage(){

    }
}