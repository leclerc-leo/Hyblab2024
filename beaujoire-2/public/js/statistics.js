
var popularTeam = [];
window.addEventListener('load', function() {
    function FetchPopularTeam(){
      for (let i = 0; i <= 11; i++) {
          let player = globals.getTopPlayer(i+1);
          console.log(player);
          popularTeam.push(player);
      }
    }
});

function isInPopularTeam(playerId){
    return popularTeam.some(player => player.id === playerId);
}

document.addEventListener('DOMContentLoaded', function () {
    const teams = ['Votre équipe', 'Équipe Majoritaire'];


    let teamSwiper;

    // Initialize Swiper for player lists
    teamSwiper = new Swiper('.team-swiper-container', {
        loop: false,
    });


    // Event handler for player swiper
    teamSwiper.on('slideChange', function () {
        updateContent(this.activeIndex);
    });


    function updateTeamContent(teamId,currentIndex) {
        const teamContainer = document.getElementById(teamId);
        teamContainer.innerHTML = '';
        const teamField = document.createElement('div');
        teamField.classList.add('team-field-container');
        teamField.innerHTML = `
        <img src="./img/field/field.svg" id="field-img" alt="field">
                        <img id="logo" class="field-jersey-img" src="./img/field/LOGO_APPLI.svg">`;
        // Mon équipe  :
        if (currentIndex === 0){
            for( let i = 0 ; i < 12 ; i++){
                let player = globals.getPlayerStats(globals.tabVotes[i],i+1);
                console.log(player);
                let playerBox = document.createElement('div');
                playerBox.setAttribute("id",`poste-${i+1}`);
                playerBox.classList.add("field-player");
                let playerStats = document.createElement('p');
                playerStats.innerText=`${player[0].ratio}`;
                let imgPlayer = document.createElement('img');
                imgPlayer.src =`${player[0].photo}`;
                let playerName = document.createElement('p');
                let firstLetter = player[0].prenom.charAt(0).toUpperCase();
                playerName.innerText = `${firstLetter}.${player[0].name}`;
                // one of the players is part of the popular team :
                if (isInPopularTeam(player[0].id)){
                    imgPlayer.classList.add('majeur');
                    playerStats.style.color = "#F7EF24";
                }
                playerBox.appendChild(playerStats);
                playerBox.appendChild(imgPlayer);
                playerBox.appendChild(playerName);
                // append to the div that contains all the players :
                teamField.appendChild(playerBox);
            }
        } else {
            // L'équipe Majoritaire  :
            for( let i = 0 ; i < 12 ; i++){
                let playerBox = document.createElement('div');
                playerBox.setAttribute("id",`poste-${i+1}`);
                playerBox.classList.add("field-player");
                let imgPlayer = document.createElement('img');
                imgPlayer.src =`${popularTeam[i].photo}`;
                let playerName = document.createElement('p');
                let firstLetter = popularTeam[i].prenom.charAt(0).toUpperCase();
                playerName.innerText = `${firstLetter}.${popularTeam[i].name}`;
                imgPlayer.classList.add('majeur');
                playerBox.appendChild(imgPlayer);
                playerBox.appendChild(playerName);
                // append to the div that contains all the players :
                teamField.appendChild(playerBox);
            }
        }

           /*
        teamField.innerHTML = `
        <img src="./img/field/field.svg" id="field-img" alt="field">
                        <img id="logo" class="field-jersey-img" src="./img/field/LOGO_APPLI.svg">
        
                        <div class="field-player" id="poste-1"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-2"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-3"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-4"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-5"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-6"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-7"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-8" ><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-9"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-10"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-11"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
                        <div class="field-player" id="poste-12"><div class="player-box"><p> 10% </p><img class="player-img ${majeur}" src="./img/players/placeholder-img.jpg" ><p>R.RIOU</p></div></div>
            
`;*/
            teamContainer.appendChild(teamField);
    }

    function updateHeader(currentIndex) {
        const teamPreviewContainer = document.getElementById(`teamPreview${currentIndex + 1}`);
        teamPreviewContainer.innerHTML = '';

        const currentHeader = document.createElement('div');
        currentHeader.classList.add('header-preview-box', 'current');
        currentHeader.textContent = teams[currentIndex];

        const nextIndex = (currentIndex + 1) % teams.length;
        const prevIndex = (currentIndex - 1 + teams.length) % teams.length;

        let Header

        if (currentIndex === 0) {
            Header = document.createElement('div');
            Header.classList.add('header-preview-box', 'next');
            Header.textContent = teams[nextIndex];
        } else {
            Header = document.createElement('div');
            Header.classList.add('header-preview-box', 'prev');
            Header.textContent = teams[prevIndex];
        }

        if (currentIndex === 1) {
            teamPreviewContainer.appendChild(Header); }
            teamPreviewContainer.appendChild(currentHeader);
        if (currentIndex === 0){
            teamPreviewContainer.appendChild(Header);}

    }



    function updateContent(currentIndex) {
        updateTeamContent(`field${currentIndex + 1}`,currentIndex)
        updateHeader(currentIndex);
    }

    updateContent(0);
});