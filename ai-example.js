function myAI(gameboardState, currentBoard, player){
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
