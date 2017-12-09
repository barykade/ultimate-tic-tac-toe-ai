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

//		return value: Turn(boardIndex, spotIndex)
//			boardIndex is the miniboard you want to play in (must == currentBoard if currentBoard != -1)
//				miniboard must be in an unfinished board
//			spotIndex is the position in the miniboard you want to play in
//				spot must be equal to 0 in the gameboardState

function myAI(gameboardState, gameboardsWon, currentBoardIndex, player){
	if (currentBoardIndex == -1){
		return playAnyBoard(gameboardState, gameboardsWon, player);
	}else{
		return playBoard(currentBoardIndex, gameboardState, gameboardsWon, player);
	}
}

function playAnyBoard(gameboardState, gameboardsWon, player){

	var vm = [];
	var wm = [];
	var wmtfcb = [];
	var mtfcb = [];

	for(var i = 0; i < gameboardsWon.length; i++){
		if(gameboardsWon[i] == 0){
			var validMoves = findAllValidMovesOnMiniboard(gameboardState[i], player);
			var winningMoves = findWinningMovesOnMiniboard(validMoves, gameboardState[i], player);
			var winnningMovesThatForceCertainBoard = findMovesThatForceCertainBoard(winningMoves, gameboardsWon, player);
			var movesThatForceCertainBoard = findMovesThatForceCertainBoard(validMoves, gameboardsWon, player);

			if (winnningMovesThatForceCertainBoard.length > 0){
				wmtfcb.push(Turn(i, winnningMovesThatForceCertainBoard[0]));
			}else if (winningMoves.length > 0){
				wm.push(Turn(i, winningMoves[0]));
			}else if (movesThatForceCertainBoard.length > 0){
				mtfcb.push(Turn(i, movesThatForceCertainBoard[0]));
			}else{
				vm.push(Turn(i, validMoves[0]));
			}
		}
	}

	if(wmtfcb.length > 0){
		return wmtfcb[0];
	}else if (wm.length > 0){
		return wm[0];
	}else if (mtfcb.length > 0){
		return mtfcb[0];
	}else{
		return vm[0];
	}
}

function playBoard(boardIndex, gameboardState, gameboardsWon, player){
	var validMoves = findAllValidMovesOnMiniboard(gameboardState[boardIndex], player);
	var winningMoves = findWinningMovesOnMiniboard(validMoves, gameboardState[boardIndex], player);
	var winnningMovesThatForceCertainBoard = findMovesThatForceCertainBoard(winningMoves, gameboardsWon, player);
	var movesThatForceCertainBoard = findMovesThatForceCertainBoard(validMoves, gameboardsWon, player);

	if (winnningMovesThatForceCertainBoard.length > 0){
		return Turn(boardIndex, winnningMovesThatForceCertainBoard[0]);
	}else if (winningMoves.length > 0){
		return Turn(boardIndex, winningMoves[0]);
	}else if (movesThatForceCertainBoard.length > 0){
		return Turn(boardIndex, movesThatForceCertainBoard[0]);
	}else{
		return Turn(boardIndex, validMoves[0]);
	}
}

function findAllValidMovesOnMiniboard (board, player) {
	var returnValue = [];
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 0) {
			returnValue.push(i);
		}
	}
	return returnValue;
}

function findWinningMovesOnMiniboard (validMoves, board, player) {
	var returnValue = [];
	for (var i = 0; i < validMoves.length; i++) {
		var testBoard = board.slice();
		testBoard[validMoves[i]] = player;
		if(checkBoardWinner(testBoard) == player) {
			returnValue.push(validMoves[i]);
		}
	}
	return returnValue;
}

function findMovesThatForceCertainBoard(validMoves, gameboardsWon, player) {
	var returnValue = [];
	for (var i = 0; i < validMoves.length; i++) {
		if(gameboardsWon[validMoves[i]] == 0){
			returnValue.push(validMoves[i]);
		}
	}
	return returnValue;
}

//function Turn(boardIndex, spotIndex);
//		creates and returns an object with boardIndex and spotIndex

//function GameSnapshot(gameboardState, gameboardsWon, currentBoard);
//		creates and returns an object with gameboardState, gameboardsWon, and currentBoard

//var allTurns;
//		array of all GameSnapshots for the history of the game

//function turnValid(playerTurn, gameboardState, currentBoard, gameboardsWon);
//		returns true if playerTurn is a valid turn for the current gameboardState, currentBoard, and gameboardsWon

//function checkBoardWinner(boardState);
//		evaluates boardState and if it is a won board
//		returns -1 if cat's game, 0 if not finished, 1 if X won it, 2 if O won it