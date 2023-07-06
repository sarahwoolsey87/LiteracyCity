// Slangman Game

// Array of phrases to guess
const phrases = [
  "Jealousy is the green-eyed monster",
  "The world is my oyster",
  "Wild-goose chase",
  "Melted into thin air",
  "All that glitters isn't gold"
];

// Array of picture clues linked to phrases
const pictureClues = [
  "https://leadlifewell.com/wp-content/uploads/2019/02/green-eyed-monster.png",
  "https://th.bing.com/th/id/R.9d234d66d35abdfd2c1a33c4b9e7f30a?rik=QId9DKeX7uQVHA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f9%2f9a%2fPearl_oyster.jpg&ehk=XAV4l7hDGi81GS49rplGet578hcw0mQcj65mkm22LMo%3d&risl=&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.YFbFkMD06ukWIUNj9z_5YQHaE7?pid=ImgDet&rs=1",
  "https://i.ytimg.com/vi/-FtCr_jwKxo/maxresdefault.jpg",
  "https://th.bing.com/th/id/OIP.9Tu2UJ8Cf-2I_UoIcMySAwHaFj?pid=ImgDet&rs=1"
];

// Array of hangman images
const hangmanImages = [
  "images/images/hangman1.png",
  "images/images/hangman2.png",
  "images/images/hangman3.png",
  "images/images/hangman4.png",
  "images/images/hangman5.png",
  "images/images/hangman6.png",
  "images/images/hangman7.png"
];

// Variables to hold the randomly selected phrase, picture clue, and hangman image index
let randomPhrase = "";
let pictureClue = "";
let hangmanIndex = 0;

// Array to store guessed letters
const guessedLetters = [];

// Variable to track the number of attempts
let attempts = 6;

// Function to select a random phrase and corresponding picture clue
function selectRandomPhrase() {
  // Generate a random index within the range of phrases array length
  const randomIndex = Math.floor(Math.random() * phrases.length);
  
  // Assign the random phrase and picture clue to the variables
  randomPhrase = phrases[randomIndex];
  pictureClue = pictureClues[randomIndex];
}

// Function to check if the guessed letter is correct or incorrect
function checkLetter(letter) {
  // Convert the random phrase to lowercase and split it into an array of letters
  const phraseLetters = randomPhrase.toLowerCase().split("");

  // Check if the input is a single letter
  if (!letter || letter.length !== 1 || !isLetter(letter)) {
    console.log("Please enter a single letter.");
    return;
  }

  // Check if the guessed letter is present in the phrase
  if (phraseLetters.includes(letter)) {
    console.log("Correct guess!");
    guessedLetters.push(letter);
  } else {
    console.log("Incorrect guess!");
    attempts--;
    hangmanIndex++;
    displayHangmanImage();
  }
}

// Function to check if a string is a letter
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

// Function to display the masked phrase with guessed letters filled in
function displayPhrase() {
  let maskedPhrase = "";

  for (const letter of randomPhrase) {
    if (guessedLetters.includes(letter.toLowerCase())) {
      maskedPhrase += letter;
    } else if (letter === " ") {
      maskedPhrase += " ";
    } else {
      maskedPhrase += "_";
    }
  }

  return maskedPhrase;
}

// Function to display the picture clue
function displayPictureClue() {
  const pictureElement = document.getElementById("picture-clue");
  pictureElement.src = pictureClue;
}

// Function to display the number of attempts remaining
function displayAttempts() {
  const attemptsElement = document.getElementById("attempts");
  attemptsElement.textContent = `Attempts remaining: ${attempts}`;
}

// Function to display the hangman image
function displayHangmanImage() {
  const hangmanImage = document.getElementById("hangman-figure");
  hangmanImage.src = hangmanImages[hangmanIndex];
}

// Function to check the game status and handle win/loss scenarios
function checkGameStatus() {
  const maskedPhrase = displayPhrase();
  const maskedPhraseElement = document.getElementById("masked-phrase");
  maskedPhraseElement.textContent = maskedPhrase;

  if (attempts === 0) {
    console.log("You lost! The phrase was: " + randomPhrase);
    const messageElement = document.getElementById("message");
    messageElement.textContent = "You lose - you butchered the bard!";
    const maskedPhraseElement = document.getElementById("masked-phrase");
    maskedPhraseElement.textContent = randomPhrase;
    disableGame();
  } else if (!maskedPhrase.includes("_")) {
    console.log("Congratulations! You won!");
    disableGame();
  } else {
    console.log("Attempts remaining: " + attempts);
  }
}

// Function to disable the game input after win/loss
function disableGame() {
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-button");
  guessInput.disabled = true;
  guessButton.disabled = true;
}

// Function to handle the play again button click
function playAgain() {
  const playAgainButton = document.getElementById("play-again-button");
  playAgainButton.addEventListener("click", () => {
    resetGame();
    playGame();
  });
}

// Function to reset the game state
function resetGame() {
  randomPhrase = "";
  pictureClue = "";
  hangmanIndex = 0;
  guessedLetters.length = 0;
  attempts = 6;
  const hangmanImage = document.getElementById("hangman-figure");
  hangmanImage.src = hangmanImages[0];
  const maskedPhraseElement = document.getElementById("masked-phrase");
  maskedPhraseElement.textContent = "";
  const guessInput = document.getElementById("guess-input");
  guessInput.value = "";
  guessInput.disabled = false;
  const guessButton = document.getElementById("guess-button");
  guessButton.disabled = false;
  const messageElement = document.getElementById("message");
  messageElement.textContent = "";
  displayPictureClue();
  displayAttempts();
}

// Function to start the game
function playGame() {
  selectRandomPhrase();
  displayPictureClue();
  displayAttempts();
  displayHangmanImage();
  playAgain();

  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-button");

  guessButton.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    checkLetter(guess);
    console.log(displayPhrase());
    displayAttempts();
    checkGameStatus();
  });

  // Additional functionality to handle Enter key press
  guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const guess = guessInput.value.toLowerCase();
      guessInput.value = "";
      checkLetter(guess);
      console.log(displayPhrase());
      displayAttempts();
      checkGameStatus();
    }
  });
}

// Start the game
playGame();
