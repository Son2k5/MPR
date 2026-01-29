



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

  const hasValidMoves = (player: number) => {
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
      <View style={styles.header}>
        <Text style={styles.title}> Domineering</Text>
        <Text style={styles.subtitle}>Strategic Tile Placement Game</Text>
      </View>

      <View style={styles.statusCard}>
        {!gameOver ? (
          <View style={styles.turnContainer}>
            <Text style={styles.turnLabel}>Current Turn</Text>
            <View
              style={[
                styles.playerBadge,
                currentPlayer === VERTICAL
                  ? styles.playerBadgeV
                  : styles.playerBadgeH,
              ]}
            >
              <View
                style={[
                  styles.playerIcon,
                  currentPlayer === VERTICAL
                    ? styles.iconVertical
                    : styles.iconHorizontal,
                ]}
              />
              <Text style={styles.playerText}>
                {currentPlayer === VERTICAL ? "Vertical" : "Horizontal"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerLabel}>Winner</Text>
            <View
              style={[
                styles.winnerBadge,
                winner === "V" ? styles.playerBadgeV : styles.playerBadgeH,
              ]}
            >
              <Text style={styles.winnerText}>
                {winner === "V" ? "Vertical Player" : "Horizontal Player"}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {board.map((row, i) =>
            row.map((cell, j) => (
              <Pressable
                key={`${i}-${j}`}
                onPress={() => handleCellPress(i, j)}
                style={({ pressed }) => [
                  styles.cellWrapper,
                  pressed && styles.cellPressed,
                ]}
              >
                <View
                  style={[
                    styles.cell,
                    cell === VERTICAL && styles.vertical,
                    cell === HORIZONTAL && styles.horizontal,
                    cell === EMPTY && styles.empty,
                  ]}
                >
                  {cell !== EMPTY && (
                    <View
                      style={[
                        styles.cellInner,
                        cell === VERTICAL
                          ? styles.innerVertical
                          : styles.innerHorizontal,
                      ]}
                    />
                  )}
                </View>
              </Pressable>
            )),
          )}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.resetBtn,
          pressed && styles.resetBtnPressed,
        ]}
        onPress={resetGame}
      >
        <Text style={styles.resetText}> New Game</Text>
      </Pressable>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.vertical]} />
          <Text style={styles.legendText}>Vertical (Blue)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.horizontal]} />
          <Text style={styles.legendText}>Horizontal (Red)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  statusCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 280,
    alignItems: "center",
  },
  turnContainer: {
    alignItems: "center",
  },
  turnLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  playerBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  playerBadgeV: {
    backgroundColor: "#dbeafe",
  },
  playerBadgeH: {
    backgroundColor: "#fee2e2",
  },
  playerIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  iconVertical: {
    backgroundColor: "#2563eb",
  },
  iconHorizontal: {
    backgroundColor: "#dc2626",
  },
  playerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  winnerContainer: {
    alignItems: "center",
  },
  winnerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  winnerLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  winnerBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  boardContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: SIZE * CELL_SIZE,
    height: SIZE * CELL_SIZE,
    borderRadius: 8,
    overflow: "hidden",
  },
  cellWrapper: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  cellPressed: {
    opacity: 0.7,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    backgroundColor: "#f1f5f9",
  },
  vertical: {
    backgroundColor: "#3b82f6",
  },
  horizontal: {
    backgroundColor: "#ef4444",
  },
  cellInner: {
    width: 28,
    height: 28,
    borderRadius: 4,
  },
  innerVertical: {
    backgroundColor: "#1d4ed8",
  },
  innerHorizontal: {
    backgroundColor: "#b91c1c",
  },
  resetBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  resetBtnPressed: {
    backgroundColor: "#334155",
    transform: [{ scale: 0.98 }],
  },
  resetText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  legend: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
});
