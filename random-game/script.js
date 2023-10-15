const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 30;
let timerId = null;

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

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
    storeScore(result); // Store the current score
    displayLast10Scores(); // Update the scores list
  }
}

let countDownTimerId = setInterval(countDown, 1000);

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
    listItem.textContent = `Game ${index + 1}: ${score}`;
    scoresList.appendChild(listItem);
  });
}

displayLast10Scores(); // Display scores on page load
