import { Board } from './Board.js';
import { StandardTicTacToeRules } from './StandardTicTacToeRules.js';

export class TicTacToeGame {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.board = new Board(boardSize);
        this.players = [];
        this.rules = new StandardTicTacToeRules();
        this.gameOver = false;
        this.winner = null;
        this.isDraw = false;
        this.observers = [];
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    notify(msg) {
        for (const observer of this.observers) {
            observer.update(msg);
        }
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getCurrentPlayer() {
        if (this.players.length === 0) return null;
        return this.players[0];
    }
    
    getBoard() {
        return this.board.getFlatBoard();
    }
    
    isGameOver() {
        return this.gameOver;
    }
    
    getWinner() {
        return this.winner;
    }
    
    getIsDraw() {
        return this.isDraw;
    }

    makeMove(row, col) {
        if (this.gameOver) return false;
        if (this.players.length < 2) return false;

        let currentPlayer = this.getCurrentPlayer();

        if (this.rules.isValidMove(this.board, row, col)) {
            this.board.placeMark(row, col, currentPlayer.getSymbol());
            this.notify(`${currentPlayer.getName()} played (${row},${col})`);

            if (this.rules.checkWinCondition(this.board, currentPlayer.getSymbol())) {
                currentPlayer.incrementScore();
                this.winner = currentPlayer;
                this.gameOver = true;
                this.notify(`${currentPlayer.getName()} wins!`);
            } else if (this.rules.checkDrawCondition(this.board)) {
                this.isDraw = true;
                this.gameOver = true;
                this.notify("Game is Draw!");
            } else {
                // switch turns
                this.players.shift();
                this.players.push(currentPlayer);
            }
            return true;
        }
        return false;
    }
}
