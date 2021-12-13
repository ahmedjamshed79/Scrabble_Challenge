module.exports.displayBoard = (board) => {

  console.log("____________Board Start_____________");
  console.log("0 1 2 3 4 5 6 7 8 9 10 11 12 13 14");

  for (let i = 0; i < 15; i++) {
    console.log(
      `|${board[i][0]}|${board[i][1]}|${board[i][2]}|${board[i][3]}|${
        board[i][4]
      }|${board[i][5]}|${board[i][6]}|${board[i][7]}|${board[i][8]}|${
        board[i][9]
      }|${board[i][10]}|${board[i][11]}|${board[i][12]}|${board[i][0]}|${
        board[i][13]
      }|${board[i][14]}| ${i}`
    );
  }

  console.log("____________Board End_____________");
  console.log("");
}

module.exports.displayRack = (rack) => {
    console.log("This is your rack:");
    console.log(rack);
}

module.exports.gameRules = () => {
    console.log("");
    console.log("");
    console.log("* This is a scrabble word game. There is a bag of 100 random tiles of english alphabets.");
    console.log("* Each player will be given a rack of 7 tiles.");
    console.log("* The players will have to make some english words using those tiles.");
    console.log("* If the entered tiles makes an english word, the player will receive points based on the number of characters in that word,");
    console.log("* Words can be of size 1 or more letters.");
    console.log("* The words can be formed either by combining with existing letters or on their own.");
    console.log("* In horizontal direction the word must exist disconnected from other letters that are not part of the word ");
    console.log("");
    console.log("");
}

module.exports.pointsEarned = (points, Totalpoints) => {
    console.log(`You have earned ${points} points. Your total points are ${Totalpoints}`);
    console.log("");
    console.log("");
}


module.exports.winner = (player1Points, player2Points) => {
    console.log(`Player 1 total points: ${player1Points}`);
    console.log(`Player 2 total points: ${player2Points}`);
    if (player1Points > player2Points) console.log("Player 1 is the winner.");
    if (player2Points > player1Points) console.log("Player 2 is the winner.");
}

module.exports.playerTurn = (num) => {
    console.log(`Player ${num} Turn:`);
}