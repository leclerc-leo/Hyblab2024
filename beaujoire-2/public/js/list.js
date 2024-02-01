// list.js

document.addEventListener('DOMContentLoaded', function() {
    const playersPage = [
      { name: 'PLAYER', photo: 'img/ndoram.jpg' },
      { name: 'PLAYER', photo: 'img/ndoram.jpg' },
      { name: 'PLAYER', photo: 'img/ndoram.jpg' },
      { name: 'PLAYER', photo: 'img/ndoram.jpg' },
      { name: 'PLAYER', photo: 'img/ndoram.jpg' },
    ];

    function updatePlayerList(playerListId, players) {
      const playerListContainer = document.getElementById(playerListId);
      playerListContainer.innerHTML = '';
  
      players.forEach(player => {
        const playerBox = document.createElement('div');
        playerBox.classList.add('player-box');
        playerBox.innerHTML = `
          <img src="${player.photo}" >
          <p>${player.name}</p>
          <button class="heart-button" data-type="heart"></button>
          <button class="down-slider" ></button>
        `;
        playerListContainer.appendChild(playerBox);
        const heartButton = playerBox.querySelector('.heart-button');
        heartButton.addEventListener('click', function() {
          toggleHeart(heartButton);
        });
    });

    }

    const retour = document.getElementById('retour');
    retour.addEventListener('click', function() {
      // fonction vote 
      alert('Votes saved!');
    });



    function toggleHeart(button) {    
        if (button.dataset.type === 'heart') {
        button.classList.toggle('pressed');
      }
    }
    updatePlayerList('playerList', playersPage);
  }); 
var swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,});

var swiper2 = new Swiper('.mySwiper2', {
    loop: true,
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
  });