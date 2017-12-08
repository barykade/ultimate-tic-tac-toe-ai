window.onload = UltimateTicTacToe;

function createTurn(boardIndex, spotIndex) {

	var obj = {
  		boardIndex: boardIndex,
  		spotIndex: spotIndex
	};

	return obj;
}

async function UltimateTicTacToe() {
	var gameboardsWon = [0, 0, 0,
						 0, 0, 0,
						 0, 0, 0];

	var gameboardState = [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
				];

	var gameOver = false;
	var currentBoard = -1;
	var currentPlayer = 1;
	while(!gameOver){
		
  		await sleep(300);
		var playerTurn = PlayerAI(gameboardState, currentBoard);
		gameboardState[playerTurn.boardIndex][playerTurn.spotIndex] = currentPlayer;
		updateGameBoardUI(gameboardState);

		for (var gameboardIndex = 0; gameboardIndex < gameboardsWon.length; gameboardIndex++){
			gameboardsWon[gameboardIndex] = checkBoardWinner(gameboardState[gameboardIndex]);
		}

		if (gameboardsWon[playerTurn.spotIndex] != 0){
			currentBoard = -1;
		}else{
			currentBoard = playerTurn.spotIndex;
		}

		if (currentPlayer == 1){
			currentPlayer = 2;
		}else{
			currentPlayer = 1;
		}

		if (checkBoardWinner(gameboardsWon) != 0){
			gameOver = true;
		}
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function PlayerAI(gameboardState, currentBoard){
	var turn = createTurn(-1, -1);
	if (currentBoard == -1){
		for (var i = 0; i < gameboardState.length; i++){
			if(checkBoardWinner(gameboardState[i]) == 0){
				turn.boardIndex = i;
				currentBoard = i;
				break;
			}
		}
		for (var i = 0; i < gameboardState.length; i++){
			if(gameboardState[currentBoard][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	}else{
		turn.boardIndex = currentBoard;
		for (var i = 0; i < gameboardState.length; i++){
			if(gameboardState[currentBoard][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	}
	return turn;
}

function checkBoardWinner(boardState){
	if (boardWinner(boardState, 1)){
		return 1;
	}
	if (boardWinner(boardState, 2)){
		return 2;
	}
	if (boardFull(boardState)){
		return -1;
	}
	return 0;
}

function boardFull(boardState){
	for (var i = 0; i < boardState.length; i++){
		if (boardState[i] == 0){
			return false;
		}
	}
	return true;
}

function boardWinner(boardState, player){
	return boardState[0] == player && boardState[1] == player && boardState[2] == player ||
           boardState[3] == player && boardState[4] == player && boardState[5] == player ||
		   boardState[6] == player && boardState[7] == player && boardState[8] == player ||
           boardState[0] == player && boardState[3] == player && boardState[6] == player ||
		   boardState[1] == player && boardState[4] == player && boardState[7] == player ||
           boardState[2] == player && boardState[6] == player && boardState[8] == player ||
           boardState[0] == player && boardState[5] == player && boardState[8] == player ||
		   boardState[2] == player && boardState[5] == player && boardState[6] == player;
}

function updateGameBoardUI(gameboardState){
	$('.x').remove();
	$('.o').remove();
	for (gameboardIndex = 0; gameboardIndex < gameboardState.length; gameboardIndex++) { 
		for (spotIndex = 0; spotIndex < gameboardState[gameboardIndex].length; spotIndex++){
			if (gameboardState[gameboardIndex][spotIndex] == 1) {
				addPlayer1To(gameboardIndex, spotIndex);
			}
			if (gameboardState[gameboardIndex][spotIndex] == 2) {
				addPlayer2To(gameboardIndex, spotIndex);
			}
		}
	}
}

function addPlayer1To(gameboardIndex, spotIndex){
	var div = document.createElement("div");
	div.style.top = getTopFor(gameboardIndex, spotIndex) + "px";
	div.style.left = getLeftFor(gameboardIndex, spotIndex) + "px";;
	div.className = "x";
	document.getElementById("gameboard").appendChild(div);
}

function addPlayer2To(gameboardIndex, spotIndex){
	var div = document.createElement("div");
	div.style.top = getTopFor(gameboardIndex, spotIndex) + "px";
	div.style.left = getLeftFor(gameboardIndex, spotIndex) + "px";;
	div.className = "o";
	document.getElementById("gameboard").appendChild(div);
}

function getTopFor(gameboardIndex, spotIndex) {
	var gameboardTopIndex = Math.floor(gameboardIndex / 3);
	var spotTopIndex = Math.floor(spotIndex / 3);
	return gameboardTopIndex * 210 + spotTopIndex * 70;
}

function getLeftFor(gameboardIndex, spotIndex) {
	var gameboardTopIndex = gameboardIndex % 3;
	var spotTopIndex = spotIndex % 3;
	return gameboardTopIndex * 210 + spotTopIndex * 70;
}