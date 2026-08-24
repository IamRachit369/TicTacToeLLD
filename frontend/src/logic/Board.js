import { Symbol } from './Symbol.js';

export class Board {
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
    
    // helper for UI
    getFlatBoard() {
        let flat = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                flat.push(this.grid[i][j] === this.emptyCell ? null : this.grid[i][j].getMark());
            }
        }
        return flat;
    }
}
