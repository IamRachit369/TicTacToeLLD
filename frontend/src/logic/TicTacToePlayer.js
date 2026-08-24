export class TicTacToePlayer {
    constructor(playerId, name, symbol) {
        this.playerId = playerId;
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }

    getName() {
        return this.name;
    }

    getSymbol() {
        return this.symbol;
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
    }
}
