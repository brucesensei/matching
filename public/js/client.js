// get list of image path end names from games.ejs
const gameImages = document.getElementsByClassName("game-image-data");

// get the category from games.ejs to use in the imagefile path
const category = document.getElementById("category").innerHTML;

// get the continue button
const nextButton = document.getElementById("continue");

// get the container to append the template string to from games.ejs.
const gameContainer = document.getElementById("game-container");

// get number of players
const playerCount = parseInt(document.getElementById("player-count").innerText);

// get container to append players
const playerContainer = document.getElementById("player-container");

// hold the selected images.
let selected = []



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

const players = document.querySelectorAll(".player-box");

players.forEach(item => {
  item.addEventListener('click', addScore)
})

function addScore() {
  if (selected.length == 2 && 
    selected[0].firstElementChild.id == selected[1].firstElementChild.id) {
      let currentPlayer = this.querySelector(".player-score");
      let score = parseInt(currentPlayer.innerText) + 5;
      currentPlayer.innerText = score;
    }
}

for (let i=0; i<gameImages.length; i++) {
  const imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-container');
  let [imgName, ,] = gameImages[i].innerHTML.split('.');
  imgContainer.innerHTML = `${i + 1}
  <img class="game-img" id=${imgName} src="../images/${category}/${gameImages[i].innerHTML}" alt=${imgName}>
  `;
  gameContainer.appendChild(imgContainer);
}

nextButton.addEventListener('click', nextMove)

const imageList = document.querySelectorAll(".img-container");

imageList.forEach(item => {
  item.addEventListener('click', showImage);
})

function showImage() {
  if (selected.length < 2) {
    selected.push(this)
    this.firstElementChild.classList.add('show');
  }
}

function nextMove() {
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
      selected.length = 0;
    }
  }
}
