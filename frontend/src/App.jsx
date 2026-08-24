import { useState, useRef, useEffect } from 'react'
import './App.css'
import { TicTacToeGameFactory, GameType } from './logic/TicTacToeGameFactory.js'
import { TicTacToePlayer } from './logic/TicTacToePlayer.js'
import { Symbol } from './logic/Symbol.js'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [statusText, setStatusText] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const gameRef = useRef(null)

  function initGame() {
    const game = TicTacToeGameFactory.createGame(GameType.STANDARD, 3);
    
    // Observer pattern usage
    game.addObserver({
        update: (msg) => {
            console.log("[Notification]", msg);
        }
    });

    const player1 = new TicTacToePlayer(1, "Rachit", new Symbol('X'));
    const player2 = new TicTacToePlayer(2, "Harsh", new Symbol('O'));
    
    game.addPlayer(player1);
    game.addPlayer(player2);
    
    gameRef.current = game;
    updateState();
  }

  useEffect(() => {
    initGame();
  }, []);

  function updateState() {
    const game = gameRef.current;
    if (!game) return;
    
    setBoard(game.getBoard());
    setGameOver(game.isGameOver());
    
    if (game.isGameOver()) {
        const winner = game.getWinner();
        if (winner) {
            setStatusText(`${winner.getName()} wins`);
        } else if (game.getIsDraw()) {
            setStatusText('It is a draw');
        }
    } else {
        const currentPlayer = game.getCurrentPlayer();
        if (currentPlayer) {
            setStatusText(`${currentPlayer.getName()} is playing`);
        }
    }
  }

  function playSquare(index) {
    const game = gameRef.current;
    if (!game || game.isGameOver()) return;

    const row = Math.floor(index / 3);
    const col = index % 3;

    if (game.makeMove(row, col)) {
        updateState();
    }
  }

  function resetGame() {
    initGame();
  }

  return (
    <main className="game-shell">
      <header className="game-header">
        <p className="eyebrow">Two player game</p>
        <h1>Tic Tac Toe</h1>
        <p className="subtitle">Three in a row takes the round.</p>
      </header>

      <section className="game-panel" aria-label="Tic Tac Toe game">
        <div className={`status-box ${gameOver ? 'status-box--complete' : ''}`} role="status" aria-live="polite">
          <span className="status-label">Current turn</span>
          <strong>{statusText}</strong>
        </div>

        <div className="board" role="grid" aria-label="Tic Tac Toe board">
          {board.map((value, index) => (
            <button
              className={`square ${value ? `square--${value.toLowerCase()}` : ''}`}
              type="button"
              role="gridcell"
              aria-label={value ? `Square ${index + 1}, Player ${value}` : `Square ${index + 1}, empty`}
              disabled={Boolean(value) || gameOver}
              onClick={() => playSquare(index)}
              key={index}
            >
              {value}
            </button>
          ))}
        </div>

        <button className="reset-button" type="button" onClick={resetGame}>
          New game
        </button>
      </section>
    </main>
  )
}

export default App
