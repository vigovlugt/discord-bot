"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("discord.js");

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommandManager = function () {
    function CommandManager() {
        _classCallCheck(this, CommandManager);

        this.commands = {};
    }

    //Add a new command to the register


    _createClass(CommandManager, [{
        key: "registerCommands",
        value: function registerCommands(commands) {
            this.commands = Object.assign(this.commands, commands);
        }

        //Check for valid command

    }, {
        key: "onMessage",
        value: function onMessage(message) {
            var args = message.content.split(" ");
            args.shift();

            var command = message.content.split(" ")[0].slice(1);

            if (command in this.commands) {
                this.executeCommand(command, args, message);
            } else {
                message.reply(command + " is not a valid command, to check all commands, type " + _config2.default.prefix + "help");
            }
        }
    }, {
        key: "executeCommand",
        value: function executeCommand(command, args, message) {
            this.commands[command](args, message);
        }
    }]);

    return CommandManager;
}();

exports.default = CommandManager;