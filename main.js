function generateNum() {
    let newRandomNum = Math.ceil(Math.random() * 100);
    return newRandomNum;
}
  
function updateGuesses(num) {
    const userGuess = num;
    const guessHistory = document.getElementsByClassName("guess");
    
    guessHistory[currentGuessCount].innerHTML = num;
    ++currentGuessCount;
    
    if (currentGuessCount === 5) {
      submitButton.disabled = true;
      resetButton.innerHTML = "Play Again";
    }
}
  
function validateGuess(val) {
    const validationTooltip = document.getElementById("guess-validation-tooltip");
    
    validationTooltip.innerHTML = "";
    
    if (val === "") {
      validationTooltip.innerHTML = "Try guessing a number between 1-100.";
    } else if (parseInt(val) > 100) {
      validationTooltip.innerHTML = "Your guessed a number greater than 100, please guess a number between 1-100.";
    } else if (parseInt(val) < 1) {
        validationTooltip.innerHTML = "Your guessed a number less than 1, please guess a number between 1-100.";
    } 

    return;
}
  
function compareGuess(num, correctNum) {
    const userGuess = num;
    const guessResult = document.getElementById("guess-result");
    const higherLowerHint = document.getElementById("higher-or-lower");
    
    let tempCheck = "";
    let higherOrLower = "";
    
    if (correctNum === userGuess) {
      tempCheck = "You guessed correctly! The secret number was " + userGuess;
    } else if (Math.abs(correctNum - userGuess) > 50 && currentGuessCount < 5) {
      tempCheck = "You're ice cold!";
    } else if (Math.abs(correctNum - userGuess) > 20 && currentGuessCount < 5) {
      tempCheck = "You're getting warm!";
    } else if (Math.abs(correctNum - userGuess) > 10 && currentGuessCount < 5) {
      tempCheck = "You're getting hotter!";
    } else if (currentGuessCount < 5) {
      tempCheck = "You're on fire!!";
    } else {
      tempCheck = "Too bad! You were so close."
    }
    
    if (correctNum === userGuess) {
      higherOrLower = "Well done! Want to play again?";
    } else if (correctNum > userGuess && currentGuessCount < 5) {
      higherOrLower = "Guess higher!"
    } else if (currentGuessCount < 5) {
      higherOrLower = "Guess lower!"
    } else {
      higherOrLower = "Try again?"
    }
    
    if (correctNum === userGuess) {
      submitButton.disabled = true;
      resetButton.innerHTML = "Play Again";
    }
      
    guessResult.innerHTML = tempCheck;
    higherLowerHint.innerHTML = higherOrLower;
}
  
function submitGuess() {
    const userInput = document.getElementById("user-guess").value;
    const currentGuess = parseInt(document.getElementById("user-guess").value);
    
    validateGuess(userInput);
    
    if (userInput !== "" && currentGuess < 101 && currentGuess > 0) {
      updateGuesses(currentGuess);
      compareGuess(currentGuess, winningNum);
    }

    document.getElementById("user-guess").value = "";    
  
}
  
function resetGame() {
    const guessResult = document.getElementById("guess-result");
    const higherLowerHint = document.getElementById("higher-or-lower");
    const guessHistory = Array.prototype.slice.call(document.getElementsByClassName("guess"));
    const validationTooltip = document.getElementById("guess-validation-tooltip");
    const hintText = document.getElementById("hint-text");
    
    winningNum = generateNum();
    
    guessResult.innerHTML = "I'm thinking of a number between 1-100";
    higherLowerHint.innerHTML = "Can you guess what it is?";
    validationTooltip.innerHTML = "";
    hintText.innerHTML = "";
    document.getElementById("user-guess").value = "";
    currentGuessCount = 0;
    submitButton.disabled = false;
    resetButton.innerHTML = "Reset Game";
    hintButton.innerHTML = "Show Hint";
    
    for (let i = 0; i < 5; ++i) {
      let currentGuess = guessHistory[i];
      currentGuess.innerHTML = "○";
    }
}
  
function generateHint() {
    const winNum = winningNum;
    const hintText = document.getElementById("hint-text");
    let hintEvenOrOdd = "";
    let hintFives = "";
    let hint = "";
  
    if (winNum % 2 === 0) {
      hintEvenOrOdd = "even";
    } else {
      hintEvenOrOdd = "odd";
    }
    
    if (winNum % 5 === 0) {
      hintFives = "is";
    } else {
      hintFives = "isn't";
    }
    
    hint = `The secret number is ${hintEvenOrOdd} and ${hintFives} divisible by 5.`;
    
    if (hintShowing === false) {
      hintText.innerHTML = hint;
      hintButton.innerHTML = "Hide Hint";
      hintShowing = true;
    } else if (hintShowing === true) {
      hintText.innerHTML = "";
      hintButton.innerHTML = "Show Hint";
      hintShowing = false;
    }
    
}
  
let currentGuessCount = 0;
let winningNum = generateNum();
let hintShowing = false;
  
const resetButton = document.getElementById("reset-game");
const submitButton = document.getElementById("submit-guess");
const hintButton = document.getElementById("get-hint");

submitButton.addEventListener("click", submitGuess);
resetButton.addEventListener("click", resetGame);
hintButton.addEventListener("click", generateHint);
  
  