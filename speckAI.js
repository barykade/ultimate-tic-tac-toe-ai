function myAI(gameboard, currentBoard, player){
	console.log('Running SpeckBot');

	var corners = [0,2,6,8];
	var turn = createTurn(-1, -1);
	if (currentBoard == -1){
		console.log('free move');
		if (gameboard[4][4] == 0 && !checkForWinner(gameboard[4],1) && !checkForWinner(gameboard[4],2)) {
			turn.boardIndex = 4;
			turn.spotIndex = 4;
			return turn;
		}
		for (var i=0; i < gameboard.length; i++) {
			winningMove = findWinningMove(gameboard[i], player);	
			if (Number.isInteger(winningMove)) {
				turn.boardIndex = i;
				turn.spotIndex = winningMove;
				return turn;
			}
			/*opponent = player==1 ? 2 : 1;
			console.log(gameboard[i]);
			blockingMove = findWinningMove(gameboard[i], opponent);
			if (Number.isInteger(blockingMove)) {
				console.log('blocking move found! ' + blockingMove + ' board ' + i);
				turn.spotIndex = blockingMove;
				return turn;
			}*/
		}
		for (var i = 0; i < gameboard.length; i++){
			if(checkBoardWinner(gameboard[i]) == 0){
				turn.boardIndex = i;
				currentBoard = i;
				break;
			}
		}
		for (var i = 0; i < gameboard.length; i++){
			if(gameboard[currentBoard][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	} else {
		turn.boardIndex = currentBoard;
		winningMove = findWinningMove(gameboard[currentBoard], player);	
		if (Number.isInteger(winningMove)) {
			turn.spotIndex = winningMove;
			return turn;
		}
		opponent = player==1 ? 2 : 1;
		blockingMove = findWinningMove(gameboard[currentBoard], opponent);
		if (Number.isInteger(blockingMove)) {
			console.log('block!');
			turn.spotIndex = blockingMove;
			return turn;
		}
		console.log('no winning/blocking move found.');
		if (gameboard[currentBoard][4] == 0 && gameboard[4][4] == 0) {
			playCenter();
			return turn;
		}
		for (corner in corners) {
			if (gameboard[currentBoard][corner] == 0) {
				turn.spotIndex = corner;
				return turn;
			}
		}
		for (var i = 0; i < gameboard.length; i++){
			if(gameboard[currentBoard][i] == 0){
				turn.spotIndex = i;
				break;
			}
		}
	}

	function findWinningMove (board,player) {
		for (i=0;i<board.length;i++) {
			if (board[i] == 0) {
				testBoard = board.slice();
				testBoard[i] = player;
				if(checkForWinner(testBoard,player)) {
					console.log('winning move found!');
					return i;
				}
			}
		}
		return null;
	}

	function checkForWinner (boardState, player) {
		return boardState[0] == player && boardState[1] == player && boardState[2] == player ||
           boardState[3] == player && boardState[4] == player && boardState[5] == player ||
		   boardState[6] == player && boardState[7] == player && boardState[8] == player ||
           boardState[0] == player && boardState[3] == player && boardState[6] == player ||
		   boardState[1] == player && boardState[4] == player && boardState[7] == player ||
           boardState[2] == player && boardState[5] == player && boardState[8] == player ||
           boardState[0] == player && boardState[4] == player && boardState[8] == player ||
		   boardState[2] == player && boardState[4] == player && boardState[6] == player;
	}

	function playCenter() {
		turn.spotIndex = 4;
		console.log('played center');
	}

	return turn;
}
