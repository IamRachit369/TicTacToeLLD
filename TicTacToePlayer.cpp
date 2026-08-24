#include <string>

class TicTacToePlayer {
private:
    int playerId;
    std::string name;
    Symbol* symbol;
    int score;

public:
    TicTacToePlayer(int playerId, std::string n, Symbol* s)
        : playerId(playerId), name(n), symbol(s), score(0) {}

    std::string getName() {
        return name;
    }

    Symbol* getSymbol() {
        return symbol;
    }

    int getScore() {
        return score;
    }

    void incrementScore() {
        score++;
    }

    ~TicTacToePlayer() {
        delete symbol;
    }
};