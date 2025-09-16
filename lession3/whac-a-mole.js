const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const startButton = document.getElementById('start-button');
const gameBoard = document.getElementById('game-board');

let score = 0;
let level = 1;
let timeUp = false;
let lastHole;
let holes = [];
let gameInterval;

function createGameBoard() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    gameBoard.appendChild(hole);
    holes.push(hole);
  }
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(2000 / level, 3000 / level);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  level = 1;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true;
    clearInterval(gameInterval);
  }, 60000);

  gameInterval = setInterval(() => {
      level = Math.floor(score / 10) + 1;
      levelDisplay.textContent = level;
  }, 1000);
}

function bonk(e) {
  if (!e.isTrusted) return; // Cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreDisplay.textContent = score;
}

createGameBoard();

holes.forEach(hole => hole.querySelector('.mole').addEventListener('click', bonk));

startButton.addEventListener('click', () => {
    if (timeUp) {
        startGame();
    }
});

startGame();
