#include <deque>
#include <iostream>
#include <string>
#include <vector>

class TicTacToeGame {
private:
    Board* board;
    std::deque<TicTacToePlayer*> players;
    TicTacToeRules* rules;
    std::vector<IObserver*> observers;
    bool gameOver;

public:
    TicTacToeGame(int boardSize)
        : board(new Board(boardSize)), rules(new StandardTicTacToeRules()), gameOver(false) {}

    void addPlayer(TicTacToePlayer* player) {
        players.push_back(player);
    }

    void addObserver(IObserver* observer) {
        observers.push_back(observer);
    }

    void notify(std::string msg) {
        for(auto observer : observers) {
            observer->update(msg);
        }
    }

    void play() {
        if(players.size() < 2) {
            std::cout << "Need at least 2 players!" << std::endl;
            return;
        }

        notify("Tic Tac Toe Game Started!");

        while(!gameOver) {
            board->display();

            TicTacToePlayer* currentPlayer = players.front();
            std::cout << currentPlayer->getName() << " (" << currentPlayer->getSymbol()->getMark() << ") - Enter row and column: ";

            int row, col;
            std::cin >> row >> col;

            if(rules->isValidMove(board, row, col)) {
                board->placeMark(row, col, currentPlayer->getSymbol());
                notify(currentPlayer->getName() + " played (" + std::to_string(row) + "," + std::to_string(col) + ")");

                if(rules->checkWinCondition(board, currentPlayer->getSymbol())) {
                    board->display();
                    std::cout << currentPlayer->getName() << " wins!" << std::endl;
                    currentPlayer->incrementScore();
                    notify(currentPlayer->getName() + " wins!");
                    gameOver = true;
                }
                else if(rules->checkDrawCondition(board)) {
                    board->display();
                    std::cout << "It's a draw!" << std::endl;
                    notify("Game is Draw!");
                    gameOver = true;
                }
                else {
                    players.pop_front();
                    players.push_back(currentPlayer);
                }
            }
            else {
                std::cout << "Invalid move! Try again." << std::endl;
            }
        }
    }

    ~TicTacToeGame() {
        delete board;
        delete rules;
    }
};