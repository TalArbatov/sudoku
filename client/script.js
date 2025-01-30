let focusedCell = null;

const getCanvasProperties = function () {
  const canvasProperties = {
    size: 540,
    cells: 9,
    lineWidth: 8,
  };

  canvasProperties.cellSize = canvasProperties.size / canvasProperties.cells;

  return canvasProperties;
};

const canvasProperties = getCanvasProperties();

const { size: canvasSize, cellSize, lineWidth } = canvasProperties;

// const colors = {
//   background: "#ffffff",
//   lines: {
//     primary: "black",
//     secondary: "grey",
//   },
//   cells: {
//     focus: "#bae2ff",
//   },
//   text: {
//     userInputValid: "black",
//   },
// };

// const setupCanvas = (c) => {
//   c.height = canvasSize;
//   c.width = canvasSize;
// };

// const drawFrame = (ctx) => {
//   ctx.strokeStyle = colors.lines.primary;
//   ctx.lineWidth = lineWidth;

//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   ctx.lineTo(0, canvasSize);
//   ctx.lineTo(canvasSize, canvasSize);
//   ctx.lineTo(canvasSize, 0);
//   ctx.lineTo(0, 0);

//   ctx.stroke();
// };

// const drawLines = (ctx) => {
//   ctx.lineWidth = lineWidth / 2;
//   const lineSpacing = canvasSize / 9;

//   for (let i = 1; i < 9; i++) {
//     ctx.strokeStyle = colors.lines.secondary;
//     ctx.beginPath();
//     ctx.moveTo(0, i * lineSpacing);
//     ctx.lineTo(canvasSize, i * lineSpacing);

//     ctx.moveTo(i * lineSpacing, 0);
//     ctx.lineTo(i * lineSpacing, canvasSize);

//     ctx.stroke();
//   }
//   for (let i = 3; i < 9; i += 3) {
//     ctx.strokeStyle = colors.lines.primary;
//     ctx.beginPath();
//     ctx.moveTo(0, i * lineSpacing);
//     ctx.lineTo(canvasSize, i * lineSpacing);

//     ctx.moveTo(i * lineSpacing, 0);
//     ctx.lineTo(i * lineSpacing, canvasSize);

//     ctx.stroke();
//   }
// };

// function getCursorPosition(canvas, event) {
//   const rect = canvas.getBoundingClientRect();
//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;
//   console.log("x: " + x + " y: " + y);

//   return { x, y };
// }

// const calculateCellClicked = (pixelPosition) => {
//   const cellPosition = {
//     x: Math.floor(pixelPosition.x / cellSize),
//     y: Math.floor(pixelPosition.y / cellSize),
//   };
//   console.log(cellPosition);

//   return cellPosition;
// };

// const focusCell = (ctx, position) => {
//   const topLeftPosition = {
//     x: cellSize * position.x,
//     y: cellSize * position.y,
//   };

//   ctx.fillStyle = colors.cells.focus;

//   ctx.fillRect(
//     topLeftPosition.x + lineWidth / 4,
//     topLeftPosition.y + lineWidth / 4,
//     cellSize - lineWidth / 2,
//     cellSize - lineWidth / 2
//   );

//   console.log(topLeftPosition);
// };

// const resetCanvas = (ctx) => {
//   ctx.fillStyle = colors.background;
//   ctx.fillRect(0, 0, canvasSize, canvasSize);
// };

// const onClick = (e, c, ctx) => {
//   const { x, y } = getCursorPosition(c, e);
//   const position = calculateCellClicked({ x, y });

//   resetCanvas(ctx);
//   drawLines(ctx);
//   drawFrame(ctx);

//   focusCell(ctx, position);

//   focusedCell = position;
//   console.log("focusedCell");
//   console.log(position);
// };

// const onNumberInput = (ctx, cellPosition, number) => {
//   if (number < "0" || number > "9") return;

//   fillNumber(ctx, cellPosition, number);
// };

// const fillNumber = (ctx, cellPosition, number) => {
//   console.log("fillNumber");
//   ctx.fillStyle = colors.text.userInputValid;
//   ctx.font = `${cellSize * 0.8}px Arial`;

//   const centerBoardPos = {
//     x: cellPosition.x * cellSize + 0.25 * cellSize,
//     y: cellPosition.y * cellSize + 0.8 * cellSize,
//   };

//   ctx.fillText(number, centerBoardPos.x, centerBoardPos.y);
// };

const main = () => {
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");

  c.addEventListener("mouseup", (e) => onClick(e, c, ctx));
  document.addEventListener("keydown", (e) => {
    console.log("keydown");
    console.log(e.key);
    onNumberInput(ctx, focusedCell, e.key);
  });

  setupCanvas(c);

  // TODO: change canvas size according to dynamic size

  drawLines(ctx);
  drawFrame(ctx);

  fillNumber(ctx, { x: 3, y: 3 }, 4);
  fillNumber(ctx, { x: 4, y: 4 }, 2);
  fillNumber(ctx, { x: 5, y: 5 }, 1);
};

main();
