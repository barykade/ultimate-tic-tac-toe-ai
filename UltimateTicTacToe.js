function UltimateTicTacToe() {
	this.state = [[new Board()][0][0]
	       	      [0][0][0]
		      [0][0][0]];

}

function Board() {
	this.state = [0,0,0,
		      0,0,0,
		      0,0,0];

	this.reset() {
		this.state = [0,0,0,
		              0,0,0,
		              0,0,0];

	}

	this.move(turn,move) {
		this.state[move] = turn;
	}

	this.checkForWin(turn) {
		return this.state[0] == turn && this.state[1] == turn && this.state[2] == turn ||
                       this.state[3] == turn && this.state[4] == turn && this.state[5] == turn ||
		       this.state[6] == turn && this.state[7] == turn && this.state[8] == turn ||
                       this.state[0] == turn && this.state[3] == turn && this.state[6] == turn ||
		       this.state[1] == turn && this.state[4] == turn && this.state[7] == turn ||
                       this.state[2] == turn && this.state[6] == turn && this.state[8] == turn ||
                       this.state[0] == turn && this.state[5] == turn && this.state[8] == turn ||
		       this.state[2] == turn && this.state[5] == turn && this.state[6] == turn ||
	}	

	this.checkForDraw() {
		if (this.checkForWin(1) || this.checkForWin(2)) { 
			return false
                }
		for(i=0; i< this.state.length; i++) {
			if (this.state[i] == 0) {
		 		return false;
			}
                }
		return true;
	}
}

console.log(UltimateTicTacToe().state[0].state[0]);
