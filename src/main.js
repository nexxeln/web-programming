import "./style.css";

const exercises = [1, 2, 3, 4, 5, 6, 7, 8];

const exerciseList = document.getElementById("exercise-list");

exercises.forEach((num) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `/${num}.html`;
  a.textContent = `Exercise ${num}`;
  li.appendChild(a);
  exerciseList.appendChild(li);
});
