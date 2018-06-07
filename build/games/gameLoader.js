"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadGames;

var _tictactoe = require("./tictactoe.js");

var _tictactoe2 = _interopRequireDefault(_tictactoe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadGames(gameManager) {
    var games = {
        "tictactoe": _tictactoe2.default
    };
    gameManager.registerGames();
}