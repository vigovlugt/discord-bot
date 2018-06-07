import "discord.js";
import config from "../../config.json"

export class CommandManager{
    constructor(){
        this.commands = {};
    }

    //Add a new command to the register
    registerCommands(commands){
        this.commands = Object.assign(this.commands,commands);
    }

    //Check for valid command
    onMessage(message){ 
        const args = message.content.split(" ").shift();
        const command = message.content.split(" ")[0].slice(1);
        if(command in this.commands){
            executeCommand(command,args,message);
        }
        else{
            message.reply(`${command} is not a valid command, to check all commands, type ${config.prefix}help`);
        }
    }

    executeCommand(command,args,message){
        this.commands["command"](args,message);
    }
}