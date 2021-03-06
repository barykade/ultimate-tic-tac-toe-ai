function Turn(boardIndex, spotIndex) {

	var obj = {
  		boardIndex: boardIndex,
  		spotIndex: spotIndex
	};

	return obj;
}

function GameSnapshot(gameboardState, gameboardsWon, currentBoard){

	var obj = {
		gameboardState: gameboardState,
		gameboardsWon: gameboardsWon,
		currentBoard: currentBoard
	};

	return obj;
}
	
var allTurns = [];
var currentTurn = 0;
var allWins = [];
var player1Wins = 0;
var player2Wins = 0;
var catsWins = 0;

async function PlayMultipleGames() {
	allWins = [];
	player1Wins = 0;
	player2Wins = 0;
	catsWins = 0;

	$("#player1Input").removeClass("playerWinner");
	$("#player2Input").removeClass("playerWinner");
	$('.x').remove();
	$('.o').remove();
	$('.miniboard-o').remove();
	$('.miniboard-x').remove();
	$('.miniboard-cat').remove();

	var gamesToPlay = $('#multipleGamesInput').val();
	var lastUpdatedUI = 0;
	while(allWins.length < gamesToPlay){
		if (allWins.length >= (lastUpdatedUI + gamesToPlay / 100)) {
			lastUpdatedUI = allWins.length;
			await sleep(1);
		}
		await StartGame(false);
		$("#player1Wins").html(player1Wins);
		$("#player2Wins").html(player2Wins);
	}

	$("#decrementAllButton").css("visibility", "hidden");
	$("#decrementButton").css("visibility", "hidden");
	$("#incrementButton").css("visibility", "hidden");
	$("#incrementAllButton").css("visibility", "hidden");
	if (player1Wins > player2Wins){
		$("#player1Input").addClass("playerWinner");
	}else if(player2Wins > player1Wins){
		$("#player2Input").addClass("playerWinner");
	}

	$("#player1Wins").html(player1Wins);
	$("#player2Wins").html(player2Wins);
}

