const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];



function isValid(row, col, n, board) {
  const rowLen = board.length;
  const colLen = board[0].length;
  // 行
  for (let i = 0; i < rowLen; i++) {
    if (board[row][i] - n === 0) {
      return false;
    }
  }
  // 列
  for (let i = 0; i < colLen; i++) {
    if (board[i][col] - n === 0) {
      return false;
    }
  }
  // 3 * 3
  const rowStart = Math.floor(row / 3) * 3; // 0 3
  const colStart = Math.floor(col / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (board[i][j] - n === 0) {
        return false;
      }
    }
  }
  return true
}

function get(board) {
  const rowLen = board.length;
  const colLen = board[0].length;
  function track() {
    for (let i = 0; i < rowLen; i++) {
      for (let j = 0; j < colLen; j++) {
        const cur = board[i][j];
        if (cur !== ".") continue;
        for (let k = 1; k <= 9; k++) {
          if (isValid(i, j, k, board)) {
            board[i][j] = `${k}`;
            if (track()) return true;
            board[i][j] = `.`;
          }
        }
        return false;
      }
    }
    return true
  }
  track(board);
  return board;
}

console.log(get(board));

