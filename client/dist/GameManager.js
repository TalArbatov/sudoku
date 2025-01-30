var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CanvasBoard } from "./CanvasBoard.js";
import { Game } from "./Game.js";
let focusedCell = null;
const canvasBoardParams = {
    size: 540,
    cells: 9,
    lineWidth: 4,
};
const settings = {
    focusRelevantSets: true,
    focusSameNumbers: true,
};
const setupCanvas = (c) => {
    c.height = canvasBoardParams.size;
    c.width = canvasBoardParams.size;
};
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
}
// this returns cell position, which is same type as pixel position
const calculateCellClicked = (pixelPosition) => {
    const { size, cells } = canvasBoardParams;
    const cellSize = size / cells;
    const cellPosition = {
        x: Math.floor(pixelPosition.x / cellSize),
        y: Math.floor(pixelPosition.y / cellSize),
    };
    return cellPosition;
};
const drawBoard = (canvasBoard, game) => {
    canvasBoard.reset();
    if (focusedCell) {
        if (settings.focusRelevantSets) {
            const relatedPositions = game.getRelatedPositions(focusedCell);
            for (const pos of relatedPositions)
                canvasBoard.colorCell(pos, "highlight");
        }
        if (settings.focusSameNumbers) {
            const sameNumbers = game.getRelatedNumbers(focusedCell);
            for (const pos of sameNumbers)
                canvasBoard.colorCell(pos, "highlight");
        }
        canvasBoard.colorCell(focusedCell, "focus");
    }
    canvasBoard.updateNumbers(game.getValueRepresentation());
    canvasBoard.draw();
};
const onClick = (e, c, canvasBoard, game) => {
    const { x, y } = getCursorPosition(c, e);
    const cellPosition = calculateCellClicked({ x, y });
    focusedCell = cellPosition;
    drawBoard(canvasBoard, game);
};
const onNumberInput = (game, canvasBoard, cellPosition, input) => {
    if ((input < "0" || input > "9") && input !== "-")
        return;
    if (!cellPosition)
        return;
    game.setCell(cellPosition, Number(input));
    // console.log(game.isValid(cellPosition, Number(input)));
    drawBoard(canvasBoard, game);
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const c = document.getElementById("canvas");
    if (!c) {
        console.log("error setting up canvas");
        return;
    }
    setupCanvas(c);
    const ctx = c.getContext("2d");
    if (!ctx) {
        console.log("error setting up canvas context");
        return;
    }
    const canvasBoard = new CanvasBoard(ctx, canvasBoardParams);
    const game = new Game();
    yield game.init();
    game.setBoard("091286574487009126052014039875400692213007085004528710009603050538142060026005001");
    // game.setBoard("-".repeat(81));
    game.print();
    canvasBoard.draw();
    canvasBoard.updateNumbers(game.getValueRepresentation());
    console.log(game.getValueRepresentation());
    // algo({ game, canvasBoard, drawBoard });
    // event 1: user clicks on cell
    c.addEventListener("mouseup", (e) => onClick(e, c, canvasBoard, game));
    // event 2: user presses on number
    document.addEventListener("keydown", (e) => {
        onNumberInput(game, canvasBoard, focusedCell, e.key);
    });
});
main();
