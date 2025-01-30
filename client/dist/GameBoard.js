import { algo } from "./new-algo.js";
class Game {
    constructor() {
        this.board = [];
        this.solution = "1221115125123125215215125125215";
        this.clearBoard = () => {
            this.setBoard("-".repeat(81));
        };
        this.rowToString = (row) => {
            let str = "| ";
            row.forEach((c, index) => (str += `${c.value} ${(index + 1) % 3 === 0 ? "| " : " "}`));
            return str;
        };
        this.cellCount = 9;
        for (let i = 0; i < this.cellCount; i++) {
            this.board[i] = [];
        }
        for (let i = 0; i < this.cellCount; i++)
            for (let j = 0; j < this.cellCount; j++) {
                this.board[i][j] = { value: null };
            }
    }
    init() {
        algo(this);
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
    setBoard(stringRepresentation) {
        const numbers = stringRepresentation.split("");
        let counter = 0;
        if (numbers.length !== 81) {
            console.log("invalid input length");
            return;
        }
        for (let i = 0; i < this.cellCount; i++)
            for (let j = 0; j < this.cellCount; j++) {
                const input = numbers[counter];
                const number = Number(input);
                if (input === "-") {
                    this.setCell({ x: i, y: j }, null);
                }
                else if (Number.isNaN(number)) {
                    console.log("invaid number detected");
                    return;
                }
                this.setCell({ x: i, y: j }, number);
                counter++;
            }
    }
    getColumn(num) {
        const column = [];
        this.board.forEach((row) => column.push(row[num]));
        return column;
    }
    getRow(num) {
        return this.board[num];
    }
    getHouse(rowPos, columnPos) {
        const set = [];
        for (let i = rowPos * 3; i < rowPos * 3 + 3; i++) {
            for (let j = columnPos * 3; j < columnPos * 3 + 3; j++) {
                set.push(this.board[i][j]);
            }
        }
        return set;
    }
    isSetValid(row) {
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
    checkValidity() {
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
    print() {
        console.log("-".repeat(31));
        for (let i = 0; i < 9; i++) {
            console.log(this.rowToString(this.board[i]));
            if (i + 1 === 3 || i + 1 === 6)
                console.log("-".repeat(31));
        }
        console.log("-".repeat(31));
    }
    getValueRepresentation() {
        let value = "";
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                const cellValue = this.board[i][j].value || "-";
                value += cellValue;
            }
        return value;
    }
    getRelatedPositions(cellPosition) {
        const positions = [];
        // get row indexes
        for (let i = 0; i < 9; i++)
            positions.push({ x: cellPosition.x, y: i });
        // get column indexes
        for (let i = 0; i < 9; i++)
            positions.push({ x: i, y: cellPosition.y });
        // TODO: house terminology
        // get square indexes
        const firstCellInSquare = {
            x: Math.floor(cellPosition.x / 3) * 3,
            y: Math.floor(cellPosition.y / 3) * 3,
        };
        const { x, y } = firstCellInSquare;
        for (let i = x; i < x + 3; i++)
            for (let j = y; j < y + 3; j++)
                positions.push({ x: i, y: j });
        // TODO: unique
        return positions;
    }
}
export { Game };
