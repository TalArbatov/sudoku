import { CanvasBoard } from "./CanvasBoard";
import { Game } from "./Game";
import { Position } from "./types";
import { Cell } from "./types";

let repeatCounter = 0;
const maxRepeat = 5;

type Params = {
  game: Game;
};

type getRandomCellReturnValue<T> = {
  arr: Array<T>;
  value: T;
};

const set = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const setCornerHouse = (game: Game, rowStart: number, colStart: number, initalCount: number) => {
  // of free cells for each number
  let counter = Array.from(Array(9)).fill(initalCount);

  for (let row = rowStart; row < rowStart + 3; row++) {
    for (let col = colStart; col < colStart + 3; col++) {
      const cellPosition = { x: row, y: col };

      // console.log("looking at", cellPosition);

      if (!game.getCell(cellPosition).value) {
        const validValuesInCell = getValidValuesInCell(game, cellPosition);

        let hasValueWithSingleInstance = false;

        for (const value of validValuesInCell) {
          // put -- :chen
          const numberOfInstancesInHouse = --counter[value - 1];

          if (numberOfInstancesInHouse === 0) {
            // console.log("found value with single instance", value);
            if (hasValueWithSingleInstance) {
              // console.log("has two values with single instance", value);
              throw new Error("test1");
            }

            hasValueWithSingleInstance = true;

            // console.log("(1) setting cell to", value);
            game.setCell(cellPosition, value);
          }
        }

        if (!hasValueWithSingleInstance) {
          // console.log("no single instance value");

          const randomIndex = Math.floor(Math.random() * validValuesInCell.length);

          if (validValuesInCell.length === 0) {
            // console.log("no valid values for TODO ");
          }

          // console.log("(1) setting cell to", validValuesInCell[randomIndex]);

          game.setCell(cellPosition, validValuesInCell[randomIndex]);
        }

        // look for something
        let hasBoardChanged = true;

        while (hasBoardChanged) {
          hasBoardChanged = false;

          // goes through all possible positions in house
          // checks if theres a single option
          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
              const cellPosition2 = { x: i, y: j };

              if (!game.getCell(cellPosition2).value) {
                const validValuesInCell = getValidValuesInCell(game, cellPosition2);

                if (validValuesInCell.length === 1) {
                  game.setCell(cellPosition2, validValuesInCell[0]);

                  hasBoardChanged = true;
                }
              }
            }
          }
        }
      }
    }
  }
};

const setCornerHouseWithRepeat = (
  game: Game,
  rowStart: number,
  colStart: number,
  initalCount: number
) => {
  // console.log("setCornerHouseWithRepeat", repeatCounter);
  try {
    setCornerHouse(game, rowStart, colStart, initalCount);
  } catch (e) {
    repeatCounter++;
    if (repeatCounter < maxRepeat) {
      // console.log("failed to set corret house", initalCount);
      // reset house and try again
      for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
          game.setCell({ x: i, y: j }, 0);
        }
      }
      setCornerHouseWithRepeat(game, rowStart, colStart, initalCount);
    } else {
      // console.log("max repeat reached");
    }
  }
};
const boardSetToExistingNumberArray = (arr: Array<{ value: number | null }>): Array<number> =>
  arr.map((c) => c.value).filter((value) => !!value) as number[];

// returns random array from cell and the array without the cell
const getRandomCell = <T>(arr: Array<T>): { arr: Array<T>; value: T } => {
  const randomIndex = Math.floor(Math.random() * arr.length);

  const value = arr[randomIndex];

  var newArray = arr.slice(0, randomIndex).concat(arr.slice(randomIndex + 1));

  return {
    arr: newArray,
    value,
  };
};

