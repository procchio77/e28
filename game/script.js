// initial setup stuff
var player1 = 'X';
var player2 = 'O';
var player1Score = 0;
var player2Score = 0;
var ties = 0;
var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var gamesWantToPlay = 0;
var gamesPlayed = 0;
var whoToBegin = null;
var isEndGame = false;
var turnCounter = 0;
const cells = document.querySelectorAll('.cell');


// The initial game setup, and first game after answering questions.
function beginGames() {
    setupGameBoard();
    setScores();
    gamesWantToPlay = document.getElementById("gamesToPlay").value;
    document.getElementById("player1Name").textContent = document.getElementById("screenname").value + ": ";
    toggleVisibility();

    //set who is going first
    let startPos = document.querySelector('input[name="start"]:checked').value;

    if (startPos == 1) {
        whoToBegin = player1;
    }
    else {
        whoToBegin = player2;
    }

    document.getElementById("nextGame").style.display = "none";
    setGameCountMessage();

    //hanlde if the computer goes first.
    if (whoToBegin == player2) {
        turn(pickCell(), player2);
    }

}

function nextGame() {
    setupGameBoard();
    gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    turnCounter = 0;
    document.getElementById("nextGame").style.display = "none";
    setGameCountMessage();
    isEndGame = false;

    if (whoToBegin == player2) {
        turn(pickCell(), player2);
    }

}

//reset the game and bring back to orignal question screen.
function resetGame() {
    setupGameBoard();
    resetGlobalVariables();
    setScores();
    toggleVisibility();
}


function endGame() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', cellClick, false);
    }
    gamesPlayed++;
    setScores();

    if (whoToBegin == "X") {
        whoToBegin = "O";
    }
    else {
        whoToBegin = "X";
    }

    toggleNextGameButton();
    isEndGame = true;
}

// when a user clicks in a tic tac toe square
function cellClick(cell) {

    // making sure not to override existing cell
    if (typeof gameBoard[cell.target.id] == 'number') {

        //Human Player (since they do the clicking)
        turn(cell.target.id, player1);

        //computer player
        if (!isEndGame) {
            turn(pickCell(), player2);
        }

    }

}

function turn(cellId, player) {
    gameBoard[cellId] = player;

    document.getElementById(cellId).innerText = player;
    if (player == player1) {
        document.getElementById(cellId).style.color = 'red';
    }
    else {
        document.getElementById(cellId).style.color = 'green';
    }


    turnCounter++;

    //Check winnner
    if (turnCounter > 4) {
        if (checkWinner(player, gameBoard)) {
            if (player == player1) {
                player1Score++;
            } else {
                player2Score++;
            }
            endGame();
        }
    }

    //check if we have a tie
    if (turnCounter == 9) {
        ties++;
        endGame();
    }

}

function pickCell() {

    let emptyCells = getEmptyCells(board);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return randomCell;

}

function checkWinner(player, board) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function getEmptyCells(board) {
    return gameBoard.filter(z => z != player1 && z != player2);
}

function resetGlobalVariables() {
    player1Score = 0;
    player2Score = 0;
    ties = 0;
    gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    turnCounter = 0;
    gamesWantToPlay = 0;
    gamesPlayed = 0;
    whoToBegin = null;
    isEndGame = false;
}

function setScores() {
    let inputP1Score = document.getElementById("p1score");
    inputP1Score.value = player1Score;
    let inputP2Score = document.getElementById("p2score");
    inputP2Score.value = player2Score;
    let inpuTie = document.getElementById("tie");
    inpuTie.value = ties;
}

function setupGameBoard() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener('click', cellClick, false);
    }
}

function toggleVisibility() {

    var b = document.getElementById("board");
    var s = document.getElementById("scores");
    var q = document.getElementById("questions");

    //board
    if (getStyle(b, "display") == "none") {
        b.style.display = "grid";
    } else {
        b.style.display = "none";
    }

    //scores
    if (getStyle(s, "display") == "none") {
        s.style.display = "block";
    } else {
        s.style.display = "none";
    }

    //questions
    if (getStyle(q, "display") == "none") {
        q.style.display = "block";
    } else {
        q.style.display = "none";
    }

}

function toggleNextGameButton() {

    //nextGame Button
    var b = document.getElementById("nextGame");
    if (gamesWantToPlay - gamesPlayed > 0) {
        b.style.display = "inline";
    }
    else {
        b.style.display = "none";
    }

}

function getStyle(element, styleName) {
    return element.currentStyle ? element.currentStyle[styleName] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(styleName) : null;
}

function setGameCountMessage() {
    let gamePlaying = gamesPlayed + 1;
    document.getElementById('gameCount').textContent = 'You are playing game ' + gamePlaying + ' of ' + gamesWantToPlay;
}



