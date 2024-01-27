//board
let blockSize=25;
let rows=20;
let cols=20;
let board;
let context;

//snake head
let snakeX=blockSize*5;
let snakeY=blockSize*5;
let velocityX=0;
let velocityY=0;

let snakeBody=[]
//food
let foodX;
let foodY;

let gameOver=false;

window.onload = ()=>{
    board= document.getElementById("board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    placeFood();
    document.addEventListener("keyup",changeDirection)
    setInterval(update,100);
}

function update(){
    if (gameOver){
        return;
    }

    let grd = context.createLinearGradient(0, 0, board.width, board.height);
    // light blue
    grd.addColorStop(0, 'green');   
    // dark blue
    grd.addColorStop(1, 'yellow');
    
    context.fillStyle=grd;
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    //if we move the forward part first then next part will not know where they are going 

    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    //then the starting body part at the place of the head
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];

    }


    context.fillStyle="purple";
    snakeX+=velocityX*blockSize;
    snakeY+=velocityY*blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    if(snakeX<0||snakeX>blockSize*cols || snakeY<0 || snakeY>blockSize*rows){
        gameOver=true;
        alert("Game Over");
    }

    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0]&&snakeY==snakeBody[i][1]){
            gameOver=true;
            alert("Game Over");
        }
    }

}

function changeDirection(e){
    if(e.code=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    if(e.code=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    if(e.code=="ArrowLeft" && velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }
    if(e.code=="ArrowRight" && velocityX != -1){
        velocityX=1;
        velocityY=0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random()*rows)*blockSize;

}