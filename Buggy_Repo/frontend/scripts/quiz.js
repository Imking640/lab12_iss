// Base URL for API requests
const BASE_URL = "http://localhost:8000"; // Ensure this is configurable in production

// Variables to track game state
let score = 0;
let highScore = 0;
let currentQuestion = null;
let gameOver = false;
let attemptHistory = [];

// DOM elements
const scoreDisplay = document.getElementById("scoreDisplay");
const questionDiv = document.getElementById("question");
const form = document.getElementById("answerForm");
const feedback = document.getElementById("feedback");
const resetBtn = document.getElementById("resetBtn");
const attemptList = document.getElementById("attemptList");
const attemptCount = document.getElementById("attemptCount");
const searchInput = document.getElementById("search");

// Function to update the score display
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
}

// Function to update the attempt history display
function updateAttempts() {
  const search = searchInput.value.toLowerCase(); // Get the search term
  const filtered = attemptHistory.filter(a =>
    a.question.toLowerCase().includes(search) // Filter attempts based on the search term
  );

  // Update the attempt list in the DOM
  attemptList.innerHTML = filtered.map(a => `
    <div>
      <strong>${a.question}</strong><br/>
      Your answer: ${a.answer} — ${a.result}
    </div>
  `).join("");

  // Update the total attempt count
  attemptCount.textContent = `Total attempts: ${filtered.length}`;
}

// Event listener for search input to filter attempts
searchInput.addEventListener("input", updateAttempts);

// Function to load the high score from the server
async function loadHighScore() {
  try {
    const res = await fetch(`${BASE_URL}/quiz/highscore`); // Fetch high score from the server
    const data = await res.json();
    highScore = data.high_score; // Update the high score
    updateScoreDisplay(); // Update the score display
  } catch {
    feedback.textContent = "Failed to load high score."; // Show error feedback
  }
}

// Function to load a new question from the server
async function loadQuestion() {
  if (gameOver) return; // Do not load a question if the game is over

  try {
    const res = await fetch(`${BASE_URL}/quiz/question`); // Fetch a new question
    const data = await res.json();
    currentQuestion = data; // Store the current question

    // Update the question text in the DOM
    questionDiv.textContent = data.text;

    // Generate the answer options dynamically
    form.innerHTML = data.options.map(option => `
      <label>
        <input type="radio" name="answer" value="${option}" required>
        ${option}
      </label><br/>
    `).join("") + `<button type="submit">Submit</button>`;

    form.dataset.id = data.id; // Store the question ID in the form
    feedback.textContent = ""; // Clear any previous feedback
  } catch {
    feedback.textContent = "Failed to load question."; // Show error feedback
  }
}

// Event listener for form submission to submit an answer
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  if (gameOver) return; // Do not allow submissions if the game is over

  const selected = form.querySelector("input[name=answer]:checked"); // Get the selected answer
  if (!selected) return; // Do nothing if no answer is selected

  const answer = selected.value; // Get the value of the selected answer
  const id = parseInt(form.dataset.id); // Get the question ID from the form

  try {
    // Submit the answer to the server
    const res = await fetch(`${BASE_URL}/quiz/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, answer, score }) // Send the answer and current score
    });

    const data = await res.json();

    if (data.error) {
      feedback.textContent = data.error; // Show error feedback if the server returns an error
      return;
    }

    // Add the attempt to the history
    attemptHistory.push({
      question: currentQuestion.text,
      answer,
      result: data.is_correct ? "✅ Correct" : `❌ Wrong (Correct: ${data.correct_answer})`
    });

    updateAttempts(); // Update the attempt history display

    if (data.is_correct) {
      // If the answer is correct, update the score and load a new question
      score = data.score;
      highScore = data.high_score;
      updateScoreDisplay();
      feedback.textContent = "✅ Correct!";
      await loadQuestion();
    } else {
      // If the answer is incorrect, end the game
      feedback.textContent = `❌ Incorrect. Correct answer: ${data.correct_answer}. Game Over.`;
      gameOver = true;
      form.innerHTML = ""; // Clear the form
      resetBtn.classList.remove("hidden"); // Show the reset button
    }
  } catch {
    feedback.textContent = "Error submitting answer."; // Show error feedback
  }
});

// Event listener for the reset button to restart the game
resetBtn.addEventListener("click", () => {
  score = 0; // Reset the score
  gameOver = false; // Reset the game over state
  attemptHistory = []; // Clear the attempt history
  updateScoreDisplay(); // Update the score display
  updateAttempts(); // Update the attempt history display
  resetBtn.classList.add("hidden"); // Hide the reset button
  loadQuestion(); // Load a new question
});

// Initialize the quiz on page load
window.addEventListener("DOMContentLoaded", async () => {
  await loadHighScore(); // Load the high score
  loadQuestion(); // Load the first question
});
