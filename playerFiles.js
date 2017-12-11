var playerOneImport;
var playerTwoImport;
var playerOneAI;
var playerTwoAI;

(function() {

	playerOneImport = function(files) {
		handlePlayerImport(files, "playerOneAI");
	}

	playerTwoImport = function(files) {
		handlePlayerImport(files, "playerTwoAI");
	}

	function handlePlayerImport(files, functionName) {
		var file = files[0];

		var reader = new FileReader();

		reader.onload = function(e) {
		  	code = reader.result;

		  	code = createUserProgram(code, functionName);
		  	var script = document.createElement('script'); 
			try {
			  script.appendChild(document.createTextNode(code));
			  document.body.appendChild(script);
			} catch (e) {
			  script.text = code;
			  document.body.appendChild(script);
			}
		}

		reader.readAsText(file, "UTF-8");

	}

	function createUserProgram(code, func) {
		return "(function() {" + code + "\n 	" + func + " = myAI;  })()"
	}

})()