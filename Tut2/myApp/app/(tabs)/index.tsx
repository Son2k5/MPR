import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
const SIZE = 10;
const EMPTY = 0;
const VERTICAL = 1;
const HORIZONTAL = 2;
const CELL_SIZE = 36;
export default function DomineeringGame() {
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const rows = [];
      for (let j = 0; j < 10; j++) {
        rows.push(EMPTY);
      }
      board.push(rows);
    }
    return board;
  };
  const [board, setBoard] = useState(createBoard);
  const [winner, setWinner] = useState<"H" | "V" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(VERTICAL);
  useEffect(() => {
    if (!hasValidMoves(currentPlayer)) {
      setGameOver(true);
      setWinner(currentPlayer === VERTICAL ? "H" : "V");
    }
  }, [currentPlayer, board]);

  const resetGame = () => {
    setBoard(createBoard);
    setGameOver(false);
    setCurrentPlayer(VERTICAL);
    setWinner(null);
  };
  const handleCellPress = (row: number, col: number) => {
    if (gameOver) return;

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

  const hasValidMoves = (player:number) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Domineering Game</Text>

      <Text style={styles.turn}>
        Turn:{" "}
        <Text
          style={currentPlayer === VERTICAL ? styles.playerV : styles.playerH}
        >
          {currentPlayer === VERTICAL ? "VERTICAL" : "HORIZONTAL"}
        </Text>
      </Text>

      {gameOver && winner && (
        <Text style={styles.winner}>Winner: {winner}</Text>
      )}

      <View style={styles.board}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Pressable key={`${i}-${j}`} onPress={() => handleCellPress(i, j)}>
              <View
                style={[
                  styles.cell,
                  cell === VERTICAL && styles.vertical,
                  cell === HORIZONTAL && styles.horizontal,
                ]}
              />
            </Pressable>
          )),
        )}
      </View>

      <Pressable style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  turn: {
    fontSize: 16,
    marginBottom: 8,
  },
  playerV: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  playerH: {
    color: "#dc2626",
    fontWeight: "bold",
  },
  winner: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "white",
  },
  vertical: {
    backgroundColor: "#3b82f6",
  },
  horizontal: {
    backgroundColor: "#ef4444",
  },
  resetBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1f2937",
    borderRadius: 6,
  },
  resetText: {
    color: "white",
    fontWeight: "bold",
  },
});
