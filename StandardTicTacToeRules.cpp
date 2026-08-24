#include <string>

class TicTacToeRules {
public:
    virtual bool isValidMove(Board* board, int row, int col) = 0;
    virtual bool checkWinCondition(Board* board, Symbol* symbol) = 0;
    virtual bool checkDrawCondition(Board* board) = 0;
    virtual ~TicTacToeRules() {}
};

class StandardTicTacToeRules : public TicTacToeRules {
public:
    bool isValidMove(Board* board, int row, int col) override {
        return board->isCellEmpty(row, col);
    }

    bool checkWinCondition(Board* board, Symbol* symbol) override {
        int size = board->getSize();

    for(int i = 0; i < size; i++) {
        bool win = true;
        for(int j = 0; j < size; j++) {
            if(board->getCell(i, j) != symbol) {
                win = false;
                break;
            }
        }
        if(win) return true;
    }

    for(int j = 0; j < size; j++) {
        bool win = true;
        for(int i = 0; i < size; i++) {
            if(board->getCell(i, j) != symbol) {
                win = false;
                break;
            }
        }
        if(win) return true;
    }

    bool win = true;
    for(int i = 0; i < size; i++) {
        if(board->getCell(i, i) != symbol) {
            win = false;
            break;
        }
    }
    if(win) return true;

    win = true;
    for(int i = 0; i < size; i++) {
        if(board->getCell(i, size - 1 - i) != symbol) {
            win = false;
            break;
        }
    }
        return win;
    }

    bool checkDrawCondition(Board* board) override {
        int size = board->getSize();
        for(int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                if(board->getCell(i, j) == board->getEmptyCell()) {
                    return false;
                }
            }
        }
        return true;
    }
};