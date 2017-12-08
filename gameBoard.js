function createTurn(boardIndex, spotIndex) {

	var obj = {
  		boardIndex: boardIndex,
  		spotIndex: spotIndex
	};

	return obj;
}

async function StartGame() {
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
	highlightMiniboard(currentBoard, gameboardsWon);
	while(!gameOver){
		await sleep(300);
		var gameboardStateCopy = gameboardState.slice();
  		var playerTurn;
  		
  		if (currentPlayer == 1){
  			playerTurn = playerOneAI(gameboardStateCopy, currentBoard, currentPlayer);
  		}else{
  			playerTurn = playerTwoAI(gameboardStateCopy, currentBoard, currentPlayer);
  		}

  		if (!turnValid(playerTurn, gameboardState, currentBoard, gameboardsWon)){
  			alert("Player " + currentPlayer + " invalid move: (" + playerTurn.boardIndex + ", " + playerTurn.spotIndex + ")");
  			gameOver = true;
  			break;
  		}else{
			gameboardState[playerTurn.boardIndex][playerTurn.spotIndex] = currentPlayer;

			for (var gameboardIndex = 0; gameboardIndex < gameboardsWon.length; gameboardIndex++){
				gameboardsWon[gameboardIndex] = checkBoardWinner(gameboardState[gameboardIndex]);
			}

			if (gameboardsWon[playerTurn.spotIndex] != 0){
				currentBoard = -1;
			}else{
				currentBoard = playerTurn.spotIndex;
			}

			updateGameBoardUI(gameboardState, gameboardsWon, currentBoard);

			if (currentPlayer == 1){
				currentPlayer = 2;
			}else{
				currentPlayer = 1;
			}

			if (checkBoardWinner(gameboardsWon) != 0){
				$('.miniboard-highlight').remove();
				document.getElementById("player" + checkBoardWinner(gameboardsWon) + "Input").className += " playerWinner";
				gameOver = true;
			}
		}
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function turnValid(playerTurn, gameboardState, currentBoard, gameboardsWon) {
	if (playerTurn.boardIndex < 0 && playerTurn.boardIndex >= gameboardState.length &&
		playerTurn.spotIndex < 0 && playerTurn.spotIndex >= gameboardState[currentBoard].length){
		return false;
	}
	if (playerTurn.boardIndex != currentBoard && currentBoard != -1){
		return false;
	}
	if (gameboardsWon[playerTurn.boardIndex] != 0){
		return false;
	}
	if (gameboardState[playerTurn.boardIndex][playerTurn.spotIndex] != 0){
		return false;
	}
	return true;
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
           boardState[2] == player && boardState[5] == player && boardState[8] == player ||
           boardState[0] == player && boardState[4] == player && boardState[8] == player ||
		   boardState[2] == player && boardState[4] == player && boardState[6] == player;
}

function highlightMiniboard(currentBoard, gameboardsWon) {
	$('.miniboard-highlight').remove();
	if (currentBoard == -1){
		for (gameboardIndex = 0; gameboardIndex < gameboardsWon.length; gameboardIndex++) {
			 if (gameboardsWon[gameboardIndex] == 0){
				addHighlightBoardTo(gameboardIndex);
			}
		}
	}else{
		addHighlightBoardTo(currentBoard);
	}
}

function updateGameBoardUI(gameboardState, gameboardsWon, currentBoard){
	$('.x').remove();
	$('.o').remove();
	$('.miniboard-o').remove();
	$('.miniboard-x').remove();
	$('.miniboard-cat').remove();
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
	for (gameboardIndex = 0; gameboardIndex < gameboardsWon.length; gameboardIndex++) {
		if (gameboardsWon[gameboardIndex] == 1){
			addPlayerBoardTo(gameboardIndex, 1);
		}
		if (gameboardsWon[gameboardIndex] == 2){
			addPlayerBoardTo(gameboardIndex, 2);
		}
		if (gameboardsWon[gameboardIndex] == -1){
			addPlayerBoardTo(gameboardIndex, -1);
		}
	}
	highlightMiniboard(currentBoard, gameboardsWon);
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

function addPlayerBoardTo(gameboardIndex, player) {
	var gameboardTopIndex = (Math.floor(gameboardIndex / 3)) * 210;
	var gameboardLeftIndex = (gameboardIndex % 3) * 210;

	var div = document.createElement("div");
	div.style.top = gameboardTopIndex + "px";
	div.style.left = gameboardLeftIndex + "px";
	if (player == 1){
		div.className = "miniboard-x";
	}else if (player == 2){
		div.className = "miniboard-o";
	}else{
		div.className = "miniboard-cat";
	}
	document.getElementById("gameboard").appendChild(div);
}

function addHighlightBoardTo(gameboardIndex){
	var gameboardTopIndex = (Math.floor(gameboardIndex / 3)) * 210;
	var gameboardLeftIndex = (gameboardIndex % 3) * 210;

	var div = document.createElement("div");
	div.style.top = gameboardTopIndex + "px";
	div.style.left = gameboardLeftIndex + "px";
	div.className = "miniboard-highlight";
	document.getElementById("gameboard").appendChild(div);
}