async function StartGame(updateUI) {

	if(updateUI){
		$("#decrementAllButton").css("visibility", "hidden");
		$("#decrementButton").css("visibility", "hidden");
		$("#incrementButton").css("visibility", "hidden");
		$("#incrementAllButton").css("visibility", "hidden");
		$("#multipleGamesInput").css("visibility", "hidden");
		$("#playMultipleGamesButton").css("visibility", "hidden");
		$("#startGameButton").css("visibility", "hidden");
		$("#player1Input").removeClass("playerWinner");
		$("#player2Input").removeClass("playerWinner");
	}

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
	if(updateUI){
		highlightMiniboard(currentBoard, gameboardsWon);

		allTurns = [];
		currentTurn = 0;

		var gameboardCopy = [];
		for (var i = 0; i < gameboardState.length; i++){
			gameboardCopy[i] = gameboardState[i].slice();
		}
		var gameboardsWonCopy = gameboardsWon.slice();
		var gameSnapshot = GameSnapshot(gameboardCopy, gameboardsWonCopy, currentBoard);
		allTurns.push(gameSnapshot);
	}

	while(!gameOver){
		if (updateUI){
			await sleep(50);
		}
		var gameboardStateCopy = [];
		for (var i = 0; i < gameboardState.length; i++){
			gameboardStateCopy[i] = gameboardState[i].slice();
		}
		var gameboardsWonCopy = gameboardsWon.slice();
  		var playerTurn;
  		
  		if (currentPlayer == 1){
  			playerTurn = await playerOneAI(gameboardStateCopy, gameboardsWon, currentBoard, currentPlayer);
  		}else{
  			playerTurn = await playerTwoAI(gameboardStateCopy, gameboardsWon, currentBoard, currentPlayer);
  		}

  		if (!turnValid(playerTurn, gameboardState, currentBoard, gameboardsWon)){
  			if(updateUI){
  				alert("Player " + currentPlayer + " invalid move: (" + playerTurn.boardIndex + ", " + playerTurn.spotIndex + ")");

				$('.miniboard-highlight').remove();
				$("#decrementAllButton").css("visibility", "visible");
				$("#decrementButton").css("visibility", "visible");
				$("#incrementButton").css("visibility", "visible");
				$("#incrementAllButton").css("visibility", "visible");
				$("#multipleGamesInput").css("visibility", "visible");
				$("#playMultipleGamesButton").css("visibility", "visible");
				$("#startGameButton").css("visibility", "visible");
				if (currentPlayer == 2){
					$("#player1Input").addClass("playerWinner");
					player1Wins++;
					allWins.push(1);
				}else if(currentPlayer == 1){
					$("#player2Input").addClass("playerWinner");
					player2Wins++;
					allWins.push(2);
				}

				$("#player1Wins").html(player1Wins);
				$("#player2Wins").html(player2Wins);

  			}else{
  				if (currentPlayer == 2){
					player1Wins++;
					allWins.push(1);
				}else if(currentPlayer == 1){
					player2Wins++;
					allWins.push(2);
				}
  			}

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

			if (updateUI){
				var gameboardCopy = [];
				for (var i = 0; i < gameboardState.length; i++){
					gameboardCopy[i] = gameboardState[i].slice();
				}
				var gameboardsWonCopy = gameboardsWon.slice();
				var gameSnapshot = GameSnapshot(gameboardCopy, gameboardsWonCopy, currentBoard);
				allTurns.push(gameSnapshot);
  				currentTurn++;
			}


  			if (updateUI){
				updateGameBoardUI(gameboardState, gameboardsWon, currentBoard);
			}

			if (currentPlayer == 1){
				currentPlayer = 2;
			}else{
				currentPlayer = 1;
			}

			if (checkBoardWinner(gameboardsWon) != 0){
				if(updateUI){
					$('.miniboard-highlight').remove();
					$("#decrementAllButton").css("visibility", "visible");
					$("#decrementButton").css("visibility", "visible");
					$("#incrementButton").css("visibility", "visible");
					$("#incrementAllButton").css("visibility", "visible");
					$("#multipleGamesInput").css("visibility", "visible");
					$("#playMultipleGamesButton").css("visibility", "visible");
					$("#startGameButton").css("visibility", "visible");
					if (checkBoardWinner(gameboardsWon) == 1){
						$("#player1Input").addClass("playerWinner");
						player1Wins++;
						allWins.push(1);
					}else if(checkBoardWinner(gameboardsWon) == 2){
						$("#player2Input").addClass("playerWinner");
						player2Wins++;
						allWins.push(2);
					}else{
						catsWins++;
						allWins.push(-1);
					}

					$("#player1Wins").html(player1Wins);
					$("#player2Wins").html(player2Wins);
				}else{
					if (checkBoardWinner(gameboardsWon) == 1){
						player1Wins++;
						allWins.push(1);
					}else if(checkBoardWinner(gameboardsWon) == 2){
						player2Wins++;
						allWins.push(2);
					}else{
						catsWins++;
						allWins.push(-1);
					}
				}
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
	return gameboardTopIndex * 180 + spotTopIndex * 60;
}

function getLeftFor(gameboardIndex, spotIndex) {
	var gameboardTopIndex = gameboardIndex % 3;
	var spotTopIndex = spotIndex % 3;
	return gameboardTopIndex * 180 + spotTopIndex * 60;
}

function addPlayerBoardTo(gameboardIndex, player) {
	var gameboardTopIndex = (Math.floor(gameboardIndex / 3)) * 180;
	var gameboardLeftIndex = (gameboardIndex % 3) * 180;

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
	var gameboardTopIndex = (Math.floor(gameboardIndex / 3)) * 180;
	var gameboardLeftIndex = (gameboardIndex % 3) * 180;

	var div = document.createElement("div");
	div.style.top = gameboardTopIndex + "px";
	div.style.left = gameboardLeftIndex + "px";
	div.className = "miniboard-highlight";
	document.getElementById("gameboard").appendChild(div);
}

function incrementAllTurn(){
	currentTurn = allTurns.length - 1;
	showCurrentTurn();
}

function decrementAllTurn(){
	currentTurn = 0;
	showCurrentTurn();
}

function incrementTurn(){
	if (currentTurn < (allTurns.length - 1)) {
		currentTurn++;
	}
	showCurrentTurn();
}

function decrementTurn(){
	if (currentTurn > 0){
		currentTurn--;
	}
	showCurrentTurn();
}

function showCurrentTurn() {
	updateGameBoardUI(allTurns[currentTurn].gameboardState, allTurns[currentTurn].gameboardsWon, allTurns[currentTurn].currentBoard);
}