const getValidValuesInCell = (game: Game, cellPosition: Position): number[] => {
  const row = boardSetToExistingNumberArray(game.getRow(cellPosition.x));
  const column = boardSetToExistingNumberArray(game.getColumn(cellPosition.y));

  const housePos = {
    x: Math.floor(cellPosition.x / 3),
    y: Math.floor(cellPosition.y / 3),
  };
  // console.log("housePos", housePos);
  const house = boardSetToExistingNumberArray(game.getHouse(housePos.x, housePos.y));

  let invalidNumbers: number[] = [];

  invalidNumbers = invalidNumbers.concat(row, column, house);

  const validNumbers = Array.from(set).filter((value) => !invalidNumbers.includes(value));

  return validNumbers;
};

const getValidValuesInHouse = (game: Game): number[][][] => {
  const house: number[][][] = [];

  for (let i = 0; i < 3; i++) {
    house[i] = new Array(3);
  }

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      const validValuesInCell = getValidValuesInCell(game, { x: i, y: j });
      house[i][j] = validValuesInCell;
    }

  return house;
};

const fillBoard = async (game: Game) => {
  // stage 1: fill center house

  let set1 = Array.from(set);

  for (let i = 3; i < 6; i++)
    for (let j = 3; j < 6; j++) {
      const randomIndex = Math.floor(Math.random() * set1.length);

      game.setCell({ x: j, y: i }, set1[randomIndex]);

      set1.splice(randomIndex, 1);
    }

  // stage 2.1 fill left column of center house

  // const columnValues = boardSetToExistingNumberArray(game.getColumn(3));

  // set1 = Array.from(set);

  // set1 = set1.filter((value) => !columnValues.includes(value));

  // for (let i = 0; i < 9; i++) {
  //   const cellPosition = { x: i, y: 3 };

  //   const cell = game.getCell(cellPosition);

  //   if (!cell.value) {
  //     const { arr, value } = getRandomCell(set1);

  //     game.setCell(cellPosition, value);

  //     set1 = [...arr];
  //   }
  //   // game.setCell({x: i, y: 3}, )
  // }

  // stage 2.2

  //fill center rows
  for (let row = 3; row < 6; row++) {
    const topHouse = game.getHouse(1, 0);
    const bottomHouse = game.getHouse(1, 2);

    const topHouseValues = boardSetToExistingNumberArray(topHouse);
    const bottomHouseValues = boardSetToExistingNumberArray(bottomHouse);

    // console.log("topHouseValues");
    // console.log(topHouseValues);
    // console.log("bottomHouseValues");
    // console.log(bottomHouseValues);

    // create base group, group of all numbers still not included in column 4

    const toDeductFromBaseGroup = boardSetToExistingNumberArray(game.getRow(row));

    let baseGroup = Array.from(set);

    baseGroup = baseGroup.filter((value) => !toDeductFromBaseGroup.includes(value));

    // console.log("baseGroup");
    console.log(baseGroup);

    // top group is base group with only numbers that have to be in top house
    let topGroup = baseGroup.filter((value) => bottomHouseValues.includes(value));
    let bottomGroup = baseGroup.filter((value) => topHouseValues.includes(value));

    // console.log("topGroup");
    // console.log(topGroup);
    // console.log("bottomGroup");
    // console.log(bottomGroup);

    let leftoverGroup = baseGroup
      .filter((v) => !topGroup.includes(v))
      .filter((v) => !bottomGroup.includes(v));

    // console.log("leftoverGroup");
    // console.log(leftoverGroup);

    // now add all leftover numbers randomly to top and
    // bottom group until they're both of length 3

    while (topGroup.length < 3) {
      const { arr: newLeftOverGroup, value } = getRandomCell<number>(leftoverGroup);
      leftoverGroup = newLeftOverGroup;
      topGroup.push(value);
    }

    // console.log("newTopGroup");
    // console.log(topGroup);

    bottomGroup = bottomGroup.concat(leftoverGroup);

    // console.log("newBottomGroup");
    // console.log(bottomGroup);

    // inject top group to middle row of top house and vice-versa

    for (let i = 0; i < 3; i++) {
      const { value, arr } = getRandomCell(topGroup);
      topGroup = arr;
      game.setCell({ x: row, y: i }, value);
    }

    for (let i = 8; i > 5; i--) {
      const { value, arr } = getRandomCell(bottomGroup);
      bottomGroup = arr;
      game.setCell({ x: row, y: i }, value);
    }
  }

  // fill center columns
  for (let col = 3; col < 6; col++) {
    const topHouse = game.getHouse(0, 1);
    const bottomHouse = game.getHouse(2, 1);

    const topHouseValues = boardSetToExistingNumberArray(topHouse);
    const bottomHouseValues = boardSetToExistingNumberArray(bottomHouse);

    // console.log("topHouseValues");
    // console.log(topHouseValues);
    // console.log("bottomHouseValues");
    // console.log(bottomHouseValues);

    // create base group, group of all numbers still not included in column 4

    const toDeductFromBaseGroup = boardSetToExistingNumberArray(game.getColumn(col));

    let baseGroup = Array.from(set);

    baseGroup = baseGroup.filter((value) => !toDeductFromBaseGroup.includes(value));

    // console.log("baseGroup");
    // console.log(baseGroup);

    // top group is base group with only numbers that have to be in top house
    let topGroup = baseGroup.filter((value) => bottomHouseValues.includes(value));
    let bottomGroup = baseGroup.filter((value) => topHouseValues.includes(value));

    // console.log("topGroup");
    // console.log(topGroup);
    // console.log("bottomGroup");
    // console.log(bottomGroup);

    let leftoverGroup = baseGroup
      .filter((v) => !topGroup.includes(v))
      .filter((v) => !bottomGroup.includes(v));

    // console.log("leftoverGroup");
    // console.log(leftoverGroup);

    // now add all leftover numbers randomly to top and
    // bottom group until they're both of length 3

    while (topGroup.length < 3) {
      const { arr: newLeftOverGroup, value } = getRandomCell<number>(leftoverGroup);
      leftoverGroup = newLeftOverGroup;
      topGroup.push(value);
    }

    // console.log("newTopGroup");
    // console.log(topGroup);

    bottomGroup = bottomGroup.concat(leftoverGroup);

    // console.log("newBottomGroup");
    // console.log(bottomGroup);

    // inject top group to middle row of top house and vice-versa

    for (let i = 0; i < 3; i++) {
      const { value, arr } = getRandomCell(topGroup);
      topGroup = arr;
      game.setCell({ x: i, y: col }, value);
    }

    for (let i = 8; i > 5; i--) {
      const { value, arr } = getRandomCell(bottomGroup);
      bottomGroup = arr;
      game.setCell({ x: i, y: col }, value);
    }
  }

  // stage 3 corners

  // game.setBoard(
  //   "---652------413------897---396578421582341769174926538---239------764------185---"
  // );

  // drawBoard(canvasBoard, game);

  // upper left corner

  // getValidValuesInCell(game, { x: 0, y: 0 });
  const validValuesInHouse = getValidValuesInHouse(game);

  // console.log("validValuesInHouse");
  // console.log(validValuesInHouse);

  // console.log("stage 3");

  // console.log("stage 3 for bottom left house");

  setCornerHouseWithRepeat(game, 0, 0, 4);

  repeatCounter = 0;

  setCornerHouseWithRepeat(game, 6, 0, 3);

  repeatCounter = 0;

  setCornerHouseWithRepeat(game, 6, 6, 2);

  repeatCounter = 0;

  setCornerHouseWithRepeat(game, 0, 6, 1);
};

const algo = async (game: Game) => {
  let solution: Cell[][] = [];
  let isValid = false;

  while (!isValid) {
    game.clearBoard();

    await fillBoard(game);

    isValid = game.isComplete();
    console.log("isvalid", game.isComplete());
  }

  // empty some cells

  game.setSolution(structuredClone(game.getBoard()));

  for (let i = 0; i < 50; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    game.setCell({ x, y }, 0);
  }
};

export { algo };
