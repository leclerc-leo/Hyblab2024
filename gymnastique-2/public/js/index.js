"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: true,
    navigation:{
        enabled: false,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    initialSlide: 1,
    delay: 600,
    speed: 300,
    shortSwipes: true,
});

swiper.on('progress', () => {
    const blacklisted = [0, 50, 100]
    if (blacklisted.includes(Math.round(100 * swiper.progress))) return;
    move_background(Math.round(100 * swiper.progress)) 
});

swiper.on("slideChange", function () {
    switch( swiper.activeIndex ) {
        case 1:
            init_accueil(swiper);
            break;
        case 0:
            init_past(swiper);
            break;
        case 2:
            init_futur(swiper);
            break;
    }
});

init_accueil(swiper);

const categories_buttons = document.querySelectorAll('.category-button'); // les boutons permettant d'accéder aux informations
const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page

categories_buttons.forEach( button => {
    button.addEventListener('click', () => {
        /* Les boutons sont recréés à chaque fois que l'on change de slide 
        *  pour éviter que les listeners ne se cumulent */
        const exit_button = page_controls.querySelector('.exit-button'); 
        const home_button = page_controls.querySelector('.home-button');

        const category = button.id.split('-')[0];

        const block = document.querySelector(`#${category}-page`);

        if (block == null) {
            console.log('Le bloc pour le bouton ' + button.id + ' n\'existe pas');
            return;
        }

        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.visibility = 'visible';
        block.style.width = '100%';
        block.style.height = '100vh';
        block.style.bottom = '0';
        block.style.left = '0';
        block.style.overflow = 'auto';
        block.style.borderRadius = '0';
        block.style.opacity = '1';

        /* Nous gardons en mémoire l'id du bouton cliqué pour pouvoir
        *  retourner le bloc à sa position initiale lors d'une sortie */
        exit_button.id = `${category}-exit`;
        home_button.id = `${category}-home`;

        swiper.disable(); // pour éviter de changer de slide lors d'un scroll et d'autoriser le scroll sur la page
    });
});