const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartBtn");
const gameStatus = document.querySelector("#subTxt");
// initializing constant variables

const possibleWins = [
// all the possible wins: vertical, horizontal, and diagonal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let gridIndexes = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
// initializing changeable variables 
// for identifying current player, placeholders for the grid, and if the game is gameOver

game(); // start of game

function game() {
// main game function
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // for each cell clicked, call the cellClicked function
    restartBtn.addEventListener("click", restartGame); // calling restart function when restart button is clicked
    gameStatus.textContent = `${currentPlayer}'s Turn`; // updating status text
    gameOver = true; // game has started
}

function cellClicked() {
// function when a cell is clicked
    const cellIndex = this.getAttribute("cellIndex"); // get the attribute "cellIndex" for every cell
    console.log(cellIndex);
    if (gridIndexes[cellIndex] !== "" || !gameOver) { // if at cell index on grid is not empty: return nothing
        return;
    }

    updateCell(this, cellIndex); // callling update function with cell and cellIndex
    checkWinner(); // calling checkWinner function
}

function updateCell(cell, cellIndex) {
// function to update a cell after a move
    gridIndexes[cellIndex] = currentPlayer; // update placeholders list
    console.log(gridIndexes)
    cell.textContent = currentPlayer; // put the player's move in the clicked cell
}

function changePlayer() {
// function to change the player
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // if current player is X, then change to O, else change to X
    gameStatus.textContent = `${currentPlayer}'s Turn`; // update status text
}

function checkWinner() {
// function to check for a win, draw, or to continue
    let roundWon = false;
    for (let i = 0; i < possibleWins.length; i++) {
        const condition = possibleWins[i]; // going through each possible win
        const cellA = gridIndexes[condition[0]];
        const cellB = gridIndexes[condition[1]];
        const cellC = gridIndexes[condition[2]];
        // initialize all three positions of each possible win

        if (cellA == "" || cellB == "" || cellC == "") { // if any of the cells are empty: continue
            continue;
        }
        if (cellA == cellB && cellB == cellC) { // if all three cells have the same value: round won
            roundWon = true;
            break;
        }
    }

    if (roundWon) { // if there is a winner
        gameStatus.textContent = `${currentPlayer} has won!`
        gameOver = false;
    } else if (!gridIndexes.includes("")) { // if there is no winner and all placeholders are filled: Draw
        gameStatus.textContent = `Draw!`;
        gameOver = false;
    } else { // else: continue game
        changePlayer();
    }
}

function restartGame() {
// function when restart button is clicked
    currentPlayer = "X";
    let gridIndexes = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
    gameOver = false;
    // reset everything
    game(); // start game
}