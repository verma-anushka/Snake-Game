// Declaring basic variables
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const gameOver = document.querySelector(".gameOver");
const gameOver2 = document.querySelector(".gameOver2");
const tryAgain = document.querySelector(".tryAgain");
const unit = 32; // Creating the unit
let score = 0;
let d; // Creating direction variable to control the snake

// Loading images
const ground = new Image();
ground.src = "img/ground.png";

let foodImgs = ['apple', 'banana', 'peach', 'strawberry', 'watermelon'];
let index = Math.round( (foodImgs.length - 1) * Math.random() );
let foodImg = new Image();
foodImg.src = "img/" + foodImgs[index] + ".png";

// Creating the snake
let snake = [];
snake[0] = {
    x : 9 * unit,
    y : 10 * unit
};

// Creating the food
let food = {
    x : Math.floor(Math.random()*17+1) * unit,
    y : Math.floor(Math.random()*15+3) * unit
}

// Functions
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function endGame(){
    clearInterval(game);
    canvas.style.opacity = '0.4';
    gameOver.classList.remove("hide");
    gameOver2.classList.remove("hide");
    tryAgain.classList.remove("hide");    
    // console.log("game over");
}

tryAgain.addEventListener("click", function again(){

    d = "";
    score = 0;
    snake = [];
    snake[0] = {
        x : 9 * unit,
        y : 10 * unit
    };
    canvas.style.opacity = '1';
    ctx.clearRect(0, 0, 608, 608);
    // console.log("play again");
    draw();
    game = setInterval(draw,100);
    
});

document.addEventListener("keydown", function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
});

function draw(){
    
    gameOver.classList.add("hide");
    gameOver2.classList.add("hide");
    tryAgain.classList.add("hide");    

    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "#0a460a" : "#d7ff96";
        ctx.fillRect(snake[i].x,snake[i].y,unit,unit);
        
        ctx.strokeStyle = "#0a460a";
        ctx.strokeRect(snake[i].x,snake[i].y,unit,unit);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") 
        snakeX -= unit;
    if( d == "UP") 
        snakeY -= unit;
    if( d == "RIGHT") 
        snakeX += unit;
    if( d == "DOWN") 
        snakeY += unit;
    
    if(snakeX == food.x && snakeY == food.y){
        console.log(foodImgs[index]);

        switch(foodImgs[index]) {
        case 'apple':
            score += 2;
            break;
        case 'banana':
            score += 5;
            break;
        case 'peach':
            score += 10;
            break;
        default:
            score++;
        }
        // score++;
        food = {
            x : Math.floor(Math.random()*17+1) * unit,
            y : Math.floor(Math.random()*15+3) * unit
        }
        index = Math.round( (foodImgs.length - 1) * Math.random() );
        foodImg = new Image();
        foodImg.src = "img/" + foodImgs[index] + ".png";
    }else{
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if(snakeX < unit || snakeX > 17 * unit || snakeY < 3*unit || snakeY > 17*unit || collision(newHead,snake)){
        endGame()
    }

    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*unit,1.6*unit);

}

game = setInterval(draw,100);