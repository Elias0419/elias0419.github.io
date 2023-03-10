window.addEventListener('load', function() {
    fetch('https://elias0419.github.io/html/words.txt')
    .then(response => response.text())
    .then(wordsText => {
        // Split the text into an array of words
        var words = wordsText.split('\n');
        // Choose a random word
        var word = words[Math.floor(Math.random() * words.length)].trim();
        // Call the main function with the word
        main(word);
    });
});

function main(word) {
    // Create the word display element
    var wordDisplay = document.createElement("div");
    wordDisplay.id = "word";
    wordDisplay.style.fontSize = "36px";
    wordDisplay.style.marginBottom = "20px";
    wordDisplay.innerHTML = "Play Hangman!";
    document.body.appendChild(wordDisplay);
    
    // Create the guesses display element with placeholder text
    var guessesDisplay = document.createElement("div");
    guessesDisplay.id = "guesses";
    guessesDisplay.style.fontSize = "24px";
    guessesDisplay.style.marginBottom = "20px";
    guessesDisplay.innerHTML = "Guess a letter to begin";
    document.body.appendChild(guessesDisplay);
    
    // Create the letter button container element
    var buttonContainer = document.createElement("div");
    buttonContainer.id = "buttons";
    document.body.appendChild(buttonContainer);
    
    var resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.style.fontSize = "16px";
    resetButton.style.padding = "10px";
    resetButton.style.margin = "5px";
    resetButton.addEventListener("click", function() {
        resetGame();
    });
    buttonContainer.appendChild(resetButton);
    
    
    for (var i = 0; i < 26; i++) {
        var letter = String.fromCharCode(97 + i);
        var button = document.createElement("button");
        button.id = letter;
        button.innerHTML = letter;
        button.style.fontSize = "16px";
        button.style.padding = "10px";
        button.style.margin = "5px";
        button.addEventListener("click", function() {
            handleButtonClick(this.innerHTML);
        });
        buttonContainer.appendChild(button);
        
    }
    
    // Define the CSS styles
    var cssStyles = `
    h1 {
        text-align: center;
    }
    
    #word {
    font-size: 36px;
    margin-bottom: 20px;
    }
    
    #guesses {
    font-size: 24px;
    margin-bottom: 20px;
    }
    
    #buttons button {
    font-size: 16px;
    padding: 10px;
    margin: 5px;
    }
    `;
    
    // Create a style element and inject the CSS styles
    var style = document.createElement("style");
    style.innerHTML = cssStyles;
    document.head.appendChild(style);
    
    var guessedLetters = [];
    var incorrectGuesses = 0;
    // Update the word display
    function updateWordDisplay() {
        var displayWord = "";
        for (var i = 0; i < word.length; i++) {
            if (guessedLetters.includes(word[i])) {
                displayWord += word[i];
            } else {
                displayWord += "_ ";
            }
        }
        wordDisplay.innerHTML = displayWord;
    }
    
    
    // Update the guesses display
    function updateGuessesDisplay() {
        guessesDisplay.innerHTML = "Guesses: " + incorrectGuesses;
    }
    
    // Check if the player has won
    function checkForWin() {
        for (var i = 0; i < word.length; i++) {
            if (!guessedLetters.includes(word[i])) {
                return false;
            }
        }
        return true;
    }
    
    // Check if the player has lost
    function checkForLoss() {
        return incorrectGuesses >= 6;
    }
    
    function resetGame() {
        fetch('https://elias0419.github.io/html/words.txt')
        .then(response => response.text())
        .then(wordsText => {
            // Split the text into an array of words
            var words = wordsText.split('\n');
            // Choose a new random word from the array
            word = words[Math.floor(Math.random() * words.length)].trim();
        })
        guessedLetters = [];
        incorrectGuesses = 0;
        updateWordDisplay();
        updateGuessesDisplay();
        wordDisplay.innerHTML="Play Hangman! (again)"
        guessesDisplay.innerHTML ="<br>"
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style.backgroundColor = "";
        }}
        
        // Handle a letter button click
        function handleButtonClick(letter) {
            var button = document.getElementById(letter);
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                if (!word.includes(letter)) {
                    incorrectGuesses++;
                }
                updateWordDisplay();
                updateGuessesDisplay();
                if (checkForWin()) {
                    alert("Congratulations, you guessed the word " + word + "!");
                } else if (checkForLoss()) {
                    alert("Sorry, you ran out of guesses. The word was " + word + ".");
                }
            }button.disabled = true;
            button.style.backgroundColor = "#dddddd";
        }
}
