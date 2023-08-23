const gameContainer = document.getElementById("game");
const start = document.getElementById('start');
const reset = document.getElementById('reset');


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
 
  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

let score = 0;
let highScore = 100;


//When clicked on card, color will show
function startGame(){
gameContainer.addEventListener('click',function(e){
 
  if(e.target){score++;
  };
  e.target.classList.toggle('flipped');
  cardLimit();
  let scoreB = document.querySelector('.score');
  scoreB.innerText = score;
 if(document.querySelectorAll('.matched').length === 10){
  alert('You win!');
  localSave();
 }
})
}
// for match

const allColorDivs = gameContainer.querySelectorAll('.flipped')
//function to limit only 2 cards flipped
  const cardLimit = ()=>{
    const allColorDivs = gameContainer.querySelectorAll('.flipped')

   for(let colors of allColorDivs){
    if(allColorDivs.length === 2 && allColorDivs[0].classList.value !== allColorDivs[1].classList.value) {
   setTimeout(() =>{colors.classList.toggle('flipped');
  },1000)
  }
   else if(allColorDivs.length === 2){ //keep color matched
    if(allColorDivs[0].classList.value === allColorDivs[1].classList.value){
      gameContainer.querySelectorAll('.flipped')[0].classList.add('matched');
      gameContainer.querySelectorAll('.flipped')[1].classList.add('matched');
      colors.classList.toggle('flipped');
    }
  }
  else if(allColorDivs.length>=3){
    setTimeout(() =>{colors.classList.remove('flipped');
  },1000);
  alert('ONLY 2 CARDS');
  break;
  }
  }
}
//start the game when press start button
start.addEventListener('click',function(e){
  if(e){
    alert('Start');
    startGame();
  }
})
//reset game via refresh page because im dumb and cant figure out
reset.addEventListener('click',function(e){
  if(e){
    alert('game has been reset');
    location.reload()
  }
})

// Save best score to local storage and keep it posted/updated
// function localSave(){
//   localStorage.setItem('highScore', highScore )
// }  
let localHighScore = document.getElementsByClassName('highScore');
function localSave(){
  console.log(score);
  console.log(localHighScore.textContent);
  if(score !== 0 && score < localHighScore.innerText ){
    console.log('here')
    localHighScore.innerText = score;
    localStorage.setItem('highScore', localHighScore.innerText)
  }
}
function showHighScore(){
  localHighScore.innerText = localStorage.getItem('highScore')
}
//local storage/ store in database / network call 
showHighScore();
