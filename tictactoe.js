const { stdin: input, stdout: output } = require('process');
const readline = require('readline/promises');

class Symbol {
    constructor(mark) {
        this.mark = mark;
    }

    getMark() {
        return this.mark;
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.emptyCell = new Symbol('-');
        this.grid = Array.from({ length: size }, () => Array(size).fill(this.emptyCell));
    }

    isCellEmpty(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return false;
        }
        return this.grid[row][col] === this.emptyCell;
    }

    placeMark(row, col, mark) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return false;
        }
        if (!this.isCellEmpty(row, col)) {
            return false;
        }
        this.grid[row][col] = mark;
        return true;
    }

    getCell(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return this.emptyCell;
        }
        return this.grid[row][col];
    }

    getSize() {
        return this.size;
    }

    getEmptyCell() {
        return this.emptyCell;
    }

    display() {
        let out = "\n  ";
        for (let i = 0; i < this.size; i++) {
            out += i + " ";
        }
        out += "\n";

        for (let i = 0; i < this.size; i++) {
            out += i + " ";
            for (let j = 0; j < this.size; j++) {
                out += this.grid[i][j].getMark() + " ";
            }
            out += "\n";
        }
        console.log(out);
    }
}

class ConsoleNotifier {
    update(msg) {
        console.log(`[Notification] ${msg}`);
    }
}

class StandardTicTacToeRules {
    isValidMove(board, row, col) {
        return board.isCellEmpty(row, col);
    }

    checkWinCondition(board, symbol) {
        const size = board.getSize();

        // Check rows
        for (let i = 0; i < size; i++) {
            let win = true;
            for (let j = 0; j < size; j++) {
                if (board.getCell(i, j) !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        // Check columns
        for (let j = 0; j < size; j++) {
            let win = true;
            for (let i = 0; i < size; i++) {
                if (board.getCell(i, j) !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        // Check main diagonal
        let win = true;
        for (let i = 0; i < size; i++) {
            if (board.getCell(i, i) !== symbol) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // Check anti-diagonal
        win = true;
        for (let i = 0; i < size; i++) {
            if (board.getCell(i, size - 1 - i) !== symbol) {
                win = false;
                break;
            }
        }
        return win;
    }

    checkDrawCondition(board) {
        const size = board.getSize();
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board.getCell(i, j) === board.getEmptyCell()) {
                    return false;
                }
            }
        }
        return true;
    }
}

class TicTacToePlayer {
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

class TicTacToeGame {
    constructor(boardSize) {
        this.board = new Board(boardSize);
        this.players = [];
        this.rules = new StandardTicTacToeRules();
        this.observers = [];
        this.gameOver = false;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(msg) {
        for (const observer of this.observers) {
            observer.update(msg);
        }
    }

    async play(rl) {
        if (this.players.length < 2) {
            console.log("Need at least 2 players!");
            return;
        }

        this.notify("Tic Tac Toe Game Started!");

        while (!this.gameOver) {
            this.board.display();

            let currentPlayer = this.players[0];
            const input = await rl.question(`${currentPlayer.getName()} (${currentPlayer.getSymbol().getMark()}) - Enter row and column (e.g. 0 1): `);
            
            const parts = input.trim().split(/\s+/);
            if (parts.length < 2) {
                console.log("Invalid input! Please enter two numbers separated by space.");
                continue;
            }

            const row = parseInt(parts[0], 10);
            const col = parseInt(parts[1], 10);

            if (isNaN(row) || isNaN(col)) {
                console.log("Invalid input! Try again.");
                continue;
            }

            if (this.rules.isValidMove(this.board, row, col)) {
                this.board.placeMark(row, col, currentPlayer.getSymbol());
                this.notify(`${currentPlayer.getName()} played (${row},${col})`);

                if (this.rules.checkWinCondition(this.board, currentPlayer.getSymbol())) {
                    this.board.display();
                    console.log(`${currentPlayer.getName()} wins!`);
                    currentPlayer.incrementScore();
                    this.notify(`${currentPlayer.getName()} wins!`);
                    this.gameOver = true;
                } else if (this.rules.checkDrawCondition(this.board)) {
                    this.board.display();
                    console.log("It's a draw!");
                    this.notify("Game is Draw!");
                    this.gameOver = true;
                } else {
                    this.players.shift();
                    this.players.push(currentPlayer);
                }
            } else {
                console.log("Invalid move! Try again.");
            }
        }
    }
}

const GameType = {
    STANDARD: 'STANDARD'
};

class TicTacToeGameFactory {
    static createGame(gt, boardSize) {
        if (gt === GameType.STANDARD) {
            return new TicTacToeGame(boardSize);
        }
        return null;
    }
}

async function main() {
    console.log("=== TIC TAC TOE GAME ===");
    
    const rl = readline.createInterface({ input, output });
    
    const sizeInput = await rl.question("Enter board size (e.g., 3 for 3x3): ");
    const boardSize = parseInt(sizeInput.trim(), 10) || 3;
    
    const game = TicTacToeGameFactory.createGame(GameType.STANDARD, boardSize);
    
    const notifier = new ConsoleNotifier();
    game.addObserver(notifier);
    
    const player1 = new TicTacToePlayer(1, "Aditya", new Symbol('X'));
    const player2 = new TicTacToePlayer(2, "Harshita", new Symbol('O'));
    
    game.addPlayer(player1);
    game.addPlayer(player2);
    
    await game.play(rl);
    
    rl.close();
}

main();
