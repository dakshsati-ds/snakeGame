let blockSize = 25;
let total_row = 25;
let total_col = 25;

let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;


// setting the speed of the snake
let  speedX = 0;
let speedY = 0;

const snakeBody = [];

//setting the food
let foodX = 0;
let foodY = 0;

let gameOver = false;

window.onload = function(){
    //setting the canvas
    const board = document.getElementById("board");
    board.height = blockSize * total_row;
    board.width = blockSize * total_col;
    context = board.getContext("2d");

    //call function to spawn food
    spawnFood();

    document.addEventListener("keyup", changeDirection);

    //setting the speed of the snake
    setInterval(update, 1000/10);
    
}

const update = () => {
    if(gameOver) return;
    const board = document.getElementById("board");


    //setting the colors
    context.fillStyle = "#141414";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "whitesmoke";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX === foodX && snakeY === foodY){ 
        snakeBody.push([snakeX, snakeY]); //correction 14:30
        spawnFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "whitesmoke";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if(snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height){
        gameOver = true;
        alert("game over");
    }

    //snake eats itself
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
            gameOver = true;
            alert("game over");
        }
    }
}

const changeDirection = (e) => {
    if(e.code == "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    }

    else if(e.code == "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    }

    else if(e.code == "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }

    else if(e.code == "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }   
}

const spawnFood = () => {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}