// list.js

document.addEventListener('DOMContentLoaded', function () {
  const positions = ['Gardien', 'Arrière droit', 'Arriere gauche', 'Défenseur central 1'];

  const playerLists = [
    [
      { name: 'Player 1', photo: 'img/ndoram.jpg' },
      { name: 'Player 2', photo: 'img/ndoram.jpg' },
      { name: 'Player 3', photo: 'img/ndoram.jpg' },
      { name: 'Player 4', photo: 'img/ndoram.jpg' },
      { name: 'Player 5', photo: 'img/ndoram.jpg' },
    ],
    [
      { name: 'Player 6', photo: 'img/ndoram.jpg' },
      { name: 'Player 7', photo: 'img/ndoram.jpg' },
      { name: 'Player 8', photo: 'img/ndoram.jpg' },
      { name: 'Player 9', photo: 'img/ndoram.jpg' },
      { name: 'Player 10', photo: 'img/ndoram.jpg' },
    ],
    [
      { name: 'Player 1', photo: 'img/ndoram.jpg' },
      { name: 'Player 2', photo: 'img/ndoram.jpg' },
      { name: 'Player 3', photo: 'img/ndoram.jpg' },
      { name: 'Player 4', photo: 'img/ndoram.jpg' },
      { name: 'Player 5', photo: 'img/ndoram.jpg' },
    ],
    [
      { name: 'Player 6', photo: 'img/ndoram.jpg' },
      { name: 'Player 7', photo: 'img/ndoram.jpg' },
      { name: 'Player 8', photo: 'img/ndoram.jpg' },
      { name: 'Player 9', photo: 'img/ndoram.jpg' },
      { name: 'Player 10', photo: 'img/ndoram.jpg' },
    ],
    // Add more player lists as needed
  ];


  let playerSwiper;

  // Initialize Swiper for player lists
  playerSwiper = new Swiper('.player-swiper-container', {
    loop: true,
  });


  // Event handler for player swiper
  playerSwiper.on('slideChange', function () {
    updateContent(this.activeIndex);
  });


  function updatePlayerListContent(playerListId, players) {
    const playerListContainer = document.getElementById(playerListId);
    playerListContainer.innerHTML = '';

    players.forEach((player) => {
      const playerBox = document.createElement('div');
      playerBox.classList.add('player-box');
      playerBox.innerHTML = `
        <img src="${player.photo}" >
        <p>${player.name}</p>
        <button class="down-slider"></button>
        <button class="heart-button" data-type="heart"></button>
      `;

         
      playerListContainer.appendChild(playerBox);
      playerBox.addEventListener("click", () => downSlide(playerBox));  

      const heartButton = playerBox.querySelector('.heart-button');
      heartButton.addEventListener('click', () => {toggleHeart(heartButton);});
    });
  }

  function downSlide(playerBox){
    const imagePlayer = playerBox.children[0];
    const name = playerBox.children[1];
    const heart = playerBox.children[2];
    const slider = playerBox.children[3];
  
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
  };

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
  
  

  function updateContent(currentIndex) {
    updatePlayerListContent(`playerList${currentIndex + 1}`, playerLists[currentIndex]);
    updatePositions(currentIndex);
  }
  

  let selectedHeartButton = null;
  function toggleHeart(button) {
    if (button.dataset.type === 'heart') {
      if (selectedHeartButton && selectedHeartButton !== button) {
        selectedHeartButton.classList.remove('pressed');
      }

      button.classList.toggle('pressed');
      selectedHeartButton = button;
    }
  }

  updateContent(0);
});