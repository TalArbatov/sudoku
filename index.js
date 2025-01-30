let board = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 2, 3, 4, 5, 6, 7, 8, 9],
  [3, 1, 4, 4, 6, 1, 2, 6, 1],
  [4, 1, 4, 4, 6, 1, 2, 6, 1],
  [5, 1, 4, 4, 6, 2, 2, 6, 1],
  [6, 1, 4, 4, 6, 1, 2, 6, 1],
  [7, 1, 4, 4, 6, 1, 2, 6, 1],
  [8, 1, 4, 4, 6, 1, 2, 6, 1],
  [9, 1, 4, 4, 6, 1, 2, 6, 1],
];

const rowToString = (row) => {
  let str = "| ";

  row.forEach(
    (c, index) => (str += `${c} ${(index + 1) % 3 === 0 ? "| " : " "}`)
  );

  return str;
};

const print = (board) => {
  console.log("-------------------------------");
  for (let i = 0; i < 9; i++) {
    console.log(rowToString(board[i]));
    if (i + 1 === 3 || i + 1 === 6)
      console.log("-------------------------------");
  }
  console.log("-------------------------------");
};

const getColumn = (t) => {
  const column = [];
  board.forEach((row) => column.push(row[t]));

  return column;
};

const getRow = (num) => board[num];

const getSquare = ({ rowPos, columnPos }) => {
  const set = [];
  for (let i = rowPos * 3; i < rowPos * 3 + 3; i++) {
    for (let j = columnPos * 3; j < columnPos * 3 + 3; j++) {
      set.push(board[i][j]);
    }
  }

  return set;
};

const isSetValid = (row) => {
  const numInstancesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  row.forEach((c) => numInstancesCount[c]++);

  let isValid = true;

  numInstancesCount.shift();

  numInstancesCount.forEach((count) => {
    if (count !== 1) {
      isValid = false;
    }
  });

  return isValid;
};

const checkValidity = () => {
  for (let i = 0; i < 9; i++) {
    if (!isSetValid(getRow(i)) || !isSetValid(getColumn(i))) {
      return false;
    }
  }

  // check for squares
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (!isSetValid(getSquare({ rowPos: i, columnPos: j }))) {
        console.log(`column ${i} is invalid`);
        return false;
      }
    }

  return true;
};

// board = [
//   [8, 2, 7, 1, 5, 4, 3, 9, 6],
//   [9, 6, 5, 3, 2, 7, 1, 4, 8],
//   [3, 4, 1, 6, 8, 9, 7, 5, 2],
//   [5, 9, 3, 4, 6, 8, 2, 7, 1],
//   [4, 7, 2, 5, 1, 3, 6, 8, 9],
//   [6, 1, 8, 9, 7, 2, 4, 3, 5],
//   [7, 8, 6, 2, 3, 5, 9, 1, 4],
//   [1, 5, 4, 7, 9, 6, 8, 2, 3],
//   [2, 3, 9, 8, 4, 1, 5, 6, 7],
// ];

print(board);

console.log(checkValidity());
