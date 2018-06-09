'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TicTacToe = function (_Game) {
    _inherits(TicTacToe, _Game);

    function TicTacToe(channel, owner) {
        _classCallCheck(this, TicTacToe);

        var _this = _possibleConstructorReturn(this, (TicTacToe.__proto__ || Object.getPrototypeOf(TicTacToe)).call(this, channel, owner));

        _this.maxPlayers = 2;
        _this.minPlayers = 2;
        _this.turnIndex = 0;
        _this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        _this.winWays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return _this;
    }

    _createClass(TicTacToe, [{
        key: 'start',
        value: function start() {
            _get(TicTacToe.prototype.__proto__ || Object.getPrototypeOf(TicTacToe.prototype), 'start', this).call(this);
            this.channel.send('TicTacToe has started! ' + this.owner.username + ' begins');
            this.sendBoard();
        }
    }, {
        key: 'onMessage',
        value: function onMessage(message) {
            _get(TicTacToe.prototype.__proto__ || Object.getPrototypeOf(TicTacToe.prototype), 'onMessage', this).call(this, message);
            if (this.players.includes(message.author)) {
                var msgInt = parseInt(message.content);
                if (!isNaN(msgInt)) {
                    if (msgInt >= 0 && msgInt <= 8) {
                        if (message.author == this.players[this.turnIndex]) {
                            if (this.board[msgInt] === "X" || this.board[msgInt] === "O") {
                                message.channel.send('That spot is already taken');
                            } else {
                                this.doTurn(msgInt);
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: 'doTurn',
        value: function doTurn(cell) {
            this.board[cell] = this.turnIndex === 0 ? "X" : "O";
            this.turnIndex = this.turnIndex === 0 ? 1 : 0;
            this.sendBoard();
            this.checkWon();
        }
    }, {
        key: 'sendBoard',
        value: function sendBoard() {
            //TODO: improve this shit
            var boardString = '\n-----------\n| ' + this.board[0] + ' | ' + this.board[1] + ' | ' + this.board[2] + ' |\n-----------\n| ' + this.board[3] + ' | ' + this.board[4] + ' | ' + this.board[5] + ' |\n-----------\n| ' + this.board[6] + ' | ' + this.board[7] + ' | ' + this.board[8] + ' |\n-----------\n        ';
            this.channel.send(boardString);
        }
    }, {
        key: 'checkWon',
        value: function checkWon() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.winWays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var winWay = _step.value;

                    var cellValues = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = winWay[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var cell = _step2.value;

                            cellValues.push(this.board[cell]);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (cellValues[0] === cellValues[1] && cellValues[1] === cellValues[2]) {
                        var winner = this.players[cellValues[0] === "X" ? 0 : 1];
                        this.channel.send(winner.username + ' has won!');
                        this.onEnd();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return TicTacToe;
}(_game2.default);

exports.default = TicTacToe;