//Global declarations.
const dictionary = require("./words_dictionary.json");
let wordsFound = [];
let bag = [];

//THis funciton creates a 2d array of 15x15 and fill it with "_".
//Think of it as a scrabble board of 15 rows and each row has 15 columns.
module.exports.scrabbleBoard = () => {
  var board = new Array(15).fill("_");

  for (i = 0; i < 15; i++) {
    board[i] = new Array(15).fill("_");
  }

  return board;
};

//This funciton takes an array i.e ["_","_","_","b","i","n","_","_","a","b","s","_","_"]
// And returns an array of all the words without dashes. [["b","i","n"], [a","b","s"]].
const withoutDash = (arr) => {
  let arrWithoutDash = [];
  let j = 0;
  while (j < arr.length) {
    let word = [];
    while (true) {
      if (arr[j] === "_") break;
      if (arr[j] != "_") word.push(arr[j]);
      j++;
    }
    j++;
    if (word.length > 0) arrWithoutDash.push(word);
  }

  return arrWithoutDash;
}

//This funciton takes an array of word i.e ["a","b","s"].
//Turns it into a string, and checks if it's a word in dictionary and not already in global variable wordsFound.
//If true, It adds it into wordsFound and returns true.
const validateWord = (word) => {
  let wordInString = word.join("");
  if (wordsFound.includes(wordInString)) return false;
  if (dictionary.hasOwnProperty(wordInString)) {
    wordsFound.push(wordInString);
    return true;
  }
  return false;
}

//This function takes the 2D array of board. Takes each row, extract words without dashes from it,
//And for each word in the words array, it checks if it's a valid word or not by passing it to validWord().
//Returns an object.
module.exports.checkHorizontal = (board) => {
  let words = [];
  for (let i = 0; i < board.length; i++) {
    let row = board[i];

    let wordsWithoutDash = withoutDash(row);
    wordsWithoutDash.map((value) => words.push(value));
  }

  for (let i = 0; i < words.length; i++) {
    if (validateWord(words[i]))
      return { validWord: true, points: words[i].length };
  }

  return { validWord: false, points: 0 };
};

//This function takes an array word, i.e ["z","a","b","s,"v","x"] and runs a loop on it. 
//It starts by checking if it's a valid word or not by passing it to validWord() function.
//if false, it keeps on popping out the last value from the array and checking if it makes a valid word.
//If false, it shifts the first value out and runs the same loop again.
//If a valid word is found, it push the length of that word to the pointsOfWordsFound array.
//Once the process is complete, it takes the max number from the pointsOfWordsFound array, and returns that in an object.
const searchWord = (word) => {
  let loop = word.length;
  let pointsOfWordsFound = [];

  for (let i = 0; i < loop; i++) {
    let findWord = [...word];
    for (let j = 0; j < findWord.length; j++) {
      if (validateWord(findWord)) pointsOfWordsFound.push(findWord.length);
      findWord.pop();
    }
    word.shift();
  }

  if (pointsOfWordsFound.length > 0) return {validWord: true, points: Math.max(...pointsOfWordsFound)};
  return { validWord: false, points: 0 };
}

//This function check if the there is a valid word in the columns of the 2d board array.
//It first runs a loop to extract the column. For each column it gets words without dashes.
//And passes each word without dash to the searchWord to check if there is a valid word in it.
//Returns an object.
module.exports.checkVertical = (board) => {
  //Extract column from 2d array
  for (let col = 0; col < board.length; col++) {
    let extractedColumn = [];
    for (let row = 0; row < 15; row++) {
      let cellValue = board[row][col];
      extractedColumn.push(cellValue);
    }

    let colWithoutDash = withoutDash(extractedColumn);

    for (let i = 0; i < colWithoutDash.length; i++) {
      let result = searchWord(colWithoutDash[i]);
      if (result.validWord === true) return result;
    }
  }

  return { validWord: false, points: 0 };
};

//This function takes the array of bag, shuffles it and returns the shuffled bag
const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

//This function initialize a bag of 100 tiles of english alphabets shuffled and stored in an array.
//The bag contains 26 english letters from a to z four times and removes the last w,x,y,z to make it up to a 100.
module.exports.initBag = () => {
  let unShuffledbag = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
  ];

  shuffledBag = shuffleArray(unShuffledbag);
  bag = [...shuffledBag];
};

module.exports.Player = class Player {
  constructor() {
    this.rack = [];
    this.points = 0;
  }

  //initiaze player's rack with random tiles of alphabets
  initRack() {
    let tiles = bag.splice(0, 7);
    tiles.forEach((value) => {
      this.rack.push(value);
    });
  }

  //Remove the tiles from the rack that the player has used.
  removeFromRack(tileToRemove) {
    let indexOfTile = this.rack.indexOf(tileToRemove);
    this.rack.splice(indexOfTile, 1);
  }

  //add more alphabets to the rack to fill it up to 7 again
  refillRack() {
    let tilesToadd = 7 - this.rack.length;
    let addTiles = bag.splice(0, tilesToadd);
    addTiles.forEach((value) => {
      this.rack.push(value);
    });
  }

  //add pooints
  addPoints(newpoints) {
    this.points = this.points + newpoints;
  }
};


module.exports.withoutDash = withoutDash;
module.exports.validateWord = validateWord;
module.exports.searchWord = searchWord;