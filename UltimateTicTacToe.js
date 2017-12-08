var Game = new function() {
	this.turn = 1;

	this.mainBoard = UltimateTicTacToe();
	while() {
		turn = playerOneAI();
		this.mainBoard.state[turn.boardIndex].move(1,turn.spotIndex);			
	 	if (this.mainBoard.state[turn.boardIndex].checkForWin(1)) {
			this.mainBoard.endGame();	
		}	
		turn = playerTwoAI();
		this.mainBoard.state[turn.boardIndex].move(2,turn.spotIndex);			
		if (this.mainBoard.state[turn.boardIndex].checkForWin(2)) {
			this.mainBoard.endGame();	
		}		
	}
	
}

var UltimateTicTacToe = new function() {
	this.state = [new Board(),new Board(),new Board(),
	       	      new Board(),new Board(),new Board(),
		      new Board(),new Board(),new Board()];

	this.endGame = function () {
		console.log('winner');
	}

}

function Board() {
	this.state = [0,0,0,
		      0,0,0,
		      0,0,0];

	this.reset = function () {
		this.state = [0,0,0,
		              0,0,0,
		              0,0,0];
	};

	this.move = function (turn,index) {
		this.state[index] = turn;
	};

	this.checkForWin (turn) {
		checkForWin(turn,this.state);
	};	

	this.checkForDraw = function () {
		if (this.checkForWin(1) || this.checkForWin(2)) { 
			return false
                }
		for(i=0; i< this.state.length; i++) {
			if (this.state[i] == 0) {
		 		return false;
			}
                }
		return true;
	};
}

checkForWin = function(turn,state) {
	return (this.state[0] == turn && this.state[1] == turn && this.state[2] == turn) ||
               (this.state[3] == turn && this.state[4] == turn && this.state[5] == turn) ||
               (this.state[6] == turn && this.state[7] == turn && this.state[8] == turn) ||
               (this.state[0] == turn && this.state[3] == turn && this.state[6] == turn) ||
	       (this.state[1] == turn && this.state[4] == turn && this.state[7] == turn) ||
               (this.state[2] == turn && this.state[6] == turn && this.state[8] == turn) ||
               (this.state[0] == turn && this.state[5] == turn && this.state[8] == turn) ||
	       (this.state[2] == turn && this.state[5] == turn && this.state[6] == turn)

}
