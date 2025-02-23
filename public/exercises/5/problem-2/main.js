function calculateFlames() {
  const name1 = document
    .getElementById("name1")
    .value.toLowerCase()
    .replace(/\s/g, "");
  const name2 = document
    .getElementById("name2")
    .value.toLowerCase()
    .replace(/\s/g, "");

  if (!name1 || !name2) {
    alert("Please enter both names");
    return;
  }

  document
    .querySelectorAll(".letter")
    .forEach((letter) => letter.classList.remove("active"));

  const name1Chars = [...name1];
  const name2Chars = [...name2];

  const uniqueChars1 = name1Chars.filter((char) => !name2Chars.includes(char));
  const uniqueChars2 = name2Chars.filter((char) => !name1Chars.includes(char));

  const remainingCount = uniqueChars1.length + uniqueChars2.length;

  if (remainingCount === 0) {
    showResult("Soulmates! All letters match!");
    return;
  }

  const flames = ["F", "L", "A", "M", "E", "S"];
  const relationships = {
    F: "Friends",
    L: "Lovers",
    A: "Affectionate",
    M: "Marriage",
    E: "Enemy",
    S: "Siblings",
  };

  const resultIndex = (remainingCount % 6) - 1;
  const finalIndex = resultIndex < 0 ? 5 : resultIndex;
  const result = flames[finalIndex];

  const letterElements = document.querySelectorAll(".letter");
  letterElements[finalIndex].classList.add("active");

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
