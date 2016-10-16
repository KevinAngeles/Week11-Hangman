var letter = require('./letter.js');
var Letter = letter.Letter;
var allowedCharacters = letter.allowedCharacters;
function Word(w)
{
	this.selectedWord = w;
	this.lettersArr = this.selectedWord.split("").map( l => new Letter(l) );
}

/**
 * Return the current word with only the guessed letters visible
 */
Word.prototype.render = function()
{
	return this.lettersArr.map( l => l.render() ).join("");
}

/**
 * Return true or false depending on if the character was allowed or not
 */
Word.prototype.isAllowed = function(c)
{
	return allowedCharacters.test(c)
}

/**
 * Modifies any correctly guessed letter to set visible to true
 * then it will return true or false depending on if a correct letter was guessed
 */
Word.prototype.guess = function(guess)
{
	var isCorrect = false;
	this.lettersArr = this.lettersArr.map(l => {
		var match = (guess.toLowerCase() === l.l.toLowerCase());
		if( (!isCorrect) && match)
		{
			isCorrect = true;
		}
		l.visible = l.visible || match;
		return l;
	});
	return isCorrect;
}

/**
 * Return true or false depending on if the word has been completely guessed
 */
Word.prototype.complete = function()
{
	return this.render() === this.selectedWord;
}

module.exports = Word;