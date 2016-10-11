/*
	function removeSpaces(str)
	====================================
	It will return the string without spaces
	
	Inputs:
	-------
	str: String

	Output:
	-------
	str: String
*/
function removeSpaces(str) {
	return str.replace(/\s+/g,'');
}

var gameWord = require('./game.js');

var game = {
	charsGuessed: [],
	currentWord: "",
	opportunities: 15,
	allowedCharacters: /^[a-zA-Z0-9]+$/,//regex with the allowed characters
	selectedWord: gameWord.selectedWord,
	finished: false,
	initGame: function(){
		this.setInitialCurrentWord();
		play();
	},
	setInitialCurrentWord: function(){
		var txt = "";
		//This will replace all the allowed characters of the song name with an underscore ('_') 
		//in order to create a song name that can be guessed by the user
		this.selectedWord.split('').forEach(function(c) {
   			if( !game.allowedCharacters.test(c) )
	   			txt=txt+c;
   			else
   				txt=txt+"_";

		});
   		this.currentWord = txt;
	}
}

/* Setting initial parameters for a new game */
game.initGame();

console.log("=================================================");
console.log(game.currentWord);
console.log("charactersGuessed: [  ]");
console.log("guessesRemaining:" + game.opportunities);


function play()
{
	var inquirer = require('inquirer');
	console.log("=================================================");
	inquirer.prompt([
		{
			type: "input",
			message: "Guess a character",
			name: "character"
		}
	]).then(function (user) {
		//detect which key the user pressed
		var userKey = user.character;
		//if the user only press a letter or a number
		if( game.allowedCharacters.test(userKey) )
		{
			//if the user hadn't guessed the character before (it is not in array charsGuessed)
			if( game.charsGuessed.indexOf(userKey) < 0 )
			{
				//reset currentWord
				game.currentWord="";
				//if the user discovered a new character that is part of the selectedWord name
				if( game.selectedWord.toLowerCase().indexOf(userKey) > -1 )
				{
					for(var i = 0; i < game.selectedWord.length; i++)
					{
						if( userKey === game.selectedWord[i].toLowerCase() || !game.allowedCharacters.test(game.selectedWord[i])  || game.charsGuessed.indexOf(game.selectedWord[i].toLowerCase()) > -1 )
						{
							game.currentWord = game.currentWord + game.selectedWord[i];
						}
						else
						{
							game.currentWord = game.currentWord + "_";
						}

					}
					
					console.log('Correct character!');
				}
				//otherwise wrong character
				else
				{
					for( var i = 0; i < game.selectedWord.length; i++ )
					{
						//if is not a number or letter
						//or character had already been guessed and it is part of the selected song name  
						if( !game.allowedCharacters.test(game.selectedWord[i]) || (game.charsGuessed.indexOf(game.selectedWord[i].toLowerCase()) > -1) )
						{
							game.currentWord = game.currentWord + game.selectedWord[i];
						}
						else
						{
							game.currentWord = game.currentWord + "_";
						}
					}
					//decrease oportunities
					game.opportunities = game.opportunities - 1;
					console.log('Wrong character');
					//if you dont have more opportunities
					if( game.opportunities <= 0 )
					{
						//show message
						console.log("You Lost!");
						//finish game
						game.finished = true;
					}
				}
				//add the new character to the array of characters already guessed
				game.charsGuessed.push(userKey);
				//if you finally guessed the complete song name
				if( removeSpaces(game.currentWord.toLowerCase()) === removeSpaces(game.selectedWord.toLowerCase()) )
				{
					console.log("Congratulations, you win!");
					game.finished = true;
				}
			}

			console.log("currentWord: " + game.currentWord);
			console.log("charactersGuessed: ["+game.charsGuessed.toString()+"]");
			console.log("guessesRemaining:" + game.opportunities);
		}
		else
		{
			console.log("Character not allowed.");
		}
		//If the user has more opportunities
		if(!game.finished)
			//continue playing and call to inquirer again
			play();
	});
}