//import dataUtils from '../data/dataUtils.mjs';

let votesTmp = JSON.parse(localStorage.getItem('votes'));

/*checks if the votes have been done
for (let i = 1; i <= 12; i++) {
  if(votesTmp[i] === 0 ) {
    allVotes = false ;
    break;
  }
}

/************* Archives *************/
function checkVotes() {
  const archivesButton = document.getElementById('archives');
  const statisticsButton = document.getElementById('statistiques');
  if (allVotes) {
    archivesButton.classList.remove("disabled");
    statisticsButton.classList.remove("disabled");
    archivesButton.classList.add("enabled");
    statisticsButton.classList.add("enabled");
    archivesButton.href = "/beaujoire-2/archives";
    statisticsButton.href = "/beaujoire-2/statistics";
  } else {
    archivesButton.classList.remove("enabled");
    statisticsButton.classList.remove("enabled");
    archivesButton.classList.add("disabled");
    statisticsButton.classList.add("disabled");
    archivesButton.href = "javascript: void(0)";
    statisticsButton.href = "javascript: void(0)";
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


/************* Vote progression display  **************/

// <div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div>
function checkprogress() {
  for (let i = 0; i < votesTmp.length; i++) {
    // Append the player-voted div to the field-jersey anchor
    const fieldJersey = document.getElementById(`poste-${i + 1}`);
    if (votesTmp[i] !== 0) {
      // Create the picture element
      const playerVotedDiv = document.createElement('div');
      playerVotedDiv.classList.add('player-voted');

      const playerImg = document.createElement('img');
      playerImg.classList.add('player-img');

      // TODO : link it to the database : image and name
      playerImg.src = './img/players/Player-photo.png';

      const playerName = document.createElement('p');
      playerName.textContent = 'R.RIOU';

      // Append elements to the player-voted div
      playerVotedDiv.appendChild(playerImg);
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
          if(i+1 < 10) {
            jerseyImg.src = `./img/animation/maillot-0${i + 1}.gif`;
          } else {
            jerseyImg.src = `./img/animation/maillot-${i + 1}.gif`;
          }
        }
      }
      fieldJersey.replaceChild(jerseyImg, fieldJersey.firstChild)
      fieldJersey.classList.remove('voted');
      // Change the href attribute
      fieldJersey.href = 'list';
    }
  }
}

checkprogress();

/************* Vote progression display  **************/

/************* Finalize votes  **************/
document.getElementById('statistiques').addEventListener('click',() => {
  // Access the sessionToken passed from the server
  const sessionToken = globals.getSessionToken();
  dataUtils.vote(sessionToken, votesTmp);
  // TODO : redirect
})
/************* Finalize votes  **************/

