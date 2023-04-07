//---------------------VARIABLE DECLARATIONS-------------------------

// List of image path end names from games.ejs. ex: 'bear.png'
const gameImages = document.getElementsByClassName("game-image-data");

// Category to use in the imagefile path.
const category = document.getElementById("category").innerHTML;
 
// Container to append game-image template strings to.
const gameContainer = document.getElementById("game-container");

// Number of players.
const playerCount = parseInt(document.getElementById("player-count").innerText);

// Tracks the index of the currently selected player.
let currentPlayer = 0;

// Holds the ID of the currently selected player.
let updatePlayer = '';

// Container to append players.
const playerContainer = document.getElementById("player-container");

// Holds selected images.
let selected = []

//-----------------------CREATE PLAYERS----------------------

function createPlayers() {
  for (let i=0; i<playerCount; i++) {
    const player = document.createElement('div');
    player.setAttribute('class', 'player-box');
    let thisPlayer = 'Player ' + (i + 1);
    var playerId = 'playerId' + i;
    player.setAttribute('id', playerId);
    player.innerHTML = `
    <h3>${thisPlayer}</h3>
    <p>Pairs: <span class="player-score" >0</span></p>
    `;
    playerContainer.appendChild(player)
  }
}

//---------------------CREATE IMAGES ADD LISTENERS---------------------

function createImages() {
  // Images have a visibility hidden attribute by default.
  for (let i=0; i<gameImages.length; i++) {
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'img-container');
    let [imgName, ,] = gameImages[i].innerHTML.split('.');
    imgContainer.innerHTML = `${i + 1}
    <img class="game-img" id=${imgName} src="../images/${category}/${gameImages[i].innerHTML}" alt=${imgName}>
    `;
    gameContainer.appendChild(imgContainer);
  }
  const imageList = document.querySelectorAll(".img-container");
  imageList.forEach(item => {
    item.addEventListener('click', showImage);
  });
}

function showImage() {
  // Stores the first selected image in the selected array.
  if (selected.length < 2) {
    selected.push(this);
    this.removeEventListener('click', showImage);
    this.firstElementChild.classList.add('show');
  }
  if (selected.length == 2) {
    // Condition if selected array is full.
    this.removeEventListener('click', showImage);
    let first = selected[0];
    let second = selected[1];
    if (selected[0].firstElementChild.id == selected[1].firstElementChild.id) {
      // Update current player score on correct match.
      updatePlayer = getCurrentPlayer(currentPlayer);
      // Get the current player score and update it.
      const scoreSpan = updatePlayer.querySelector("span");
      const updatedScore = parseInt(scoreSpan.innerHTML) + 1;
      scoreSpan.innerText = updatedScore;
      setTimeout( () => {
        // After a set interval remove the current player color, change players,
        // add player color to the next player box, hide and remove click functionality from
        // successfully matched tiles, reset the selected array to 0.
        updatePlayer.classList.remove('change-color');
        currentPlayer < (playerCount - 1) ? currentPlayer += 1 : currentPlayer = 0;
        getCurrentPlayer(currentPlayer).classList.add('change-color');
        first.firstElementChild.classList.remove('show');
        second.firstElementChild.classList.remove('show');
        first.classList.add('hide');
        second.classList.add('hide');
        first.removeEventListener('click', showImage); 
        second.removeEventListener('click', showImage);
        selected.length = 0;

      }, 2000);
    } else {
      setTimeout( () => {
        // update board on incorrect match condition.
        // same as above but the score is not changed.
        getCurrentPlayer(currentPlayer).classList.remove('change-color');
        currentPlayer < (playerCount - 1) ? currentPlayer += 1 : currentPlayer = 0;
        getCurrentPlayer(currentPlayer).classList.add('change-color');
        first.firstElementChild.classList.remove('show');
        second.firstElementChild.classList.remove('show');
        first.addEventListener('click', showImage);
        second.addEventListener('click', showImage);
        selected.length = 0;
        
      }, 2000);
    }
  }
}

// pass the current player index number and return the element ID.
function getCurrentPlayer(idNumber) {
  let currentPlayerId = 'playerId' + idNumber;
  return document.getElementById(currentPlayerId);
}

//---------------------------MAIN GAME-----------------------------------

createPlayers();
createImages();
getCurrentPlayer(currentPlayer).classList.add('change-color');