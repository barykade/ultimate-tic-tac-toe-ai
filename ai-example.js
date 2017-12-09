//myAI: gameboardState = [[0, 0, 0, 0, 0, 0, 0, 0, 0],   	board indexes: 	0|1|2
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],		   		       -------
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],						3|4|5
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],         		       -------
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],						6|7|8
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],   	0 = empty
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0],   	1 = X
//						  [0, 0, 0, 0, 0, 0, 0, 0, 0]]   	2 = O
//
//		gameboardsWon = [0, 0, 0, 0, 0, 0, 0, 0, 0]
//						which miniboards have been won by a player
//						-1 = cat's game, 0 = not finished, 1 =X, 2 = O
//
//      currentBoardIndex = boardIndex where player must play
//	 				   		-1 means you can play in any unfinished board
//
//      player = which player index you are.  1 = X, 2 = O

//		return value: createTurn(boardIndex, spotIndex)
//			boardIndex is the miniboard you want to play in (must == currentBoard if currentBoard != -1)
//				miniboard must be in an unfinished board
//			spotIndex is the position in the miniboard you want to play in
//				spot must be equal to 0 in the gameboardState

function myAI(gameboardState, gameboardsWon, currentBoardIndex, player){
	var turn = createTurn(-1, -1);
	if (currentBoardIndex == -1){
		for (var i = 0; i < gameboardState.length; i++){
			if(gameboardsWon[i] == 0){
				turn.boardIndex = i;
				currentBoardIndex = i;
				break;
			}
		}
		for (var i = 0; i < gameboardState.length; i++){
			if(gameboardState[currentBoardIndex][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	}else{
		turn.boardIndex = currentBoardIndex;
		for (var i = 0; i < gameboardState.length; i++){
			if(gameboardState[currentBoardIndex][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	}
	
	return turn;
}

//function createTurn(boardIndex, spotIndex);
//		creates and returns an object with boardIndex and spotIndex

//function createGameSnapshot(gameboardState, gameboardsWon, currentBoard);
//		creates and returns an object with gameboardState, gameboardsWon, and currentBoard

//function turnValid(playerTurn, gameboardState, currentBoard, gameboardsWon);
//		returns true if playerTurn is a valid turn for the current gameboardState, currentBoard, and gameboardsWon

//function checkBoardWinner(boardState);
//		evaluates boardState and if it is a won board
//		returns -1 if cat's game, 0 if not finished, 1 if X won it, 2 if O won it