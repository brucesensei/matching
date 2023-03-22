//---------------------VARIABLE DECLARATIONS-------------------------

// List of image path end names from games.ejs. ex: 'bear.png'
const gameImages = document.getElementsByClassName("game-image-data");

// Category to use in the imagefile path.
const category = document.getElementById("category").innerHTML;

// Continue button.
const nextButton = document.getElementById("continue");

// Container to append game-image template strings to.
const gameContainer = document.getElementById("game-container");

// Number of players
const playerCount = parseInt(document.getElementById("player-count").innerText);

// Container to append players
const playerContainer = document.getElementById("player-container");

// Holds selected images.
let selected = []

//------------------------CREATE PLAYERS IF SELECTED----------------------


if (playerCount != 0) {
  for (let i=0; i<playerCount; i++) {
    const player = document.createElement('div');
    player.setAttribute('class', 'player-box');
    let thisPlayer = 'player ' + (i + 1)
    player.innerHTML = `
    <h3>${thisPlayer}</h3>
    <p>Score: <span class="player-score" >0</span></p>
    `;
    playerContainer.appendChild(player)
  }
}

//-----------------------ADD EVENT LISTENERS TO PLAYERS----------------------

const players = document.querySelectorAll(".player-box");

players.forEach(item => {
  item.addEventListener('click', addScore)
})

//-----------------------ADD SCORE FUNCTION----------------------------------

function addScore() {
  if (selected.length == 2 && 
    selected[0].firstElementChild.id == selected[1].firstElementChild.id) {
      let currentPlayer = this.querySelector(".player-score");
      let score = parseInt(currentPlayer.innerText) + 5;
      currentPlayer.innerText = score;
      let disable = document.querySelectorAll(".player-box");
      disable.forEach(item => {item.removeEventListener('click', addScore)});
    }
}

//------------------------------CREATE IMAGES--------------------------------

for (let i=0; i<gameImages.length; i++) {
  const imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-container');
  let [imgName, ,] = gameImages[i].innerHTML.split('.');
  imgContainer.innerHTML = `${i + 1}
  <img class="game-img" id=${imgName} src="../images/${category}/${gameImages[i].innerHTML}" alt=${imgName}>
  `;
  gameContainer.appendChild(imgContainer);
}


//----------------EVENT LISTENERS ON IMAGES--------------------

const imageList = document.querySelectorAll(".img-container");

imageList.forEach(item => {
  item.addEventListener('click', showImage);
})

function showImage() {
  if (selected.length < 2) {
    selected.push(this);
    this.removeEventListener('click', showImage);
    this.firstElementChild.classList.add('show');
  }
}


//-----------------------NEXT MOVE BUTTON LOGIC-------------------------

nextButton.addEventListener('click', nextMove)

function nextMove() {
  if (playerCount != 0) {
    let disable = document.querySelectorAll(".player-box");
    disable.forEach(item => {item.removeEventListener('click', addScore)});
    let enable = document.querySelectorAll(".player-box");
    enable.forEach(item => {item.addEventListener('click', addScore)});
  }
  if (selected.length == 2) {
    let first = selected[0];
    let second = selected[1];
    if (first.firstElementChild.id == second.firstElementChild.id) {
      first.firstElementChild.classList.remove('show');
      second.firstElementChild.classList.remove('show');
      first.classList.add('hide');
      second.classList.add('hide');
      first.removeEventListener('click', showImage); 
      second.removeEventListener('click', showImage);
      selected.length = 0;
    } else {
      first.firstElementChild.classList.remove('show');
      second.firstElementChild.classList.remove('show');
      first.addEventListener('click', showImage);
      second.addEventListener('click', showImage);
      selected.length = 0;
    }
  }
}
