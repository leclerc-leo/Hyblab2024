
console.log(globals.tabVotes);
console.log(globals.shown);

/************* Archives *************/
function checkVotes() {
  const archivesButton = document.getElementById('archives');
  const statisticsButton = document.getElementById('statistiques');
  if (globals.checkAllVotes(globals.tabVotes)) {
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

if (globals.checkAllVotes(globals.tabVotes) && !(globals.shown)) {

  window.addEventListener("load", async function () {

    setTimeout(
        function open(event) {
          document.querySelector(".popup").style.display = "block";
          document.getElementById('container').style.opacity = 0.7;
          /************* confetti  **************/
              // Pass in the id of an element
          let confetti = new Confetti("popup-archive");
          // Edit given parameters
          confetti.setCount(75);
          confetti.setSize(1);
          confetti.setPower(25);
          confetti.setFade(false);
          confetti.destroyTarget(false);

          /************* confetti  **************/
        },
        1000
    )
    globals.setShown(true);
    await getSessionTokenValue();

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



async function fetchPlayerData(fieldJersey,playerId) {
  try {
    await globals.getPlayersById(playerId).then( (player) => {
      //update Vote :
      // Create the picture element
      const playerVotedDiv = document.createElement('div');
      playerVotedDiv.classList.add('player-voted');

      const playerImg = document.createElement('img');
      playerImg.classList.add('player-img');

      playerImg.src = `${player.photo}`;

      const playerName = document.createElement('p');
      let firstLetter = player.prenom.charAt(0).toUpperCase();
      playerName.textContent = `${firstLetter}.${player.nom}`;

      // Append elements to the player-voted div
      playerVotedDiv.appendChild(playerImg);
      playerVotedDiv.appendChild(playerName);

      fieldJersey.replaceChild(playerVotedDiv, fieldJersey.firstChild);

      fieldJersey.classList.add('voted');
      // Change the href attribute
      fieldJersey.href = 'javascript:void(0)';
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  for (let i = 0; i < globals.tabVotes.length; i++) {
    // Append the player-voted div to the field-jersey anchor
    const fieldJersey = document.getElementById(`poste-${i + 1}`);
    if (globals.tabVotes[i] !== 0) {
      await fetchPlayerData(fieldJersey, globals.tabVotes[i]);
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
          if (i + 1 < 10) {
            jerseyImg.src = `./img/animation/maillot-0${i + 1}.gif`;
          } else {
            jerseyImg.src = `./img/animation/maillot-${i + 1}.gif`;
          }
        }
      }
      fieldJersey.replaceChild(jerseyImg, fieldJersey.firstChild)
      fieldJersey.classList.remove('voted');
      // Change the href attribute
      fieldJersey.href = 'list';/*
      const swiper = document.querySelector('.player-swiper-container');
      fieldJersey.addEventListener('click',function(){console.log("aledd: i+1");swiper.slideTo(i+1);});*/
    }
  }
})

/************* Vote progression display  **************/

/************* Finalize votes  **************/
document.getElementById('statistiques').addEventListener('click', () => {
  // Access the sessionToken passed from the server
  if (globals.checkAllVotes(globals.tabVotes) && !(globals.shown)){
    globals.saveVotes(globals.sessionToken, globals.tabVotes);
    window.location.href = '/beaujoire-2/statistics';
  }
})
/************* Finalize votes  **************/




