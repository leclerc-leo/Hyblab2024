// get the temporary votes :
console.log(globals.tabVotes);

let selectedHeartButton = null;

document.addEventListener('DOMContentLoaded', function () {
  const positions = ['Gardien', 'Arrière droit', 'Arriere gauche', 'Défenseur central 1', 'Défenseur central 2', 'Milieu défensif', 'Milieu gauche', 'Milieu offensif', 'Attaquant 1', 'Milieu droit', 'Attaquant 2', 'Sélectionneur'];
  let playerSwiper;

  
    // Function to extract query parameters from the URL
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
  
    // Retrieve the positionId from the query parameter
    const positionId = parseInt(getQueryParam('position')) -1;


  async function getPlayersByPosition(positionId) {
    console.log(positionId);
    try {
      const response = await fetch(`/beaujoire-2/api/players/${positionId}`);
      const data = await response.json();
      return data.players;
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  }

  async function fetchData(positionId) {
    console.log('Fetching data for position:', positionId);
    try {
      const players = await getPlayersByPosition(positionId);
      console.log(players);
      updatePlayerListContent(`playerList${positionId}`, players, positionId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }


  function updatePlayerListContent(playerListId, players, positionId) {
    console.log(positionId);
    const playerListContainer = document.getElementById(playerListId);
    if (playerListContainer) {
    playerListContainer.innerHTML = '';

    players.forEach((player) => {
      const playerBox = document.createElement('div');
      playerBox.classList.add('player-box');
      playerBox.innerHTML = `
        <img src="${player.photo}" >
        <div class = "name-desc">
        <p>${player.prenom} ${player.nom}</p>
        <button class="down-slider" data-type="downslide"></button>
        </div>
        <button class="heart-button" data-type="heart"></button>
      `;


      playerListContainer.appendChild(playerBox);
      playerBox.dataset.player = JSON.stringify(player);
      playerBox.addEventListener("click", () => downSlide(playerBox));

      const heartButton = playerBox.querySelector('.heart-button');
      heartButton.addEventListener('click', () => { toggleHeart(heartButton, player.id, positionId); });
      if (globals.tabVotes[positionId-1] === player.id){
        heartButton.classList.add("pressed");
        selectedHeartButton = heartButton ;
      }

      const downslider = playerBox.querySelector('.down-slider');
      downslider.addEventListener('click', () => { downSlide(downslider, playerBox); });
    });}
    else {
      console.error(`Element with ID ${playerListId} not found.`);
    }
  }

  function updatePositions(currentIndex) {
    const positionPreviewContainer = document.getElementById(`positionPreview${currentIndex + 1}`);
    positionPreviewContainer.innerHTML = '';

    const currentPos = document.createElement('div');
    currentPos.classList.add('position-preview-box', 'current');
    currentPos.textContent = positions[currentIndex];

    const prevIndex = (currentIndex - 1 + positions.length) % positions.length;
    const nextIndex = (currentIndex + 1) % positions.length;

    const prevPos = document.createElement('div');
    prevPos.classList.add('position-preview-box', 'prev');
    prevPos.textContent = positions[prevIndex];

    const nextPos = document.createElement('div');
    nextPos.classList.add('position-preview-box', 'next');
    nextPos.textContent = positions[nextIndex];

    positionPreviewContainer.appendChild(prevPos);
    positionPreviewContainer.appendChild(currentPos);
    positionPreviewContainer.appendChild(nextPos);
  }

  function handleSwiperEvents() {
    let currentPositionIndex = positionId ;
    playerSwiper = new Swiper('.player-swiper-container', {
      loop: true,
      on: {
        slideChange: function () {
          currentPositionIndex = this.activeIndex;
          const newPositionId = currentPositionIndex + 1;
          fetchData(newPositionId);
          updatePositions(currentPositionIndex);
        },
      },
    });

    playerSwiper.on('slideChange', function () {
      const newPositionId = this.activeIndex + 1;
      fetchData(newPositionId);
      updatePositions(this.activeIndex);
    });

  }

  function downSlide(button, playerBox){
    if (button.dataset.type === 'downslide') {
      const player = JSON.parse(playerBox.dataset.player);
      console.log(player);
      const imagePlayer = playerBox.children[0];
      const name = playerBox.children[1].children[0];
      const heart = playerBox.children[2];
      const slider = playerBox.children[1].children[1];
    
      imagePlayer.style["display"] = "none";
      name.style["display"] = "none";
      heart.style["display"] = "none";
      slider.style["display"] = "none";

      try {
        //const detailedPlayer =  globals.getPlayersById(playerId);
        const backgroundText = document.createElement("div");
        backgroundText.className = "background-text";
        backgroundText.textContent = "FC Nantes  FC Nantes  FC Nantes  FC Nantes";

        const avatar = document.createElement("img");
        avatar.src = player.photo;
        avatar.alt = "Player Image";
        avatar.className = "avatar";

        const overlayFirstname = document.createElement("div");
        overlayFirstname.className = "overlay-firstname";
        overlayFirstname.textContent = `${player.prenom}`;

        const lastname = document.createElement("div");
        lastname.className = "lastname";
        lastname.textContent = `${player.nom}`;

        const fullname = document.createElement("div");
        fullname.className = "fullname";
        fullname.appendChild(overlayFirstname);
        fullname.appendChild(lastname);

        const closeButton = document.createElement("img");
        closeButton.src = "./img/field/croix.svg";
        const displayBio = document.createElement("div");
        displayBio.className = "display-bio";
        displayBio.appendChild(closeButton);

        const field = document.createElement("img");
        field.src = "./img/bio-icons/selection.svg";
        const nbMatchs = document.createElement("p");
        nbMatchs.textContent = `${player.selections} séléctions`;
        const infos1 = document.createElement("div");
        infos1.className = "infos";
        infos1.appendChild(field);
        infos1.appendChild(nbMatchs);

        const flag1 = document.createElement("img");
        flag1.src = `./img/nationalities/${player.nationalité1}.svg`;
        const flag2 = document.createElement("img");
        flag2.src = `./img/nationalities/${player.nationalité2}.svg`;
        const flags = document.createElement("div");
        flags.className = "flags";
        flags.appendChild(flag1);
        flags.appendChild(flag2);
        const countries = document.createElement("p");
        countries.textContent = "PAYS1/PAYS2"
        const infos2 = document.createElement("div");
        infos2.className = "infos";
        infos2.appendChild(flags);
        infos2.appendChild(countries);

        const likeButton = document.createElement("img");
        likeButton.src = "./img/COEUR1.svg";
        const like = document.createElement("div");
        like.className = "like";
        like.appendChild(likeButton);

        const logoFCN = document.createElement("img");
        logoFCN.src = "./img/bio-icons/club-icon/FCNANTES-2019.svg";
        const yearInClub = document.createElement("p");
        yearInClub.textContent = "2024";
        const infos3 = document.createElement("div");
        infos3.className = "infos";
        infos3.appendChild(logoFCN);
        infos3.appendChild(yearInClub);
        let role = document.createElement("img");
        let score = document.createElement("p");
        if (player.poste === 1){
            role.src = "./img/bio-icons/arret.svg";
            score.textContent = `${player.arrets} arrêts`;
        }
        else if (player.poste < 12){
            role.src = "./img/bio-icons/ballon.svg";
            score.textContent = `${player.buts} buts`;
        }
        const infos4 = document.createElement("div");
        infos4.className = "infos";
        infos4.appendChild(role);
        infos4.appendChild(score);
        const icons = document.createElement("div");
        icons.className = "icons";
        icons.appendChild(infos1);
        icons.appendChild(infos2);
        icons.appendChild(like);
        icons.appendChild(infos3);
        icons.appendChild(infos4);

        const iconsText = document.createElement("div");
        iconsText.className = "icons-text";
        iconsText.textContent = `${player.biographie}`
        
        playerBox.className = "bio-player";
        playerBox.appendChild(backgroundText);
        playerBox.appendChild(avatar);
        playerBox.appendChild(fullname);
        playerBox.appendChild(displayBio);
        playerBox.appendChild(icons);
        playerBox.appendChild(iconsText);

        likeButton.addEventListener('click', () => { toggleHeart(likeButton, player.id, positionId); });
      } catch (error) {
        console.error(error);
      } 
    }
  };


  function toggleVote(positionId,playerId){
    if (globals.tabVotes[positionId-1] === 0)
    {
      globals.tabVotes[positionId-1] = playerId ;
    } else {
      if (globals.tabVotes[positionId-1] === playerId)
        globals.tabVotes[positionId-1] = 0 ;
    }
  }

  function toggleHeart(button,playerId ,positionId) {

    if (button.dataset.type === 'heart') {
      if (selectedHeartButton && selectedHeartButton !== button) {
        selectedHeartButton.classList.remove('pressed');
        // update temporary votes :
        globals.tabVotes[positionId-1] = 0 ;
      }
      // update temporary votes :
      toggleVote(positionId,playerId);
      console.log(globals.tabVotes);
      globals.updateVotes(globals.tabVotes);
      button.classList.toggle('pressed');
      selectedHeartButton = button;
    }
  }


  /*function updateContent(currentIndex) {
    console.log(currentIndex);
    const newPositionId = currentIndex + 1;
    fetchData(newPositionId);
    updatePositions(currentIndex);
  }
  */

  //updateContent(positionId)
  handleSwiperEvents();

});