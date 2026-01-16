import Cell from "./Cell";

const size = 10;

export function Board({ board, onCellClick }) {
  const rows = [];

  for (let i = 0; i < size; i++) {
    const cells = [];

    for (let j = 0; j < size; j++) {
      cells.push(
        <Cell
          key={j}
          value={board[i][j]}
          onClick={() => onCellClick(i, j)}
        />
      );
    }

    rows.push(
      <div key={i} className="flex">
        {cells}
      </div>
    );
  }

  return (
    <div className="inline-block border-2 border-black">
      {rows}
    </div>
  );
}
