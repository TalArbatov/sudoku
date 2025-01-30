import { CanvasBoard } from "./CanvasBoard";
import { Game } from "./Game";
import { CanvasBoardParams } from "./interfaces/CanvasBoard";
import { Position, CellColorType, Settings } from "./types";
import { algo } from "./algo";

let focusedCell: Position | null = null;

const canvasBoardParams: CanvasBoardParams = {
  size: 540,
  cells: 9,
  lineWidth: 4,
};

const settings: Settings = {
  focusRelevantSets: true,
  focusSameNumbers: true,
};

const setupCanvas = (c: HTMLCanvasElement) => {
  c.height = canvasBoardParams.size;
  c.width = canvasBoardParams.size;
};

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

// this returns cell position, which is same type as pixel position
const calculateCellClicked = (pixelPosition: Position): Position => {
  const { size, cells } = canvasBoardParams;

  const cellSize = size / cells;

  const cellPosition = {
    x: Math.floor(pixelPosition.x / cellSize),
    y: Math.floor(pixelPosition.y / cellSize),
  };

  return cellPosition;
};

const drawBoard = (canvasBoard: CanvasBoard, game: Game): void => {
  canvasBoard.reset();

  if (focusedCell) {
    if (settings.focusRelevantSets) {
      const relatedPositions = game.getRelatedPositions(focusedCell);

      for (const pos of relatedPositions) canvasBoard.colorCell(pos, "highlight");
    }

    if (settings.focusSameNumbers) {
      const sameNumbers = game.getRelatedNumbers(focusedCell);

      for (const pos of sameNumbers) canvasBoard.colorCell(pos, "highlight");
    }

    canvasBoard.colorCell(focusedCell, "focus");
  }

  canvasBoard.updateNumbers(game.getValueRepresentation());

  canvasBoard.draw();
};

const onClick = (e: MouseEvent, c: HTMLCanvasElement, canvasBoard: CanvasBoard, game: Game) => {
  const { x, y } = getCursorPosition(c, e);
  const cellPosition = calculateCellClicked({ x, y });

  focusedCell = cellPosition;

  drawBoard(canvasBoard, game);
};

const onNumberInput = (
  game: Game,
  canvasBoard: CanvasBoard,
  cellPosition: Position | null,
  input: string
) => {
  if ((input < "0" || input > "9") && input !== "-") return;

  if (!cellPosition) return;

  game.setCell(cellPosition, Number(input));

  // console.log(game.isValid(cellPosition, Number(input)));

  drawBoard(canvasBoard, game);
};

const main = async () => {
  const c: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;

  if (!c) {
    console.log("error setting up canvas");

    return;
  }

  setupCanvas(c);

  const ctx: CanvasRenderingContext2D | null = c.getContext("2d");

  if (!ctx) {
    console.log("error setting up canvas context");

    return;
  }

  const canvasBoard = new CanvasBoard(ctx, canvasBoardParams);

  const game = new Game();

  await game.init();

  game.setBoard(
    "091286574487009126052014039875400692213007085004528710009603050538142060026005001"
  );

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
};

main();
