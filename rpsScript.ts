// define variables and function to get hand
let hands:Array<string> = ["Rock", "Paper", "Scissors"];
let winsNeeded: number = 2;
const gameLog: Element | null = document.querySelector("#game");
const handCard1:HTMLImageElement | null = document.getElementById("playerOneCard") as HTMLImageElement;
const handCard2:HTMLImageElement | null = document.getElementById("playerTwoCard") as HTMLImageElement;
function getHand() {
  let choice: number = Math.floor(Math.random() * 10 % 3);
  return hands[choice];
}
// define class for player
interface Players {
  name:string;
  play: () => string;
  wins: number;
}
class Player {
  name:string;
  play: () => string;
  wins:number;
  constructor(name: string, play: ()=> string, wins:number) {
    this.name = name;
    this.play = play;
    this.wins = wins;
  }
}
// create players
let playerOne:Players = new Player(
  document.querySelector("#pOne")!.innerHTML,
  getHand,
  0
);
let playerTwo:Players = new Player("Earl", getHand, 0);
// define play round function
function playRound(p1:Players, p2:Players) {
  // sets the hand variables
  let hand1 = playerOne.play();
  let hand2 = playerTwo.play();
  // initializes round winner
  let roundWinner = null;
  // creates html elements
  let p1Hand = document.createElement("p");
  let p2Hand = document.createElement("p");
  let roundResult = document.createElement("p");
  // changes the card of player one to the hand they threw
  switch (hand1) {
    case "Rock":
      handCard1!.src = "hands/rock.png";
      break;
    case "Paper":
      handCard1!.src = "hands/paper.png";
      break;
    case "Scissors":
      handCard1!.src = "hands/scissors.png";
  }
  // Changes card for player two
  switch (hand2) {
    case "Rock":
      handCard2!.src = "hands/rock.png";
      break;
    case "Paper":
      handCard2!.src = "hands/paper.png";
      break;
    case "Scissors":
      handCard2!.src = "hands/scissors.png";
  }
  // checks for a tie
  if (hand1 === hand2) {
    p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
    p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
    roundResult.innerHTML = "It's a tie!";
    roundWinner = null;
    // checks for player 1 win
  } else if (hand1 === "Rock" && hand2 === "Scissors") {
    p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
    p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
    roundResult.innerHTML = p1.name + " wins this round!";
    roundWinner = p1;
  } else if (hand1 === "Paper" && hand2 === "Rock") {
    p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
    p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
    roundResult.innerHTML = p1.name + " wins this round!";
    roundWinner = p1;
  } else if (hand1 === "Scissors" && hand2 === "Paper") {
    p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
    p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
    roundResult.innerHTML = p1.name + " wins this round!";
    roundWinner = p1;
    // checks for player 2 win
  } else {
    p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
    p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
    roundResult.innerHTML = p2.name + " wins this round!";
    roundWinner = p2;
  }
  // HTML elements manipulation
  if (gameLog) {
  gameLog.innerHTML = p1Hand.innerHTML + " " + p2Hand.innerHTML;
  gameLog.appendChild(roundResult);
  };
  // adds to player wins if not a tie
  if (roundWinner !== null) {
    roundWinner.wins++;
  }
  // updates scoreboard
  document.querySelector("#pOneScore")!.innerHTML = p1.wins.toString();
  document.querySelector("#pTwoScore")!.innerHTML = p2.wins.toString();
  // returns the winner
  return roundWinner;
}
//press register fills in the name
document.querySelector("#playerNameForm")!.addEventListener("submit", (e) => {
  e.preventDefault();
  const registration:HTMLInputElement | null = document.querySelector("#registerName");
  let registeredName:string = registration!.value;
  playerOne.name = registeredName;
  console.log(playerOne.name);
  document.querySelector("#pOne")!.innerHTML = playerOne.name;
  registration!.value = "";
  document.getElementById("nameInput")!.style.display = "none";
  document.getElementById("gameInputBox")!.style.justifyContent = "center";
  return registeredName;
});
//Enter Number of Rounds
document.querySelector("#numberRoundsForm")!.addEventListener("submit", (e) => {
  e.preventDefault();
  const winsInput: HTMLInputElement | null = document.querySelector("#roundsToWin");
  winsNeeded = parseInt(winsInput!.value);
  let roundsDisplay = document.createElement("p");
  roundsDisplay.innerHTML = `First to ${winsNeeded} is the winner!`;
  document.querySelector("#roundsDisplay")!.appendChild(roundsDisplay);
  winsInput!.value = "";
  document.getElementById("roundInput")!.style.display = "none";
  document.getElementById("gameInputBox")!.style.justifyContent = "center";
  console.log(winsNeeded);
  // document.querySelector("#roundsToWin").value = "";
  return winsNeeded;
});
//Press go plays a game
document.querySelector("#throwHandsButton")!.addEventListener("click", () => {
  playRound(playerOne, playerTwo);
  // playGame(playerOne, playerTwo, winsNeeded);
  if (playerOne.wins >= winsNeeded) {
    document.querySelector("#matchResult")!.innerHTML =
      playerOne.name + " is the winner of this match!";
    return playerOne;
  } else if (playerTwo.wins >= winsNeeded) {
    document.querySelector("#matchResult")!.innerHTML =
      playerTwo.name + " is the winner of this match!";
    return playerTwo;
  } else {
    document.querySelector("#matchResult")!.innerHTML =
      "The score is: " +
      playerOne.name +
      "- " +
      playerOne.wins +
      " to " +
      playerTwo.name +
      "- " +
      playerTwo.wins;
  }
});
