const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector('.letters');
document.getElementById("start").play();

lettersArray.forEach(letter => {
    let span = document.createElement('span');
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allKeys = Object.keys(words);
let randomProbNumber = Math.floor(Math.random() * allKeys.length);
let randomProbName = allKeys[randomProbNumber];
let randomProbValues = words[randomProbName];

let randomProbValuesNumber = Math.floor(Math.random() * randomProbValues.length);
let randomProbValueName = randomProbValues[randomProbValuesNumber];

document.querySelector('.game-info .category span').innerHTML = randomProbName;

let lettersGuessContainer = document.querySelector('.letters-guess');
let lettersAndSpace = Array.from(randomProbValueName);

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement('span');
    if (letter === ' ') {
        emptySpan.className = '.with-space';
    }
    lettersGuessContainer.appendChild(emptySpan);
});

let guessSpan = document.querySelectorAll('.letters-guess span');
let theDraw = document.querySelector('.hangman-draw');
let wrongAttempts = 0;
let successAtempts = 0;

document.addEventListener('click', (e) => {
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked');
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomProbValueName.toLowerCase());

        theChosenWord.forEach((wordLetter, indexWord) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpan.forEach((span, spanIndex) => {
                    if (indexWord == spanIndex) {
                        successAtempts++;

                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById('fail').play();
            if (wrongAttempts === 8) {
                lettersContainer.classList.add('finished');
                swal("Game Over!", `The Word Is ${randomProbValueName}`, "error");
            }
        } else {
            document.getElementById('success').play();
            if (successAtempts == guessSpan.length) {
                swal("Good job!", "You are win!", "success");
            }
        }
    }
});