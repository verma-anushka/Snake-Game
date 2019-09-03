const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const gameOver = document.querySelector(".gameOver");
const gameOver2 = document.querySelector(".gameOver2");
const tryAgain = document.querySelector(".tryAgain");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

let foodImgs = ['apple', 'banana', 'peach', 'strawberry', 'watermelon'];
let index = Math.round( (foodImgs.length - 1) * Math.random() );
let foodImg = new Image();
foodImg.src = "img/" + foodImgs[index] + ".png";
// console.log(foodImgs.length);

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio(); 
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
let score = 0;

//control the snake
let d;


// cheack collision function
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
    cvs.style.opacity = '0.4';
    gameOver.classList.remove("hide");
    gameOver2.classList.remove("hide");
    tryAgain.classList.remove("hide");    

    console.log("game over");
    dead.play();
}

tryAgain.addEventListener("click", function again(){

    score = 0;
    snake = [];
    snake[0] = {
        x : 9 * box,
        y : 10 * box
    };
    cvs.style.opacity = '1';
    ctx.clearRect(0, 0, 608, 608);
    console.log("in play again");
    draw();
});

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// draw everything to the canvas
function draw(){
    
    gameOver.classList.add("hide");
    gameOver2.classList.add("hide");
    tryAgain.classList.add("hide");    

    ctx.drawImage(ground,0,0);
    
    console.log("snake length " + snake.length);
    for( let i = 0; i < snake.length ; i++){
        console.log("cndsjdscn");
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    console.log("x " + snakeX);
    console.log("y " + snakeY);

    console.log("d " + d);
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        index = Math.round( (foodImgs.length - 1) * Math.random() );
        foodImg = new Image();
        foodImg.src = "img/" + foodImgs[index] + ".png";
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head   
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    console.log("new x " + newHead.x);
    console.log("new y " + newHead.y);
    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        endGame()
    }
    
    snake.unshift(newHead);
    console.log("snake length@ " + snake.length);
    
    // console.log("snake " + snake[0]);

    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms
let game = setInterval(draw,100);