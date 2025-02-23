let targetNumber;
let attempts;
let gameOver;
let highScore = localStorage.getItem("highScore") || "-";

// Initialize the game
function newGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;

  // Reset UI
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("highScore").textContent = highScore;
  document.getElementById("message").textContent = "Start guessing!";
  document.getElementById("guessList").innerHTML = "";
  document.getElementById("guess").value = "";
  document.getElementById("guess").focus();
}

// Check the player's guess
function checkGuess() {
  if (gameOver) {
    return;
  }

  const guessInput = document.getElementById("guess");
  const guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100");
    guessInput.value = "";
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = attempts;

  // Create guess item
  const guessItem = document.createElement("div");
  guessItem.className = "guess-item";

  // Check guess and provide feedback
  if (guess === targetNumber) {
    gameOver = true;
    document.getElementById("message").textContent =
      "🎉 Congratulations! You got it!";
    guessItem.textContent = `${guess} 🎯`;

    // Update high score
    if (highScore === "-" || attempts < parseInt(highScore)) {
      highScore = attempts;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").textContent = highScore;
    }
  } else {
    const direction = guess > targetNumber ? "high" : "low";
    guessItem.textContent = guess;
    guessItem.classList.add(direction);

    const message =
      direction === "high"
        ? "📈 Too high! Try a lower number"
        : "📉 Too low! Try a higher number";
    document.getElementById("message").textContent = message;
  }

  // Add guess to history
  document.getElementById("guessList").prepend(guessItem);

  // Clear input
  guessInput.value = "";
  guessInput.focus();
}

// Handle Enter key
document.getElementById("guess").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Start new game on load
newGame();
