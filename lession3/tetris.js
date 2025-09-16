const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startButton = document.getElementById('start-button');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

let board = [];
for (let r = 0; r < ROWS; r++) {
  board[r] = [];
  for (let c = 0; c < COLS; c++) {
    board[r][c] = 0;
  }
}

const COLORS = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
];

const SHAPES = [
  [],
  [[1, 1, 1, 1]], // I
  [[1, 1, 0], [0, 1, 1]], // Z
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1], [1, 1]], // O
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
];

let player;
let score = 0;
let level = 1;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let gameOver = false;

function createPiece(type) {
    if (type === 'T') {
        return [[1, 1, 1], [0, 1, 0]];
    } else if (type === 'O') {
        return [[1, 1], [1, 1]];
    } else if (type === 'L') {
        return [[0, 0, 1], [1, 1, 1]];
    } else if (type === 'J') {
        return [[1, 0, 0], [1, 1, 1]];
    } else if (type === 'I') {
        return [[1, 1, 1, 1]];
    } else if (type === 'S') {
        return [[0, 1, 1], [1, 1, 0]];
    } else if (type === 'Z') {
        return [[1, 1, 0], [0, 1, 1]];
    }
}

function playerReset() {
  const pieces = 'ILJOTSZ';
  player = {
    pos: {x: 3, y: 0},
    matrix: createPiece(pieces[pieces.length * Math.random() | 0]),
    color: Math.floor(Math.random() * 7) + 1,
  };
  if (collides(board, player)) {
    gameOver = true;
  }
}

function collides(board, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
         (board[y + o.y] &&
          board[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(board, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos, player.color);
}

function drawMatrix(matrix, offset, color) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = color ? COLORS[color] : COLORS[value];
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1, 1);
      }
    });
  });
}

function merge(board, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + player.pos.y][x + player.pos.x] = player.color;
      }
    });
  });
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

function playerDrop() {
  player.pos.y++;
  if (collides(board, player)) {
    player.pos.y--;
    merge(board, player);
    playerReset();
    sweep();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collides(board, player)) {
    player.pos.x -= dir;
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collides(board, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function sweep() {
  let clearedLines = 0;
  outer: for (let y = board.length - 1; y > 0; --y) {
    for (let x = 0; x < board[y].length; ++x) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }

    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    ++y;

    clearedLines++;
  }

  if (clearedLines > 0) {
    score += clearedLines * 10;
    level = Math.floor(score / 100) + 1;
    dropInterval = 1000 / level;
    scoreElement.innerText = score;
    levelElement.innerText = level;
  }
}

function update(time = 0) {
  if (gameOver) {
    alert('Game Over');
    return;
  }

  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 38) {
    playerRotate(1);
  }
});

startButton.addEventListener('click', () => {
  board.forEach(row => row.fill(0));
  score = 0;
  level = 1;
  dropInterval = 1000;
  gameOver = false;
  scoreElement.innerText = score;
  levelElement.innerText = level;
  playerReset();
  update();
});

context.scale(BLOCK_SIZE, BLOCK_SIZE);
