"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Base class for game, to create a new game extend from this
var Game = function () {
    function Game(channel, owner) {
        _classCallCheck(this, Game);

        this.channel = channel;
        this.owner = owner;
        this.players = [];

        this.maxPlayers = 0;
        this.minPlayers = 0;
        this.currentPlayers = 0;

        this.started = false;
        this.onEnd = null;

        this.join(owner);
    }

    _createClass(Game, [{
        key: "join",
        value: function join(player) {
            this.players.push(player);
            this.currentPlayers++;
        }
    }, {
        key: "start",
        value: function start() {
            this.started = true;
        }
    }, {
        key: "end",
        value: function end() {}
    }, {
        key: "onMessage",
        value: function onMessage(message) {}
    }]);

    return Game;
}();

exports.default = Game;