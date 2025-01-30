class Board {
    constructor() {
        this.board = [];
        for (let i = 0; i < 9; i++) {
            this.board[i] = [];
        }
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                this.board[i][j] = { value: null };
            }
    }
    getBoard() {
        return this.board;
    }
    setCell(position, value) {
        const { x, y } = position;
        const cell = this.board[x][y];
        cell.value = value;
    }
    getCell(position) {
        const { x, y } = position;
        return this.board[x][y];
    }
}
export { Board };
