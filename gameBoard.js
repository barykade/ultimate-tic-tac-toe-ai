
var gameboardState = [
				[[1], [0], [0], [0], [0], [0], [0], [0], [0]],
				[[0], [2], [0], [0], [0], [0], [1], [0], [0]],
				[[0], [0], [1], [0], [0], [0], [2], [0], [0]],
				[[0], [0], [0], [0], [0], [0], [0], [0], [0]],
				[[0], [0], [0], [0], [2], [0], [0], [0], [0]],
				[[0], [0], [0], [0], [0], [0], [0], [0], [0]],
				[[0], [0], [0], [0], [0], [0], [1], [0], [0]],
				[[0], [0], [0], [0], [0], [0], [0], [2], [0]],
				[[0], [0], [0], [0], [0], [0], [0], [0], [0]]
				]

function updateGameBoardUI(){
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
	return gameboardTopIndex * 210 + spotTopIndex * 70;
}

function getLeftFor(gameboardIndex, spotIndex) {
	var gameboardTopIndex = gameboardIndex % 3;
	var spotTopIndex = spotIndex % 3;
	return gameboardTopIndex * 210 + spotTopIndex * 70;
}