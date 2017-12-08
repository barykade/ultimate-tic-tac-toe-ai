var UltimateTicTacToe = new function() {
	this.state = [new Board(),0,0,
	       	      0,0,0,
		      0,0,0];

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

	this.move = function (turn,move) {
		this.state[move] = turn;
	};

	this.checkForWin = function (turn) {
		return (this.state[0] == turn && this.state[1] == turn && this.state[2] == turn) ||
                       (this.state[3] == turn && this.state[4] == turn && this.state[5] == turn) ||
		       (this.state[6] == turn && this.state[7] == turn && this.state[8] == turn) ||
                       (this.state[0] == turn && this.state[3] == turn && this.state[6] == turn) ||
		       (this.state[1] == turn && this.state[4] == turn && this.state[7] == turn) ||
                       (this.state[2] == turn && this.state[6] == turn && this.state[8] == turn) ||
                       (this.state[0] == turn && this.state[5] == turn && this.state[8] == turn) ||
		       (this.state[2] == turn && this.state[5] == turn && this.state[6] == turn)
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
