'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

var _commandManager = require('../commands/commandManager.js');

var _commandManager2 = _interopRequireDefault(_commandManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameManager = function () {
    function GameManager(commandManager) {
        var _this = this;

        _classCallCheck(this, GameManager);

        // Dict with games by channelid
        this.games = { "453633789726425112": new _game2.default("453633789726425112", null) };
        this.gameTypes = {};
        // reference to the commandManager
        this.commandManager = commandManager;

        var commands = {
            game: function game(args, message) {
                // create game with game type as args[1]
                if (args[0] === "create") {}
                // join game in that channel
                else if (args[0] === "join") {
                        if (message.channel.id in _this.games) {
                            var game = _this.games[message.channel.id];
                            // check if game not full
                            if (game.currentPlayers < game.maxPlayers) {
                                game.join(message.author);
                                message.channel.send(message.author.username + ' succesfully joined the game, ' + game.currentPlayers + '/' + game.maxPlayers + ' in the game');
                            } else {
                                message.channel.send("That game is already full");
                            }
                        } else {
                            message.channel.send('There is no game running in this channel, to create a game use ' + _config2.default.prefix + 'game create');
                        }
                    }
            }
        };

        commandManager.registerCommands(commands);
    }

    _createClass(GameManager, [{
        key: 'registerGames',
        value: function registerGames(games) {
            this.gameTypes = Object.assign(this.gameTypes, games);
        }
    }]);

    return GameManager;
}();

exports.default = GameManager;