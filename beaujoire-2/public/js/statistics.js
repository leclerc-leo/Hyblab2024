


document.addEventListener('DOMContentLoaded', function () {
    const teams = ['Votre équipe', 'Équipe Majoritaire'];


    let teamSwiper;

    // Initialize Swiper for player lists
    teamSwiper = new Swiper('.team-swiper-container', {
        loop: true,
    });


    // Event handler for player swiper
    teamSwiper.on('slideChange', function () {
        updateContent(this.activeIndex);
    });


    function updateTeamContent(teamId) {
        const teamContainer = document.getElementById(teamId);
        teamContainer.innerHTML = '';

        /* Change the content of the next team here */

            const teamField = document.createElement('div');
        teamField.classList.add('team-field-container');
        teamField.innerHTML = `
        <img src="./img/field/field.svg" id="field-img" alt="field">
                        <img id="logo" class="field-jersey-img" src="./img/field/LOGO_APPLI.svg">

                        <div class="field-player" id="poste-1" ><div class="">
                        <img src="" alt="">
</div>
                        <img class="field-jersey-img" src="./img/animation/gants_1.gif"></div>
                        <div class="field-player" id="poste-2"><img class="field-jersey-img" src="./img/field/jerseys/joueur-2.svg"></div>
                        <div class="field-player" id="poste-3"><img class="field-jersey-img" src="./img/field/jerseys/joueur-3.svg"></div>
                        <div class="field-player" id="poste-4"><img class="field-jersey-img" src="./img/field/jerseys/joueur-4.svg"></div>
                        <div class="field-player" id="poste-5"><img class="field-jersey-img" src="./img/field/jerseys/joueur-5.svg"></div>
                        <div class="field-player" id="poste-6"><img class="field-jersey-img" src="./img/field/jerseys/joueur-6.svg"></div>
                        <div class="field-player" id="poste-7"><img class="field-jersey-img" src="./img/field/jerseys/joueur-7.svg"></div>
                        <div class="field-player" id="poste-8" ><img class="field-jersey-img" src="./img/field/jerseys/joueur-8.svg"></div>
                        <div class="field-player" id="poste-9"><img class="field-jersey-img" src="./img/field/jerseys/joueur-9.svg"></div>
                        <div class="field-player" id="poste-10"><img class="field-jersey-img" src="./img/field/jerseys/joueur-10.svg"></div>
                        <div class="field-player" id="poste-11" ><img class="field-jersey-img" src="./img/field/jerseys/joueur-11.svg"></div>
                        <div class="field-player" id="poste-12" ><img class="field-jersey-img" src="./img/animation/cravate.gif"></div>
      `;
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
        updateTeamContent(`field${currentIndex + 1}`)
        updateHeader(currentIndex);
    }

    updateContent(0);
});