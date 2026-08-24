#include <iostream>
#include <vector>

class Board {
private:
    std::vector<std::vector<Symbol*>> grid;
    int size;
    Symbol* emptyCell;

public:
    Board(int s) : size(s), emptyCell(new Symbol('-')) {
        grid = std::vector<std::vector<Symbol*>>(size, std::vector<Symbol*>(size, emptyCell));
    }

    bool isCellEmpty(int row, int col) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return false;
        }
        return grid[row][col] == emptyCell;
    }

    bool placeMark(int row, int col, Symbol* mark) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return false;
        }
        if(!isCellEmpty(row, col)) {
            return false;
        }
        grid[row][col] = mark;
        return true;
    }

    Symbol* getCell(int row, int col) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return emptyCell;
        }
        return grid[row][col];
    }

    int getSize() {
        return size;
    }

    Symbol* getEmptyCell() {
        return emptyCell;
    }

    void display() {
        std::cout << "\n  ";
        for(int i = 0; i < size; i++) {
            std::cout << i << " ";
        }
        std::cout << std::endl;

        for(int i = 0; i < size; i++) {
            std::cout << i << " ";
            for(int j = 0; j < size; j++) {
                std::cout << grid[i][j]->getMark() << " ";
            }
            std::cout << std::endl;
        }
        std::cout << std::endl;
    }
};