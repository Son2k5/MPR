import { useState } from "react";
import { Board } from "./Components/Board";
import { CreateBoard } from "./Components/CreateBoard";
const size = 10;
const VERTICAL = 1;
const HORIZONTAL = 2;
const empty = 0;
export default function App(){
  const[board, SetBoard] = useState(CreateBoard);
  const[currentPeople, SetCurrentPeople] = useState("H");

  const handleCellClick = () =>{
    const newBoard = [];
    for(let i = 0; i< size ;i++){
      const row = 0;
      for(let j = 0; j < size ; i++){
        row.push(board[i][j]);
      }
      newBoard.push(row);
    }
  }

  return( 
  <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Domineering Game</h1>

      <p className="text-lg">
        Lượt chơi:{" "}
        <span className={currentPlayer === VERTICAL ? "text-blue-500" : "text-red-500"}>
          {currentPlayer === VERTICAL
            ? "Player V (Dọc)"
            : "Player H (Ngang)"}
        </span>
      </p>

      <Board board={board} onCellClick={handleCellClick} />

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
      >
        Reset Game
      </button>
    </div>)
}