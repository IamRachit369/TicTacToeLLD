export class StandardTicTacToeRules {
    isValidMove(board, row, col) {
        return board.isCellEmpty(row, col);
    }

    checkWinCondition(board, symbol) {
        const size = board.getSize();

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

        let win = true;
        for (let i = 0; i < size; i++) {
            if (board.getCell(i, i) !== symbol) {
                win = false;
                break;
            }
        }
        if (win) return true;

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
