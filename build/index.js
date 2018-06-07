'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _commandManager = require('./commands/commandManager.js');

var _commandManager2 = _interopRequireDefault(_commandManager);

var _gameManager = require('./games/gameManager.js');

var _gameManager2 = _interopRequireDefault(_gameManager);

var _gameLoader = require('./games/gameLoader.js');

var _gameLoader2 = _interopRequireDefault(_gameLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _discord2.default.Client();

var commandManager = new _commandManager2.default();
var gameManager = new _gameManager2.default(commandManager);

//load games
(0, _gameLoader2.default)(gameManager);

client.on('ready', function () {
    console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function (message) {
    if (message.content.charAt(0) == _config2.default.prefix) {
        // Send command to commandManager to do check for valid command and execute it
        commandManager.onMessage(message);
    }
});

client.login('MjcwMjkyODc5MjgzNDUzOTYy.DfB6Mw.Ws1UOVrqJs81uMkqjj9ObNEElnI');