var allowedCharacters = /^[a-zA-Z0-9]+$/; 

function Letter(l)
{
	this.l = l;
	this.visible = ( !allowedCharacters.test(this.l) );
}

/**
 * Returns the stored character if it is visible, or _ if not
 */
Letter.prototype.render = function() {
	return ( this.visible ) ? this.l : "_";
}

module.exports.Letter = Letter;
module.exports.allowedCharacters = allowedCharacters;