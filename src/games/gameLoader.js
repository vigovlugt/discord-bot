import TicTacToe from './tictactoe.js';

export default function loadGames(gameManager){
    const games = {
        "tictactoe": TicTacToe
    }
    gameManager.registerGames(games);
}
