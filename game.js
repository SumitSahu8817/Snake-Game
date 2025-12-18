let inputDir = {x:0,y:0};
const foodsound = new Audio('food.mp3');
const changemove = new Audio('changemove.mp3');
const gameover = new Audio('gameover.mp3');
const bgsound = new Audio('bg.mp3');
let speed = 5;
let Score = 0;

let lastpainttime = 0;
let snakeArr = [{x:13,y:15}]
food = {x:6,y:7}

function main(ctime){
        window.requestAnimationFrame(main);
        // console.log(ctime);
        if((ctime-lastpainttime)/1000 < 1/speed){
            return;
        }
        lastpainttime = ctime;
        gameEngine();
}

function isCollided(snakeArr){
    //if you bump into yourself
    for (let index = 1; index < snakeArr.length; index++) {
        if(snakeArr[index].x===snakeArr[0].x &&snakeArr[index].y===snakeArr[0].y){
            return true;
        }
    }
        if(snakeArr[0].x>20||snakeArr[0].x<1||snakeArr[0].y>20||snakeArr[0].y<1){
            return true;
        }
        return false;
        
    }


function gameEngine(){
    for (let i = snakeArr.length-1 ; i > 0; i--){
            
            snakeArr[i] = {...snakeArr[i-1]};
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
                //updating snake and food
                if(isCollided(snakeArr) ){
                    gameover.play();  
                    bgsound.pause();
                    inputDir = {x:0,y:0};
                    alert("Game Over. Press any Key to try again!");
                    snakeArr = [{x:13,y:15}];
                    // bgsound.play();
                    Score = 0;
                    return;
                }
        //if eaten food
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            foodsound.play()
            Score++;
            speed=speed+0.01;
            
            scoreBox.innerHTML = "Score: " + Score;
            snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
            let a = 2
            let b = 16
            food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        }
        //Moving the snake
        



    //Display the snake and food
    //display the snake
                board.innerHTML = "";
                snakeArr.forEach((e,index)=>{
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = e.y;
                    snakeElement.style.gridColumnStart = e.x;
                    
                    if(index === 0){
                        snakeElement.classList.add('head');
                    }else{
                        snakeElement.classList.add('snake');
                    }
                   
                    board.appendChild(snakeElement);
                });
    //display the food
                foodElement = document.createElement('div');
                    foodElement.style.gridRowStart = food.y;
                    foodElement.style.gridColumnStart = food.x;
                    foodElement.classList.add('food');
                    board.appendChild(foodElement);
}




//main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    // inputDir = {x:0,y:0}
    changemove.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir = {x:0,y:-1}
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir = {x:0,y:1}
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir = {x:-1,y:0}
            break;
          case "ArrowRight":
            console.log("ArrowRight");
            inputDir = {x:1,y:0}
            break;   
        default:
            break;
    }
})