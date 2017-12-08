function UltimateTicTacToe() {

}

function Board() {
	this.state = [[0][0][0]
	       	      [0][0][0]
		      [0][0][0]];

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
}
