import { algo } from "./new-algo";
import { Cell, Position } from "./types";

class Game {
  private board: Cell[][] = [];

  private solution: Cell[][] = [];

  // private collisions: Position[][] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.board[i] = [];
    }

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        this.board[i][j] = { value: null };
      }
  }

  public async init(): Promise<void> {
    await algo(this);
  }

  public setCell(position: Position, value: number | null): void {
    const { x, y } = position;

    const cell = this.board[x][y];

    cell.value = value;
  }

  public getCell(position: Position): Cell {
    const { x, y } = position;

    return this.board[x][y];
  }

  public getIncorrectCells(): Position[] {
    const positions = [];

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (this.board[i][j].value !== this.solution[i][j].value) {
          positions.push({ x: i, y: j });
        }

    return positions;
  }

  public setBoard(stringRepresentation: string): void {
    const numbers = stringRepresentation.split("");

    let counter = 0;

    if (numbers.length !== 81) {
      console.log("invalid input length");

      return;
    }

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        const input = numbers[counter];

        const number = Number(input);
        if (number === 0) {
          this.setCell({ x: i, y: j }, null);
        } else if (Number.isNaN(number)) {
          console.log("invaid number detected");

          return;
        }
        this.setCell({ x: i, y: j }, number);

        counter++;
      }
  }

  public clearBoard = (): void => {
    this.setBoard("-".repeat(81));
  };

  private rowToString = (row: Cell[]): string => {
    let str = "| ";

    row.forEach((c, index) => (str += `${c.value} ${(index + 1) % 3 === 0 ? "| " : " "}`));

    return str;
  };

  public getColumn(num: number): Cell[] {
    const column: Cell[] = [];
    this.board.forEach((row) => column.push(row[num]));

    return column;
  }

  public getRow(num: number): Cell[] {
    return this.board[num];
  }

  public getHouse(rowPos: number, columnPos: number): Cell[] {
    const set: Cell[] = [];

    for (let i = rowPos * 3; i < rowPos * 3 + 3; i++) {
      for (let j = columnPos * 3; j < columnPos * 3 + 3; j++) {
        set.push(this.board[i][j]);
      }
    }

    return set;
  }

  private isSetValid(row: Cell[]): boolean {
    const numInstancesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    row.forEach((c) => {
      if (!c.value) {
        console.log("set invalid since it contains empty values");

        return;
      }

      numInstancesCount[c.value]++;
    });

    let isValid = true;

    numInstancesCount.shift();

    numInstancesCount.forEach((count) => {
      if (count !== 1) {
        isValid = false;
      }
    });

    return isValid;
  }

  public checkValidity(): boolean {
    for (let i = 0; i < 9; i++) {
      if (!this.isSetValid(this.getRow(i)) || !this.isSetValid(this.getColumn(i))) {
        return false;
      }
    }

    // check for squares
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) {
        if (!this.isSetValid(this.getHouse(i, j))) {
          console.log(`column ${i} is invalid`);
          return false;
        }
      }

    return true;
  }

  public print() {
    console.log("-".repeat(31));

    for (let i = 0; i < 9; i++) {
      console.log(this.rowToString(this.board[i]));

      if (i + 1 === 3 || i + 1 === 6) console.log("-".repeat(31));
    }

    console.log("-".repeat(31));
  }

  public getValueRepresentation(): string {
    let value = "";

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        const cellValue = this.board[i][j].value || "-";

        value += cellValue;
      }

    return value;
  }

  public getRelatedNumbers(cellPosition: Position): Position[] {
    const positions: Position[] = [];
    const { value } = this.board[cellPosition.x][cellPosition.y];
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j].value === value) {
          positions.push({ x: i, y: j });
        }
      }

    return positions;
  }
  public getRelatedPositions(cellPosition: Position): Position[] {
    const positions = [];

    // get row indexes
    for (let i = 0; i < 9; i++) positions.push({ x: cellPosition.x, y: i });

    // get column indexes
    for (let i = 0; i < 9; i++) positions.push({ x: i, y: cellPosition.y });

    // TODO: house terminology

    // get square indexes
    const firstCellInSquare: Position = {
      x: Math.floor(cellPosition.x / 3) * 3,
      y: Math.floor(cellPosition.y / 3) * 3,
    };

    const { x, y } = firstCellInSquare;

    for (let i = x; i < x + 3; i++) for (let j = y; j < y + 3; j++) positions.push({ x: i, y: j });

    // TODO: unique

    return positions;
  }

  public getBoard(): Cell[][] {
    return this.board;
  }

  public isComplete(): boolean {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        if (!this.getCell({ x: i, y: j }).value) return false;
      }

    return true;
  }

  public isValid(pos: Position, value: number | null): boolean {
    if (!value) return true;

    console.log("value", value);
    console.log("solution", this.solution[pos.x][pos.y].value);
    return value === this.solution[pos.x][pos.y].value;
  }

  public setSolution(board: Cell[][]) {
    this.solution = board;
  }
}

export { Game };
