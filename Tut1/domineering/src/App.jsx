import { useState, useEffect } from "react";

const SIZE = 10;
const EMPTY = 0;
const VERTICAL = 1;
const HORIZONTAL = 2;

export default function App() {
  // tạo board bằng for lồng nhau
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < SIZE; i++) {
      const row = [];
      for (let j = 0; j < SIZE; j++) {
        row.push(EMPTY);
      }
      board.push(row);
    }
    return board;
  };

  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState(VERTICAL);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Kiểm tra còn nước đi hợp lệ không
  const hasValidMoves = (player) => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (player === VERTICAL) {
          if (
            i + 1 < SIZE &&
            board[i][j] === EMPTY &&
            board[i + 1][j] === EMPTY
          ) {
            return true;
          }
        } else {
          if (
            j + 1 < SIZE &&
            board[i][j] === EMPTY &&
            board[i][j + 1] === EMPTY
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Kiểm tra game over sau mỗi lượt
  useEffect(() => {
    if (!hasValidMoves(currentPlayer)) {
      setGameOver(true);
      setWinner(currentPlayer === VERTICAL ? "H" : "V");
    }
  }, [currentPlayer, board]);

  const handleCellClick = (row, col) => {
    if (gameOver) return;

    // copy board (for lồng nhau)
    const newBoard = [];
    for (let i = 0; i < SIZE; i++) {
      const newRow = [];
      for (let j = 0; j < SIZE; j++) {
        newRow.push(board[i][j]);
      }
      newBoard.push(newRow);
    }

    if (currentPlayer === VERTICAL) {
      if (
        row + 1 < SIZE &&
        newBoard[row][col] === EMPTY &&
        newBoard[row + 1][col] === EMPTY
      ) {
        newBoard[row][col] = VERTICAL;
        newBoard[row + 1][col] = VERTICAL;
        setBoard(newBoard);
        setCurrentPlayer(HORIZONTAL);
      }
    } else {
      if (
        col + 1 < SIZE &&
        newBoard[row][col] === EMPTY &&
        newBoard[row][col + 1] === EMPTY
      ) {
        newBoard[row][col] = HORIZONTAL;
        newBoard[row][col + 1] = HORIZONTAL;
        setBoard(newBoard);
        setCurrentPlayer(VERTICAL);
      }
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer(VERTICAL);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Domineering Game</h1>

      {!gameOver ? (
        <p className="text-lg">
          Lượt chơi:{" "}
          <span
            className={
              currentPlayer === VERTICAL ? "text-blue-500" : "text-red-500"
            }
          >
            {currentPlayer === VERTICAL
              ? "Player V (Dọc)"
              : "Player H (Ngang)"}
          </span>
        </p>
      ) : (
        <p className="text-xl font-bold text-green-600">
           Player {winner} Thắng! 
        </p>
      )}

      {/* BOARD */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 40px)` }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleCellClick(i, j)}
              className={`w-10 h-10 border cursor-pointer
                ${
                  cell === VERTICAL
                    ? "bg-blue-500"
                    : cell === HORIZONTAL
                    ? "bg-red-500"
                    : "bg-white"
                }
              `}
            />
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
      >
        Reset Game
      </button>
    </div>
  );
}