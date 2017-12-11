function myAI(gameboardState, gameboardsWon, currentBoard, myTeam){
	return new Promise(async function(accept, reject) {
		var turn = createTurn(-1, -1);
		textboxDiv = document.createElement('div');
		textboxPrompt = document.createElement('p');
		textbox = document.createElement('input');
		textbox.type = "text";
		textboxDiv.appendChild(textboxPrompt);
		textboxDiv.appendChild(textbox);
		document.body.insertBefore(textboxDiv, document.body.childNodes[0]);
		textbox.focus();
		var miniBoard = currentBoard;
		if (currentBoard == -1) {
			textboxPrompt.innerHTML = "Which mini board would you like? (1-9)";
			var textEntered = false;
			while (!textEntered) {
				if (textbox.value !== "") {
					miniBoard = textbox.value - 1;
					textbox.value = "";
					textEntered = true;
				}
				await sleep(100);
			}
		}
		textboxPrompt.innerHTML = "Which slot would you like? (1-9)";
		var textEntered = false;
		var slotIndex = -1;
		while (!textEntered) {
			if (textbox.value !== "") {
				slotIndex = textbox.value - 1;
				textbox.value = "";
				textEntered = true;
			}
			await sleep(100)
		}
		turn = createTurn(miniBoard, slotIndex);
		document.body.removeChild(textboxDiv);
		accept(turn);
	}).then(function(result) {
		return result;
	})
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
