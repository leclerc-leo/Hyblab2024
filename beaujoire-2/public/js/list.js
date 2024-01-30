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

    const saveVotesButton = document.getElementById('saveVotesButton');
    saveVotesButton.addEventListener('click', function() {
      // Add functionality to save votes
      alert('Votes saved!');
    });
    
    function toggleHeart(button) {    
        if (button.dataset.type === 'heart') {
        button.classList.toggle('pressed');
      }
    }

    const swiper = new Swiper('', {
        // Add swiper configuration options if needed
      });  
    
    document.getElementById('leftArrow').addEventListener('click', function() {
        //swiper.slidePrev(); 
        window.location.href = './field.html';
      });
    
    document.getElementById('rightArrow').addEventListener('click', function() {
        //swiper.slideNext();
        window.location.href = './list.html';});
  
    updatePlayerList('playerList', playersPage);
  });
    