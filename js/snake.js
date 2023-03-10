window.addEventListener('load', function() {
    main()
})
function main(){
const gameContainer = document.createElement('div');
const canvas = document.createElement('canvas');

 
canvas.id = "canvas";
canvas.tabIndex = 0;
gameContainer.id = 'game-container';
gameContainer.appendChild(canvas);
document.body.appendChild(gameContainer);
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if(!isMobile){ 
canvas.width = 400;
canvas.height = 400;}
    const snakeSize = 10;
    const foodSize = 10;
if (isMobile){
    const snakeSize = 30;
    const foodSize = 30;
    canvas.width = window.innerWidth * 0.8;;
canvas.height = window.innerHeight * 0.4;
const buttonDiv = document.createElement('div');
document.body.appendChild(buttonDiv)
//const buttonDiv = document.querySelector('#game-container');
const upButton = document.createElement('button');
upButton.textContent = '↑';
upButton.style.width = '150px';
upButton.style.height = '150px';
upButton.style.fontSize = '24px';
upButton.style.margin = '10px';

const downButton = document.createElement('button');
downButton.textContent = '↓';
downButton.style.width = '150px';
downButton.style.height = '150px';
downButton.style.fontSize = '24px';
downButton.style.margin = '10px';

const leftButton = document.createElement('button');
leftButton.textContent = '←';
leftButton.style.width = '150px';
leftButton.style.height = '150px';
leftButton.style.fontSize = '24px';
leftButton.style.margin = '10px';

const rightButton = document.createElement('button');
rightButton.textContent = '→';
rightButton.style.width = '150px';
rightButton.style.height = '150px';
rightButton.style.fontSize = '24px';
rightButton.style.margin = '10px';
    buttonDiv.appendChild(upButton);
buttonDiv.appendChild(downButton);
buttonDiv.appendChild(leftButton);
buttonDiv.appendChild(rightButton);
buttonDiv.style.display = 'flex';
buttonDiv.style.flexDirection = 'row';
buttonDiv.style.justifyContent = 'center';
buttonDiv.style.alignItems = 'center';
buttonDiv.style.position = 'absolute';
buttonDiv.style.bottom = '0';
buttonDiv.style.width = '100%';

    upButton.addEventListener('click', function() {
  dx = 0;
  dy = -10;
});

downButton.addEventListener('click', function() {
  dx = 0;
  dy = 10;
});

leftButton.addEventListener('click', function() {
  dx = -10;
  dy = 0;
});

rightButton.addEventListener('click', function() {
  dx = 10;
  dy = 0;
});
}

const style = document.createElement('style');
style.innerHTML = `
  body {
    background-color: #f0f0f0;
  }
  #game-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 50vh;
    border: 3px solid black;
  }
  canvas {
    background-color: white;
    border: 3px solid black;
  }
`;
document.head.appendChild(style);


let snakeLength = 3;

let snake = [  { x: 50, y: 50 },  { x: 40, y: 50 },  { x: 30, y: 50 },];

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

let dx = 10;
let dy = 0;

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case KEY_LEFT:
      console.log("left")
      dx = -10;
      dy = 0;
      break;
    case KEY_UP:
      console.log("up")
      dx = 0;
      dy = -10;
      break;
    case KEY_RIGHT:
      console.log("right")
      dx = 10;
      dy = 0;
      break;
    case KEY_DOWN:
      console.log("down")
      dx = 0;
      dy = 10;
      break;
  }
});



function drawSnake() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = 'green';

  // Draw the snake at its new position
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
  }
}

function checkCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}

let food = { x: 0, y: 0 };


// Draw the food block
function drawFood() {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'brown';
  ctx.fillRect(food.x, food.y, foodSize, foodSize);
}

// Spawn the food block at a random position
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / foodSize)) * foodSize;
  food.y = Math.floor(Math.random() * (canvas.height / foodSize)) * foodSize;
}

// Call spawnFood every few seconds
setInterval(() => {
  spawnFood();
}, 5000);

// Check for collision between the snake's head and the food block
function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snakeLength++;
    spawnFood();
  }
}

let updateInterval = setInterval(() => {
  update();
}, 100);

function gameOver() {
  console.log("game over")
   clearInterval(updateInterval);
    if (confirm("Game Over! Play again?")) {
    // restart game
    restartGame();
}}

function restartGame() {
  // Reset the snake
  snake = [
    { x: 50, y: 50 },
    { x: 40, y: 50 },
    { x: 30, y: 50 },
  ];
  dx = 10;
  dy = 0;
  snakeLength = 3;


  // Restart the game loop
  updateInterval = setInterval(update, 100);
}

function update() {
  // Get the new position of the snake's head based on the direction
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wrap the snake around the screen
  if (head.x < 0) {
    head.x = canvas.width - snakeSize;
  } else if (head.x >= canvas.width) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = canvas.height - snakeSize;
  } else if (head.y >= canvas.height) {
    head.y = 0;
  }

  if (checkCollision()) {
    snake.pop();
    snakeLength--;
    console.log(snakeLength)
  }

  checkFoodCollision();

  if (snakeLength <= 2){
    gameOver();
  }

  // Add the new head to the start of the snake array
  snake.unshift(head);

  // Remove the tail of the snake if its length exceeds `snakeLength`
  if (snake.length > snakeLength) {
    snake.pop();
  }

  // Draw the snake at its new position
  drawSnake();
  drawFood();
}

}
