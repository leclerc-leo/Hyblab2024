// get the temporary votes :
console.log(globals.tabVotes);

let selectedHeartButton = null;

document.addEventListener('DOMContentLoaded', function () {
  const positions = ['Gardien', 'Arrière droit', 'Arriere gauche', 'Défenseur central 1', 'Défenseur central 2', 'Milieu défensif', 'Milieu gauche', 'Milieu offensif', 'Attaquant 1', 'Milieu droit', 'Attaquant 2', 'Sélectionneur'];
  let playerSwiper;

  /** 
    // Function to extract query parameters from the URL
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }
  
    // Retrieve the positionId from the query parameter
    const positionId = getQueryParam('position');
    console.log(positionId)
**/

  async function getPlayersByPosition(positionId) {
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
    try {
      console.log('Fetching data for position:', positionId);
      const players = await getPlayersByPosition(positionId);
      updatePlayerListContent(`playerList${positionId}`, players, positionId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  function updatePlayerListContent(playerListId, players, positionId) {
    const playerListContainer = document.getElementById(playerListId);
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
      playerBox.addEventListener("click", () => downSlide(playerBox));

      const heartButton = playerBox.querySelector('.heart-button');
      heartButton.addEventListener('click', () => { toggleHeart(heartButton, player.id, positionId); });
      if (globals.tabVotes[positionId-1] === player.id){
        heartButton.classList.add("pressed");
        selectedHeartButton = heartButton ;
      }

      const downslider = playerBox.querySelector('.down-slider');
      downslider.addEventListener('click', () => { downSlide(downslider, playerBox); });
    });
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
    let currentPositionIndex = 0;
    playerSwiper = new Swiper('.player-swiper-container', {
      loop: false,
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
  function updateContent(currentIndex) {
    const newPositionId = currentIndex + 1;
    fetchData(newPositionId);
    updatePositions(currentIndex);
  }

  function downSlide(button, playerBox){
    if (button.dataset.type === 'downslide') {
      const imagePlayer = playerBox.children[0];
      const name = playerBox.children[1].children[0];
      const heart = playerBox.children[2];
      const slider = playerBox.children[1].children[1];
    
      imagePlayer.style["display"] = "none";
      name.style["display"] = "none";
      heart.style["display"] = "none";
      slider.style["display"] = "none";

      try {
        const backgroundText = document.createElement("div");
        backgroundText.className = "background-text";
        backgroundText.textContent = "FC Nantes  FC Nantes  FC Nantes  FC Nantes";

        const avatar = document.createElement("img");
        avatar.src = "./img/players/Player-photo.png";
        avatar.alt = "Player Image";
        avatar.className = "avatar";

        const overlayFirstname = document.createElement("div");
        overlayFirstname.className = "overlay-firstname";
        overlayFirstname.textContent = "Firstname";

        const lastname = document.createElement("div");
        lastname.className = "lastname";
        lastname.textContent = "Lastname";

        const fullname = document.createElement("div");
        fullname.className = "fullname";
        fullname.appendChild(overlayFirstname);
        fullname.appendChild(lastname);

        const closeButton = document.createElement("img");
        closeButton.src = "./img/bio-icons/fleche-haut.svg";
        const displayBio = document.createElement("div");
        displayBio.className = "display-bio";
        displayBio.appendChild(closeButton);

        const field = document.createElement("img");
        field.src = "./img/bio-icons/selection.svg";
        const nbMatchs = document.createElement("p");
        nbMatchs.textContent = "100 matchs";
        const infos1 = document.createElement("div");
        infos1.className = "infos";
        infos1.appendChild(field);
        infos1.appendChild(nbMatchs);

        const flag1 = document.createElement("img");
        flag1.src = "./img/bio-icons/flags/flag-france.png";
        const flag2 = document.createElement("img");
        flag2.src = "./img/bio-icons/flags/flag-burkina-faso.png";
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
        likeButton.src = "./img/bio-icons/coeur-01.svg";
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

        const role = document.createElement("img");
        role.src = "./img/bio-icons/arret.svg";
        const score = document.createElement("p");
        score.textContent = "20 buts";
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
        iconsText.textContent = 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        
        playerBox.className = "bio-player";
        playerBox.appendChild(backgroundText);
        playerBox.appendChild(avatar);
        playerBox.appendChild(fullname);
        playerBox.appendChild(displayBio);
        playerBox.appendChild(icons);
        playerBox.appendChild(iconsText)
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

  updateContent(0)
  handleSwiperEvents();

});