import { TicTacToeGame } from './TicTacToeGame.js';

export const GameType = {
    STANDARD: 'STANDARD',
    TIME_BATTLE : 'TIME_BATTLE'
};

export class TicTacToeGameFactory {
    static createGame(gt, boardSize) {
        if (gt === GameType.STANDARD) {
            return new TicTacToeGame(boardSize);
        }
        return null;
    }
}
