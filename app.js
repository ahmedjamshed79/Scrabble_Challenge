const view = require("./view.js");
const scrabble = require("./scrabbleEngine.js");
const prompt = require("prompt-sync")({ sigint: true });

scrabble.initBag();
let board = scrabble.scrabbleBoard();

view.gameRules();
view.displayBoard(board);

//Ceate a Player instance and initialize the rack
let player1 = new scrabble.Player();
player1.initRack();

let player2 = new scrabble.Player();
player2.initRack();

//Player 1 Turn
const player1Turn = () => {
  view.playerTurn(1);
  view.displayRack(player1.rack);
  let playOrPass1 = "";
  if (playOrPass1 != "n" || playOrPass1 != "p") {
    playOrPass1 = prompt("would you like to play(p) or pass(n): ");
  }

  if (playOrPass1 === "p") {
    let tilesToPlay = 0;
    while (tilesToPlay < 1 || tilesToPlay > 7) {
      tilesToPlay = prompt("How many tiles would you like to play 1-7: ");
    }
    let n = 0;
    while (n < tilesToPlay) {
      let tile = "";
      let row = -1;
      let col = -1;

      while (!player1.rack.includes(tile)) {
        tile = prompt("Enter a tile from rack: ");
      }

      while (row < 0 || row > 14 || row === "") {
        row = prompt("Enter row 0-14: ");
      }
      while (col < 0 || col > 14 || col === "") {
        col = prompt("Enter column 0-14: ");
      }

      if (board[row][col] != "_") {
        //Cell alrady contains a value.
        console.log(
          "The entered cell already contains a value. Choose a different cell."
        );
        while (row < 0 || row > 14 || row === "") {
          row = prompt("Enter row 0-14: ");
        }
        while (col < 0 || col > 14 || col === "") {
          col = prompt("Enter column 0-14: ");
        }
      }

      board[row][col] = tile;
      player1.removeFromRack(tile);
      view.displayBoard(board);
      view.displayRack(player1.rack);
      n++;
    }

    let hoz = scrabble.checkHorizontal(board);
    let ver = scrabble.checkVertical(board);

    if (hoz.validWord) {
      player1.addPoints(hoz.points);
      view.pointsEarned(hoz.points, player1.points);
    }
    if (ver.validWord) {
      player1.addPoints(ver.points);
      view.pointsEarned(ver.points, player1.points);
    }
    if (hoz.validWord === false && ver.validWord === false)
      view.pointsEarned(0, player1.points);

    player1.refillRack();
  }
};

//Player 2 Turn
const player2Turn = () => {
  view.playerTurn(2);
  view.displayRack(player2.rack);
  let playOrPass2 = "";
  if (playOrPass2 != "n" || playOrPass2 != "p") {
    playOrPass2 = prompt("would you like to play(p) or pass(n): ");
  }

  if (playOrPass2 === "p") {
    let tilesToPlay = 0;
    while (tilesToPlay < 1 || tilesToPlay > 7) {
      tilesToPlay = prompt("How many tiles would you like to play 1-7: ");
    }
    let n = 0;
    while (n < tilesToPlay) {
      let tile = "";
      let row = -1;
      let col = -1;

      while (!player2.rack.includes(tile)) {
        tile = prompt("Enter a tile from rack: ");
      }

      while (row < 0 || row > 14 || row === "") {
        row = prompt("Enter row 0-14: ");
      }
      while (col < 0 || col > 14 || col === "") {
        col = prompt("Enter column 0-14: ");
      }

      if (board[row][col] != "_") {
        //Cell alrady contains a value.
        console.log(
          "The entered cell already contains a value. Choose a different cell."
        );
        while (row < 0 || row > 14 || row === "") {
          row = prompt("Enter row 0-14: ");
        }
        while (col < 0 || col > 14 || col === "") {
          col = prompt("Enter column 0-14: ");
        }
      }

      board[row][col] = tile;
      player2.removeFromRack(tile);
      view.displayBoard(board);
      view.displayRack(player2.rack);
      n++;
    }

    let hoz = scrabble.checkHorizontal(board);
    let ver = scrabble.checkVertical(board);

    if (hoz.validWord) {
      player2.addPoints(hoz.points);
      view.pointsEarned(hoz.points, player2.points);
    }
    if (ver.validWord) {
      player2.addPoints(ver.points);
      view.pointsEarned(ver.points, player2.points);
    }
    if (hoz.validWord === false && ver.validWord === false)
      view.pointsEarned(0, player2.points);

    player2.refillRack();
  }
};

let numberOfPlays = 0;
while (numberOfPlays < 50) {
  player1Turn();
  player2Turn();

  if (numberOfPlays > 3) {
    let playOrQuit = prompt("Would you like to keep playing (p) or Quit (q) ");
    console.log(playOrQuit);
    if (playOrQuit === "q") break;
  }
  console.log(numberOfPlays);
  numberOfPlays++;
}

view.winner(player1.points, player2.points);
