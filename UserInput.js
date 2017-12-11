var textbox;
var textBoxReady = false;

function myAI(gameboardState, gameboardsWon, currentBoard, myTeam){
	return new Promise(async function(accept, reject) {
		var turn = createTurn(-1, -1);
		var textboxDiv = document.createElement('div');
		var textboxPrompt = document.createElement('p');
		textbox = document.createElement('input');
		textbox.type = "text";
		textboxDiv.appendChild(textboxPrompt);
		textboxDiv.appendChild(textbox);
		document.body.insertBefore(textboxDiv, document.body.childNodes[0]);
		textbox.focus();
		var miniBoard = currentBoard;
		textbox.addEventListener("keydown", function (event) {
				if(event.key === 'Enter') {
				    textBoxReady = true;
				}
			});
		if (currentBoard == -1) {
			textboxPrompt.innerHTML = "Which mini board would you like? (1-9)";
			miniBoard = await getUserInput();
		}
		textboxPrompt.innerHTML = "Which slot would you like? (1-9)";
		var slotIndex = await getUserInput();
		turn = createTurn(miniBoard, slotIndex);
		document.body.removeChild(textboxDiv);
		accept(turn);
	}).then(function(result) {
		return result;
	})
}

async function getUserInput() {
	var result;
	while (textBoxReady == false) {
		await sleep(100);
		if (textBoxReady !== false) {
			result = textbox.value - 1;
		}
	}
	textBoxReady = false;
	textbox.value = "";
	return result;
}

function createTurn(boardIndex, spotIndex) {

	var obj = {
  		boardIndex: boardIndex,
  		spotIndex: spotIndex
	};

	return obj;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
