import { Cell, Position } from "./types";

class Board {
  private board: Cell[][] = [];

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.board[i] = [];
    }

    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++) {
        this.board[i][j] = { value: null };
      }
  }

  public getBoard(): Cell[][] {
    return this.board;
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
}

export { Board };
