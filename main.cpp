#include <iostream>

#include "Symbol.cpp"
#include "Board.cpp"
#include "TicTacToePlayer.cpp"
#include "IObserver.cpp"
#include "StandardTicTacToeRules.cpp"
#include "TicTacToeGame.cpp"
#include "ConsoleNotifier.cpp"
#include "TicTacToeGameFactory.cpp"

using namespace std;

// Main function for Tic Tac Toe
int main() {
    cout << "=== TIC TAC TOE GAME ===" << endl;
    
    // Create game with custom board size
    int boardSize;
    cout << "Enter board size (e.g., 3 for 3x3): ";
    cin >> boardSize;
    
    TicTacToeGame* game = TicTacToeGameFactory::createGame(GameType::STANDARD, boardSize);
    
    // Add observer
    IObserver* notifier = new ConsoleNotifier();
    game->addObserver(notifier);
    
    // Create players with custom symbols
    TicTacToePlayer* player1 = new TicTacToePlayer(1, "Aditya", new Symbol('X'));
    TicTacToePlayer* player2 = new TicTacToePlayer(2, "Harshita", new Symbol('O'));
    
    game->addPlayer(player1);
    game->addPlayer(player2);
    
    // Play the game
    game->play();
    
    // Cleanup
    delete game;
    delete player1;
    delete player2;
    delete notifier;
    
    return 0;
}