let grid = document.getElementById('grid');
let scoreDisplay= document.getElementById('score');
let squares= [];
let currentSnake=[2,1,0];
let direction=1;
let appleIndex=0;
let score=0;
let timerId=0;
let intervalTime=200;

const eatSound= new Audio("assets/eat.mp3");
const bgMusic = new Audio("assets/bgmusic.mp3");
const loseMusic = new Audio("assets/lose.mp3");

//creating the board
function createBoard(){
    for (let i=0; i<400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();
startGame();

function startGame(){
    //reset the game
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    let end= document.getElementById("end");
    end.innerText="";
    clearInterval(timerId);
    currentSnake=[2,1,0];
    score=0; direction =1; intervalTime=200;
    scoreDisplay.textContent=score;
    currentSnake.forEach(index => squares[index]. classList.add('snake'));
    generateApple();
    timerId= setInterval(move,intervalTime);
    loseMusic.pause();
    loseMusic.currentTime=0;
    bgMusic.play();


}




 function endGame (){
    let end= document.getElementById("end");
    end.innerText= "GAME OVER💀";
    bgMusic.pause();
    bgMusic.currentTime=0;
    loseMusic.play();
    return clearInterval(timerId);
    
    

 }    
function move(){
    
    let hitBot=(currentSnake[0]  >=380 && direction === 20);
    let hitTop= (currentSnake[0] -20 <0 && direction === -20);
    let hitRight= (currentSnake[0] % 20 ===19 && direction === 1);
    let hitLeft= (currentSnake[0] % 20 === 0 && direction ===-1);
    let hitSelf= squares[currentSnake[0] + direction]?.classList.contains('snake');
    if (hitRight||hitBot||hitTop||hitLeft|| hitSelf) {
        return endGame();
    }
    const tail = currentSnake.pop();
    const newHead =currentSnake[0] +direction;
    squares[tail].classList.remove('snake');
    squares[newHead].classList.add('snake');
    currentSnake.unshift(newHead);
    if (squares[newHead].classList.contains('apple')){
        eatSound.play();
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++; scoreDisplay.textContent= score;
        intervalTime= intervalTime*0.95;
        generateApple();
        clearInterval(timerId);
        timerId=setInterval(move,intervalTime);
    }
    
    document.addEventListener('touchstart', e=> {
        touchStartx= e.changedTouches[0].screenX;
        touchStarty= e.changedTouches[0].screenY;
    }   ,false);

    document.addEventListener('touchend' , e=> {
        touchEndx = e.changedTouches[0].screenX;
        touchEndy = e.changedTouches[0].screenY;
        handleSwipe();
    },false)


}

 function handleSwipe(){
        const dx = touchEndx- touchStartx;
        const dy = touchEndy- touchStarty;

        const absDx= Math.abs(dx);
        const absDy= Math.abs(dy);

        if (Math.max(absDx, absDy) > 30 ){
            if (absDx >absDy){
                if (dx >0) changeDir(1);
                else changeDir(-1);    

            } else {
                if (dy > 0) changeDir(20);
                else changeDir(-20);
            }
       }
    }


function generateApple(){
    do{
        appleIndex= Math.floor(Math.random()* squares.length);
       } while (squares[appleIndex]. classList.contains('snake'));
       squares[appleIndex].classList.add('apple');

}

function changeDir(newDir){
    //no
    if (direction+ newDir !== 0) {
        direction= newDir;
    }
}

document.addEventListener('keydown', (E)=> {
    if(E.key === 'ArrowUp') changeDir(-20);
    if(E.key=== 'ArrowDown') changeDir(20);
    if(E.key === 'ArrowLeft') changeDir(-1);
    if(E.key === 'ArrowRight') changeDir(1);

});





