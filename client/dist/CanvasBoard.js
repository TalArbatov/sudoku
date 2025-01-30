const colors = {
    background: "#ffffff",
    cellBackground: {
        focus: "#abd6f5",
        highlight: "#dfecf5",
    },
    lines: {
        primary: "black",
        secondary: "grey",
    },
    text: {
        preGenerated: "black",
        userInputValid: "blue",
        userInputInvalid: "red",
    },
};
class CanvasBoard {
    constructor(ctx, canvasBoardParams) {
        this.ctx = ctx;
        this.canvasBoardParams = canvasBoardParams;
    }
    drawFrame() {
        const { size, lineWidth } = this.canvasBoardParams;
        this.ctx.strokeStyle = colors.lines.primary;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, size);
        this.ctx.lineTo(size, size);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke();
    }
    drawLines() {
        const { lineWidth, size } = this.canvasBoardParams;
        this.ctx.lineWidth = lineWidth / 2;
        const lineSpacing = size / 9;
        for (let i = 1; i < 9; i++) {
            this.ctx.strokeStyle = colors.lines.secondary;
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * lineSpacing);
            this.ctx.lineTo(size, i * lineSpacing);
            this.ctx.moveTo(i * lineSpacing, 0);
            this.ctx.lineTo(i * lineSpacing, size);
            this.ctx.stroke();
        }
        for (let i = 3; i < 9; i += 3) {
            this.ctx.strokeStyle = colors.lines.primary;
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * lineSpacing);
            this.ctx.lineTo(size, i * lineSpacing);
            this.ctx.moveTo(i * lineSpacing, 0);
            this.ctx.lineTo(i * lineSpacing, size);
            this.ctx.stroke();
        }
    }
    draw() {
        this.drawLines();
        this.drawFrame();
    }
    reset() {
        const { size } = this.canvasBoardParams;
        this.ctx.fillStyle = colors.background;
        this.ctx.fillRect(0, 0, size, size);
    }
    colorCell(position, colorType) {
        const { size, cells, lineWidth } = this.canvasBoardParams;
        const cellSize = size / cells;
        const topLeftPosition = {
            x: cellSize * position.x,
            y: cellSize * position.y,
        };
        this.ctx.fillStyle = colors.cellBackground[colorType];
        this.ctx.fillRect(topLeftPosition.x + lineWidth / 4, topLeftPosition.y + lineWidth / 4, cellSize - lineWidth / 2, cellSize - lineWidth / 2);
    }
    fillNumber(cellPosition, input) {
        if (input === "-") {
            return;
        }
        const { size, cells } = this.canvasBoardParams;
        const cellSize = size / cells;
        this.ctx.fillStyle = colors.text.preGenerated;
        this.ctx.font = `${cellSize * 0.8}px Arial`;
        const centerBoardPos = {
            x: cellPosition.x * cellSize + 0.25 * cellSize,
            y: cellPosition.y * cellSize + 0.8 * cellSize,
        };
        this.ctx.fillText(input, centerBoardPos.x, centerBoardPos.y);
    }
    updateNumbers(valueRepresentation) {
        let counter = 0;
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                const cellPosition = { x: i, y: j };
                this.fillNumber(cellPosition, valueRepresentation[counter]);
                counter++;
            }
    }
}
export { CanvasBoard };
