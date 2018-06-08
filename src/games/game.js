// Base class for game, to create a new game extend from this
export default class Game {
    constructor(channel,owner){
        this.channel = channel;
        this.owner = owner;
        this.players = [];

        this.maxPlayers = 0;
        this.minPlayers = 0;
        this.currentPlayers = 0;

        this.started = false;

        this.join(owner);
    }

    join(player){
        this.players.push(player);
        this.currentPlayers++;
    }

    start(){
        this.started = true;
    }

    end(){

    }

    onMessage(message){
        
    }
}