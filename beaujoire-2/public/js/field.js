
votesTmp = JSON.parse(localStorage.getItem('votes'));
console.log(votesTmp);
var allVotes = true;

for (let i = 1; i <= 12; i++) {
  if (votesTmp[i] === 0) {
    allVotes = false;
    break;
  }
}

/************* Archives *************/
function checkVotes() {
  const archivesButton = document.getElementById('archives');
  if (allVotes) {
    archivesButton.classList.remove("disabled");
    archivesButton.classList.add("enabled");
    archivesButton.href = "/beaujoire-2/archives";
  } else {
    archivesButton.classList.remove("enabled");
    archivesButton.classList.add("disabled");
    archivesButton.href = "javascript: void(0)";
  }
}

checkVotes();
/************* Archives *************/

/************* Pop up  **************/

if (allVotes) {

  window.addEventListener("load", function () {
    setTimeout(
      function open(event) {
        document.querySelector(".popup").style.display = "block";
        document.getElementById('container').style.opacity = 0.7;
      },
      1000
    )
  });

  document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    document.getElementById('container').style.opacity = 1;
  });
}

/************* Pop up -info  **************/
document.querySelector("#close-info").addEventListener("click", function () {
  document.querySelector(".popup-info").style.display = "none";
  document.getElementById('container').style.opacity = 1;
});

document.querySelector("#info").addEventListener("click", function () {
  document.querySelector(".popup-info").style.display = "flex";
  document.getElementById('container').style.opacity = 0.7;
});

/************* Animations  **************/

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => {
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 0,
    targets: '#loader',
    opacity: '0',
    'z-index': -1,
    easing: 'easeOutQuad',
  });
}, 1000);
/************* Animations  **************/

/************* Vote progression display  **************/

function checkprogress() {
  for (let i = 0; i < votesTmp.length; i++) {
    // Append the player-voted div to the field-jersey anchor
    const fieldJersey = document.getElementById(`poste-${i + 1}`);
    if (votesTmp[i] !== 0) {
      // Create the picture element
      const playerVotedDiv = document.createElement('div');
      playerVotedDiv.classList.add('player-voted');

      const playerImgBoxDiv = document.createElement('div');
      playerImgBoxDiv.classList.add('player-img-box');

      const playerImg = document.createElement('img');
      playerImg.classList.add('player-img');

      // TODO : link it to the database : image and name
      playerImg.src = './img/players/Player-photo.png';

      const playerName = document.createElement('p');
      playerName.textContent = 'R.RIOU';

      // Append elements to the player-voted div
      playerImgBoxDiv.appendChild(playerImg);
      playerVotedDiv.appendChild(playerImgBoxDiv);
      playerVotedDiv.appendChild(playerName);


      fieldJersey.replaceChild(playerVotedDiv, fieldJersey.firstChild);

      fieldJersey.classList.add('voted');
      // Change the href attribute
      fieldJersey.href = 'javascript:void(0)';
    } else {
      const jerseyImg = document.createElement('img');
      jerseyImg.classList.add('field-jersey-img');
      // entraineur :
      if (i + 1 === 12) {
        jerseyImg.src = './img/animation/cravate.gif';
      } else {
        // gardien :
        if (i + 1 === 1) {
          jerseyImg.src = './img/animation/gants_1.gif';
        } else {
          jerseyImg.src = `./img/field/jerseys/joueur-${i + 1}.svg`;
        }
      }
      fieldJersey.replaceChild(jerseyImg, fieldJersey.firstChild)
      fieldJersey.classList.remove('voted');
      // Change the href attribute
      fieldJersey.href = 'home';
    }
  }
}

checkprogress();


/************* Vote progression display  **************/


