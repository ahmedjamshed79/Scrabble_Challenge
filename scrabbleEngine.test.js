const scrabble = require("./scrabbleEngine.js");

test("should return a 2D array of 15x15", () => {
  const board = scrabble.scrabbleBoard();
  expect(board).toBeDefined();
  expect(board.length).toEqual(15);

  for (let i = 0; i < board.length; i++) {
    let value = board[i];
    expect(value).toBeDefined();
    expect(value.length).toEqual(15);
  }
});

test("Should return an array without dash", ()=>{
    const array = ["_", "_", "_", "b", "i", "n", "_", "_", "a", "b", "c", "_", "_", "_", "_"];
    const arrWithoutDash = scrabble.withoutDash(array);
    expect(arrWithoutDash).toStrictEqual([["b","i","n"],["a","b","c"]]);
});

test("should return true if array forms a word, else false", () => {
  const word1 = ["b", "i", "n"];
  const word2 = ["z", "x", "x"];
  const isValid = scrabble.validateWord(word1);
  const isNotValid = scrabble.validateWord(word2);
  expect(isValid).toBeTruthy();
  expect(isNotValid).toBeFalsy();
});

test("should return { validWord: true, points: 3 }", () => {
  let board = scrabble.scrabbleBoard();
  board[1][1] = "a";
  board[1][2] = "b";
  board[1][3] = "s";
  const result = scrabble.checkHorizontal(board);
  expect(result).toEqual({ validWord: true, points: 3 });
});

test("should return { validWord: false, points: 0 }", () => {
  let board = scrabble.scrabbleBoard();
  board[1][1] = "x";
  board[1][2] = "v";
  board[1][3] = "v";
  const result = scrabble.checkHorizontal(board);
  expect(result).toEqual({ validWord: false, points: 0 });
});

test("should return { validWord: true, points: 3 }", () => {
  const word1 = ["x","f", "i", "n","x"];
  const result = scrabble.searchWord(word1);
  expect(result).toEqual({ validWord: true, points: 3 });
});

test("should return { validWord: true, points: 4 }", () => {
  let board = scrabble.scrabbleBoard();
  board[1][1] = "x";
  board[2][1] = "c";
  board[3][1] = "a";
  board[4][1] = "k";
  board[5][1] = "e";
  board[6][1] = "x";
  const result = scrabble.checkVertical(board);
  expect(result).toEqual({ validWord: true, points: 4 });
});

test("should return { validWord: false, points: 0 }", () => {
  let board = scrabble.scrabbleBoard();
  board[1][1] = "x";
  board[2][1] = "v";
  board[3][1] = "q";
  board[4][1] = "z";
  board[5][1] = "f";
  const result = scrabble.checkVertical(board);
  expect(result).toEqual({ validWord: false, points: 0 });
});

test("should create an instance of player with rack =[], points = 0", () => {
  const player = new scrabble.Player();
  const rack = player.rack;
  const points  = player.points;
  expect(rack).toBeDefined();
  expect(points).toBeDefined();
  expect(rack).toStrictEqual([]);
  expect(points).toStrictEqual(0);
});

test("Testing class player's methods", () => {
  scrabble.initBag();
  let player = new scrabble.Player();
  player.initRack();
  const rack = player.rack;
  expect(rack.length).toStrictEqual(7);
  player.addPoints(6);
  const points  = player.points;
  expect(points).toStrictEqual(6);
});