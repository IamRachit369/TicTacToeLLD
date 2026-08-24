# Tic-Tac-Toe LLD
Creating a tic tac toe by utilizing the concepts of Low Level Design

A scalable and extensible implementation of the classic Tic-Tac-Toe game, built using **Low Level Design (LLD)** principles and Object-Oriented Programming (OOP) concepts. 

This repository contains multiple implementations:
1. **C++** (Core implementation using Design Patterns)
2. **JavaScript (Node.js)** (CLI equivalent)
3. **React + Vite** (Frontend web application)

## 🏗️ Architecture & Design Patterns

The project follows SOLID principles and utilizes several design patterns to ensure the codebase is clean, maintainable, and highly extensible:

- **Factory Pattern (`TicTacToeGameFactory`)**: Encapsulates the instantiation logic of the game, allowing the creation of different variants (e.g., standard, specialized modes) without modifying client code.
- **Strategy Pattern (`TicTacToeRules`)**: The game rules are abstracted behind an interface. The `StandardTicTacToeRules` class implements this interface, making it easy to swap in new rules (like a 4x4 winning condition) without changing the core game logic.
- **Observer Pattern (`IObserver`, `ConsoleNotifier`)**: Decouples the core game engine from the display/notification system. The game notifies all registered observers about state changes (moves, wins, draws).

## ✨ Features

- **Customizable Board Size**: Play on a traditional 3x3 grid or scale up to NxN.
- **Extensible Rules Engine**: Easy to define custom winning or drawing conditions.
- **Multiple Interfaces**: Playable via Command Line Interface (C++ / Node.js) and a web frontend.
- **Clean Separation of Concerns**: Models (Board, Player, Symbol) are strictly separated from game orchestration and rendering.

## 🚀 Getting Started

### 1. C++ Command Line Game
Requires a C++ compiler (like `g++`).

```bash
# Compile the game
g++ main.cpp -o tictactoe

# Run the game
./tictactoe
```

### 2. Node.js Command Line Game
Requires [Node.js](https://nodejs.org/) installed.

```bash
# Run the javascript version
node tictactoe.js
```

### 3. React Frontend
Requires Node.js and npm installed.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📂 Project Structure

```text
.
├── main.cpp                     # C++ Entry point
├── Board.cpp                    # Game board entity
├── Symbol.cpp                   # Symbol entity (X, O, etc.)
