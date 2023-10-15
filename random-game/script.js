const startButton = document.getElementById('start-button');
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;
let gameInterval = null;

function startGame() {
  result = 0;
  currentTime = 30;
  score.textContent = result;
  timeLeft.textContent = currentTime;

  clearInterval(timerId); // Clear the existing mole movement
  clearInterval(gameInterval); // Clear the countdown timer

  moveMole(); // Start the mole movement
  gameInterval = setInterval(countDown, 1000); // Start the countdown timer
  startButton.disabled = true; // Disable the Start button while the game is in progress
}

function stopGame() {
  clearInterval(timerId); // Clear the mole movement
  clearInterval(gameInterval); // Clear the countdown timer
  startButton.disabled = false; // Enable the Start button
  alert('GAME OVER! Your final score is ' + result);
  storeScore(result); // Store the current score
  displayLast10Scores(); // Update the scores list
}

startButton.addEventListener('click', startGame);

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 750);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    stopGame(); // End the game when time runs out
  }
}

function storeScore(score) {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push(score);
  localStorage.setItem('scores', JSON.stringify(scores));
}

function getLast10Scores() {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  return scores.slice(-10); // Get the last 10 scores
}

function displayLast10Scores() {
  const last10Scores = getLast10Scores().reverse(); // Reverse the order
  const scoresList = document.getElementById('last-10-scores');
  scoresList.innerHTML = ''; // Clear previous scores

  last10Scores.forEach((score, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Game ${index + 1} :  ${score} scores`;
    scoresList.appendChild(listItem);
  });
}

displayLast10Scores(); // Display scores on page load
