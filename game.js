var words = ["Mighty Long Fall","Bring me to Life","Low","Talk Dirty"];
//This will get a random song from the array of songs and set it to selectedWord
exports.selectedWord = words[Math.floor(Math.random()*words.length)];