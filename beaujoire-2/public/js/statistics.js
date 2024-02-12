
var popularTeam = [];

function isInPopularTeam(playerId) {
    return popularTeam.some(player => player.id === playerId);
}

document.addEventListener('DOMContentLoaded', function () {
    const teams = ['Votre équipe', 'Équipe Majoritaire'];

    async function FetchPopularTeam() {
        for (let i = 0; i <= 11; i++) {
            let player = await globals.getTopPlayer(i + 1);
            console.log(player);
            popularTeam.push(player);
        }
    }

    let teamSwiper;

    // Initialize Swiper for player lists
    teamSwiper = new Swiper('.team-swiper-container', {
        loop: false,
    });


    // Event handler for player swiper
    teamSwiper.on('slideChange', function () {
        updateContent(this.activeIndex);
    });


    async function updateTeamContent(teamId, currentIndex) {
        const teamContainer = document.getElementById(teamId);
        teamContainer.innerHTML = '';
        await FetchPopularTeam();
        /* let majeur = (currentIndex === 1) ? 'majeur' : ''; */
        /* Change the content of the next team here */

        const teamField = document.createElement('div');
        teamField.classList.add('team-field-container');
        teamField.id = "capturable";
        teamField.innerHTML = `
        <img src="./img/field/field.svg" id="field-img" alt="field">
                        <img id="logo" class="field-jersey-img" src="./img/field/LOGO_APPLI.svg">`;
        // Mon équipe  :
        if (currentIndex === 0) {
            for (let i = 0; i < 12; i++) {
                let player = await globals.getPlayerStats(globals.tabVotes[i], i + 1);

                let fieldPlayer = document.createElement('div');
                fieldPlayer.setAttribute("id", `poste-${i + 1}`);
                fieldPlayer.classList.add("field-player");

                let playerBox = document.createElement('div');
                playerBox.classList.add("player-box");

                let playerStats = document.createElement('p');
                playerStats.innerText = `${player.ratio}%`;

                let imgPlayer = document.createElement('img');
                imgPlayer.src = `${player.photo}`;
                imgPlayer.classList.add("player-img");

                let playerName = document.createElement('p');
                let firstLetter = player.prenom.charAt(0).toUpperCase();
                playerName.innerText = `${firstLetter}.${player.nom}`;

                // one of the players is part of the popular team :
                if (isInPopularTeam(globals.tabVotes[i])) {
                    imgPlayer.classList.add('majeur');
                    playerStats.style.color = "#F7EF24";
                }
                playerBox.appendChild(playerStats);
                playerBox.appendChild(imgPlayer);
                playerBox.appendChild(playerName);
                fieldPlayer.appendChild(playerBox)
                // append to the div that contains all the players :
                teamField.appendChild(fieldPlayer);
            }
        } else {
            // L'équipe Majoritaire  :
            for (let i = 0; i < 12; i++) {

                let fieldPlayer = document.createElement('div');
                fieldPlayer.setAttribute("id", `poste-${i + 1}`);
                fieldPlayer.classList.add("field-player");

                let playerBox = document.createElement('div');
                playerBox.classList.add("player-box");


                let imgPlayer = document.createElement('img');
                imgPlayer.src = `${popularTeam[i].photo}`;
                imgPlayer.classList.add("player-img");

                let playerName = document.createElement('p');
                let firstLetter = popularTeam[i].prenom.charAt(0).toUpperCase();
                playerName.innerText = `${firstLetter}.${popularTeam[i].nom}`;

                imgPlayer.classList.add('majeur');

                playerBox.appendChild(imgPlayer);
                playerBox.appendChild(playerName);
                fieldPlayer.appendChild(playerBox)
                // append to the div that contains all the players :
                teamField.appendChild(fieldPlayer);
            }
        }

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
            teamPreviewContainer.appendChild(Header);
        }
        teamPreviewContainer.appendChild(currentHeader);
        if (currentIndex === 0) {
            teamPreviewContainer.appendChild(Header);
        }

    }



    function updateContent(currentIndex) {
        updateTeamContent(`field${currentIndex + 1}`, currentIndex)
        updateHeader(currentIndex);
    }

    updateContent(0);
});


const capture = async () => {
    try {
        const elementToCapture = document.getElementById("field1");

        // Création d'un canvas....
        const canvas = await html2canvas(elementToCapture);

        // On en fait une image
        const imageDataUrl = canvas.toDataURL("image/png");

        // Et on lance le téléchargement
        const link = document.createElement("a");
        link.href = imageDataUrl;
        link.download = "screenshot.png";

        // On crée un lien invisible que l'on clique avant de le supprimer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error: ", error);
    }
};

document.getElementById("partage").addEventListener("click", capture);