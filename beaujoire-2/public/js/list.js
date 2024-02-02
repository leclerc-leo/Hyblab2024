// list.js

document.addEventListener('DOMContentLoaded', function () {
  const positions = ['Gardien','Arrière latéral droit','Arriere latéral gauche','Défenseur central 1','Défenseur central 2','Milieu défensif','Milieu gauche',
  'Milieu offensif','Attaquant 1','Milieu droit','Attaquant 2','Sélectionneur']
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
    // Add more player lists as needed
  ];

  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        const currentpos = positions[this.activeIndex];
        const currentList = playerLists[this.activeIndex];
        updatePlayerList(`playerList${this.activeIndex + 1}`, currentList);
      },
    },
  });

  // Your existing player list update function
  function updatePlayerList(playerListId, players) {
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

  let selectedHeartButton = null;
  function toggleHeart(button) {
    if (button.dataset.type === 'heart') {
      // Deselect the previously selected heart button
      if (selectedHeartButton && selectedHeartButton !== button) {
        selectedHeartButton.classList.remove('pressed');
      }

      button.classList.toggle('pressed');
      selectedHeartButton = button;
    }
  }

  // Initial update with the first player list
  updatePlayerList('playerList1', playerLists[0]);
});
