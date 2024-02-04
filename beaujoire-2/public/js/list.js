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

      const heartButton = playerBox.querySelector('.heart-button');
      heartButton.addEventListener('click', function () {
        toggleHeart(heartButton);
      });
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
