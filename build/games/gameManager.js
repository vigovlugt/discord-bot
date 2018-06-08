'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _game2 = require('./game.js');

var _game3 = _interopRequireDefault(_game2);

var _commandManager = require('../commands/commandManager.js');

var _commandManager2 = _interopRequireDefault(_commandManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameManager = function () {
    function GameManager(commandManager) {
        var _this = this;

        _classCallCheck(this, GameManager);

        // Dict with games by channelid
        this.games = {};
        this.gameTypes = {};
        // reference to the commandManager
        this.commandManager = commandManager;

        var commands = {
            game: function game(args, message) {
                // create game with game type as args[1]
                if (args[0] === "create") {
                    if (!(args[1] in _this.gameTypes)) {
                        message.channel.send(args[1] + ' is not a game');
                    } else {
                        if (message.channel.id in _this.games) {
                            message.channel.send('There is already a game runnin in this channel, to join type ' + _config2.default.prefix + 'game join');
                        } else {
                            var game = new _this.gameTypes[args[1]](message.channel, message.author);
                            _this.games[message.channel.id] = game;
                            message.channel.send('Game succesfully created, to join type ' + _config2.default.prefix + 'game join, ' + (game.minPlayers - game.currentPlayers) + ' remaining to start, out of max ' + game.maxPlayers + ' players');
                        }
                    }
                }
                // join game in that channel
                else if (args[0] === "join") {
                        if (message.channel.id in _this.games) {
                            var _game = _this.games[message.channel.id];
                            // check if game not full
                            if (message.author.id in _game.players) {
                                message.channel.send("You are already in that game");
                            } else {
                                if (_game.currentPlayers < _game.maxPlayers) {
                                    _game.join(message.author);
                                    message.channel.send(message.author.username + ' succesfully joined the game, ' + _game.currentPlayers + '/' + _game.maxPlayers + ' in the game');
                                } else {
                                    message.channel.send("That game is already full");
                                }
                            }
                        } else {
                            message.channel.send('There is no game running in this channel, to create a game use ' + _config2.default.prefix + 'game create');
                        }
                    } else if (args[0] === "start") {
                        if (message.channel.id in _this.games) {
                            if (message.author === _this.games[message.channel.id].owner) {
                                if (_this.games[message.channel.id].currentPlayers >= _this.games[message.channel.id].minPlayers) {
                                    _this.games[message.channel.id].start();
                                } else {
                                    message.channel.send('The minimum amount of players for this game is ' + _this.games[message.channel.id].minPlayers + ' while there are only ' + _this.games[message.channel.id].currentPlayers);
                                }
                            } else {
                                message.channel.send('You are not the owner of this game, only ' + _this.games[message.channel.id].owner.username + ' can start the game');
                            }
                        } else {
                            message.channel.send('There is no active game in this channel, to start a game type ' + _config2.default.prefix + 'game create');
                        }
                    }
            }
        };

        commandManager.registerCommands(commands);
    }

    _createClass(GameManager, [{
        key: 'onMessage',
        value: function onMessage(message) {
            if (message.channel.id in this.games) {
                if (this.games[message.channel.id].started) {
                    this.games[message.channel.id].onMessage(message);
                }
            }
        }
    }, {
        key: 'registerGames',
        value: function registerGames(games) {
            this.gameTypes = Object.assign(this.gameTypes, games);
        }
    }]);

    return GameManager;
}();

exports.default = GameManager;