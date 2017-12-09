function myAI(gameboardState, gameboardsWon, currentBoard, myTeam){
	var turn = Turn(-1, -1);
	if (currentBoard == -1){
		var isValidMiniBoard = false;
		var miniBoard = -1;
		while (!isValidMiniBoard) {
			miniBoard = getRandomIndex();
			if(checkBoardWinner(gameboardState[miniBoard]) == 0){
				isValidMiniBoard = true;
			}
		}
		currentBoard = miniBoard;
	}
	turn.boardIndex = currentBoard;
	var  isValidSpot = false;
	var spotIndex = -1;
	while (!isValidSpot) {
		spotIndex = getRandomIndex();
		if (gameboardState[currentBoard][spotIndex] == 0) {
			isValidSpot = true;
		}
	}
	turn.spotIndex = spotIndex;
	return turn;
}

function Turn(boardIndex, spotIndex) {

	var obj = {
  		boardIndex: boardIndex,
  		spotIndex: spotIndex
	};

	return obj;
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

function getRandomIndex() {
	return Math.floor(Math.random() * 9);
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