import { Game } from "./Game";

const game = new Game();

// gameBoard.setCell({ x: 0, y: 0 }, 3);
// gameBoard.setCell({ x: 1, y: 1 }, 5);

// console.log(gameBoard.getCell({ x: 0, y: 0 }));
// console.log(gameBoard.getCell({ x: 1, y: 1 }));

game.setBoard("391286574487359126652714839875431692213967485964528713149673258538142967726895341");

// game.print();

console.log(game.checkValidity());
