function calculateFlames() {
  // Get input values and convert to lowercase
  const name1 = document
    .getElementById("name1")
    .value.toLowerCase()
    .replace(/\s/g, "");
  const name2 = document
    .getElementById("name2")
    .value.toLowerCase()
    .replace(/\s/g, "");

  // Validate inputs
  if (!name1 || !name2) {
    alert("Please enter both names");
    return;
  }

  // Reset previous active letter
  document
    .querySelectorAll(".letter")
    .forEach((letter) => letter.classList.remove("active"));

  // Create arrays of characters
  const name1Chars = [...name1];
  const name2Chars = [...name2];

  // Remove common characters
  const uniqueChars1 = name1Chars.filter((char) => !name2Chars.includes(char));
  const uniqueChars2 = name2Chars.filter((char) => !name1Chars.includes(char));

  // Count remaining characters
  const remainingCount = uniqueChars1.length + uniqueChars2.length;

  // If no characters remain
  if (remainingCount === 0) {
    showResult("Soulmates! All letters match!");
    return;
  }

  // FLAMES logic
  const flames = ["F", "L", "A", "M", "E", "S"];
  const relationships = {
    F: "Friends",
    L: "Lovers",
    A: "Affectionate",
    M: "Marriage",
    E: "Enemy",
    S: "Siblings",
  };

  // Calculate result (remainingCount % 6 gives us index 0-5)
  const resultIndex = (remainingCount % 6) - 1;
  const finalIndex = resultIndex < 0 ? 5 : resultIndex;
  const result = flames[finalIndex];

  // Highlight the result letter
  const letterElements = document.querySelectorAll(".letter");
  letterElements[finalIndex].classList.add("active");

  // Show the result
  showResult(`Relationship Status: ${relationships[result]}`);
}

function showResult(text) {
  const resultText = document.getElementById("relationship-text");
  resultText.textContent = text;
  resultText.style.opacity = "0";
  setTimeout(() => {
    resultText.style.opacity = "1";
  }, 100);
}
