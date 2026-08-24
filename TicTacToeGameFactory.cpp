enum GameType {
    STANDARD
};

class TicTacToeGameFactory {
public:
    static TicTacToeGame* createGame(GameType gt, int boardSize) {
        if(GameType::STANDARD == gt) {
            return new TicTacToeGame(boardSize);
        }
        return nullptr;
    }
};