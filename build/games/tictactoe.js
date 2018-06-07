'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        return _possibleConstructorReturn(this, (TicTacToe.__proto__ || Object.getPrototypeOf(TicTacToe)).call(this, channel, owner));
    }

    return TicTacToe;
}(_game2.default);

exports.default = TicTacToe;