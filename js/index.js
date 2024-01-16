//game constant and variables
let snakeVelocity = { x: 0, y: 0 };//at start of game the snake must be constant we have done it with object
let speed = 5;
let score=0;
let lastPaintTime = 0;
let snakeArr = [{ x: 11, y: 14 }];
let foodParticle = { x: 6, y: 7 };

//game function
function main(ctime) { //it gives the current time at which it is running
    window.requestAnimationFrame(main);//window is optional
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {//last baari kab paint hua tha screen fps bahut jyaada hogi toh use hame kam karna hai toh ham yaha use ek required number ya frequency se kam rhna chahiye chije. So here it will paint the screen only if this is greater than this
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    //if snake bump into itself
    for (let i = 1; i < snake.length; i++){
       if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
        return true;
       }
    }
    //if snake collides with wall
    if (snake[0].x>16||snake[0].x<0 || snake[0].y>16||snake[0].y<0) {
        return true;
        
    }
    return false;
}

function gameEngine() {
    //Part 1: update snake and food array
    if (isCollide(snakeArr)) {
        snakeVelocity={x:0,y:0};
        alert("Game Over!!! Please enter any key to play again");
        //this thing will occur after key is pressed, reintialising the value
        snakeArr=[{x:11,y:14}];
        score=0;

    }
   
    //If the food is eaten then increment the score and regenrate the food
    if (snakeArr[0].x===foodParticle.x && snakeArr[0].y===foodParticle.y){
        snakeArr.unshift({x:snakeArr[0].x+snakeVelocity.x,y:snakeArr[0].x+snakeVelocity.x})
        foodParticle={x:Math.round(2+12*Math.random()),y:Math.round(2+12*Math.random())}
    }
    //moving the snake
    for (let i =  snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};//if will do it normally then there will be problem that at last all element will point it towards 1 element. to get rid of this we will apply destructuring so that it will point it to a new object
        
    }
    snakeArr[0].x+=snakeVelocity.x;//0th element apna change nahi hua tha upar use yaha change kr diya
    snakeArr[0].y+=snakeVelocity.y;


    //part 2: Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        //console.log(index);
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0)
            snakeElement.classList.add('head');

        else
            snakeElement.classList.add('snake');

        board.appendChild(snakeElement);

    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodParticle.y;
    foodElement.style.gridColumnStart = foodParticle.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic is here
window.requestAnimationFrame(main);// this is being called only once so it is called multiple times we have called it again in function
/*request animation frame is the improved version of the setTime interval 
-->in set time interval we give the time interval in which span it want to repeat the function
jaise isme toh kaise ki ham fun repeat karwate hain chahe browser ready ho ya na ho 
par animation frame me har baari screen repaint hota aur woh jabhi hota hai jb woh ready ho */
window.addEventListener('keydown', e => {
    snakeVelocity  = { x: 0, y: 1};//start the game
    switch (e.key) {
        case "ArrowUp":
            snakeVelocity.x =0;
            snakeVelocity.y =-1;//upar jane ke liye y ki value ghatani pdegi 
            break;
        case "ArrowDown":
            snakeVelocity.x =0;
            snakeVelocity.y =1;
            break;
        case "ArrowLeft":
            snakeVelocity.x =-1;
            snakeVelocity.y =0;
            break;
        case "ArrowRight":
            snakeVelocity.x =1;
            snakeVelocity.y =0;
            break;
    
    }
})