// define variables and function to get hand
var hands = ["Rock", "Paper", "Scissors"];
var winsNeeded = 2;
var gameLog = document.querySelector("#game");
var handCard1 = document.getElementById("playerOneCard");
var handCard2 = document.getElementById("playerTwoCard");
function getHand() {
    var choice = Math.floor(Math.random() * 10 % 3);
    return hands[choice];
}
var Player = /** @class */ (function () {
    function Player(name, play, wins) {
        this.name = name;
        this.play = play;
        this.wins = wins;
    }
    return Player;
}());
// create players
var playerOne = new Player(document.querySelector("#pOne").innerHTML, getHand, 0);
var playerTwo = new Player("Earl", getHand, 0);
// define play round function
function playRound(p1, p2) {
    // sets the hand variables
    var hand1 = playerOne.play();
    var hand2 = playerTwo.play();
    // initializes round winner
    var roundWinner = null;
    // creates html elements
    var p1Hand = document.createElement("p");
    var p2Hand = document.createElement("p");
    var roundResult = document.createElement("p");
    // changes the card of player one to the hand they threw
    switch (hand1) {
        case "Rock":
            handCard1.src = "hands/rock.png";
            break;
        case "Paper":
            handCard1.src = "hands/paper.png";
            break;
        case "Scissors":
            handCard1.src = "hands/scissors.png";
    }
    // Changes card for player two
    switch (hand2) {
        case "Rock":
            handCard2.src = "hands/rock.png";
            break;
        case "Paper":
            handCard2.src = "hands/paper.png";
            break;
        case "Scissors":
            handCard2.src = "hands/scissors.png";
    }
    // checks for a tie
    if (hand1 === hand2) {
        p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
        p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
        roundResult.innerHTML = "It's a tie!";
        roundWinner = null;
        // checks for player 1 win
    }
    else if (hand1 === "Rock" && hand2 === "Scissors") {
        p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
        p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
        roundResult.innerHTML = p1.name + " wins this round!";
        roundWinner = p1;
    }
    else if (hand1 === "Paper" && hand2 === "Rock") {
        p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
        p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
        roundResult.innerHTML = p1.name + " wins this round!";
        roundWinner = p1;
    }
    else if (hand1 === "Scissors" && hand2 === "Paper") {
        p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
        p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
        roundResult.innerHTML = p1.name + " wins this round!";
        roundWinner = p1;
        // checks for player 2 win
    }
    else {
        p1Hand.innerHTML = p1.name + " threw: " + hand1 + ".";
        p2Hand.innerHTML = p2.name + " threw: " + hand2 + ".";
        roundResult.innerHTML = p2.name + " wins this round!";
        roundWinner = p2;
    }
    // HTML elements manipulation
    if (gameLog) {
        gameLog.innerHTML = p1Hand.innerHTML + " " + p2Hand.innerHTML;
        gameLog.appendChild(roundResult);
    }
    ;
    // adds to player wins if not a tie
    if (roundWinner !== null) {
        roundWinner.wins++;
    }
    // updates scoreboard
    document.querySelector("#pOneScore").innerHTML = p1.wins.toString();
    document.querySelector("#pTwoScore").innerHTML = p2.wins.toString();
    // returns the winner
    return roundWinner;
}
//press register fills in the name
document.querySelector("#playerNameForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var registration = document.querySelector("#registerName");
    var registeredName = registration.value;
    playerOne.name = registeredName;
    console.log(playerOne.name);
    document.querySelector("#pOne").innerHTML = playerOne.name;
    registration.value = "";
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("gameInputBox").style.justifyContent = "center";
    return registeredName;
});
//Enter Number of Rounds
document.querySelector("#numberRoundsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var winsInput = document.querySelector("#roundsToWin");
    winsNeeded = parseInt(winsInput.value);
    var roundsDisplay = document.createElement("p");
    roundsDisplay.innerHTML = "First to ".concat(winsNeeded, " is the winner!");
    document.querySelector("#roundsDisplay").appendChild(roundsDisplay);
    winsInput.value = "";
    document.getElementById("roundInput").style.display = "none";
    document.getElementById("gameInputBox").style.justifyContent = "center";
    console.log(winsNeeded);
    // document.querySelector("#roundsToWin").value = "";
    return winsNeeded;
});
//Press go plays a game
document.querySelector("#throwHandsButton").addEventListener("click", function () {
    playRound(playerOne, playerTwo);
    // playGame(playerOne, playerTwo, winsNeeded);
    if (playerOne.wins >= winsNeeded) {
        document.querySelector("#matchResult").innerHTML =
            playerOne.name + " is the winner of this match!";
        return playerOne;
    }
    else if (playerTwo.wins >= winsNeeded) {
        document.querySelector("#matchResult").innerHTML =
            playerTwo.name + " is the winner of this match!";
        return playerTwo;
    }
    else {
        document.querySelector("#matchResult").innerHTML =
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
