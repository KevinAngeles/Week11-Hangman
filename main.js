var Word = require('./word.js');
var gameWord = require('./game.js');
var inquirer = require('inquirer');

var w = new Word(gameWord.selectedWord);
var gameFinished = false;
var opportunities = 15;
console.log("=================================================");

console.log(w.render());
play();

function play()
{
	inquirer.prompt([
		{
			type: "input",
			message: "Guess a character",
			name: "character"
		}
	]).then(function (user) {
		//detect which key the user pressed
		var userKey = user.character;
		if(w.isAllowed(userKey))
		{
			if(!w.guess(userKey))
			{
				opportunities = opportunities-1;
				console.log("Wrong guess!");
			}
			console.log(w.render());
			console.log("=================================================");
			if(opportunities <= 0)
			{
				gameFinished = true;
				console.log("You Lost");
				console.log("The word was: "+w.selectedWord)
				console.log("=================================================");
			}
			else if(w.complete())
			{
				gameFinished = true;
				console.log("Congratulations, You Won");
				console.log("=================================================");
			}
			//If the user has more opportunities
			if(!gameFinished)
				//continue playing and call to inquirer again
				play();
		}
		else
		{
			console.log("Character Not Allowed");
			console.log("=================================================");
			play();
		}
	});
}