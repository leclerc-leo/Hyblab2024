"use strict";

const init_accueil = async swiper => {

    remove_listeners('.return-button');
    remove_listeners('.credits-button');

    const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
    const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page
    const return_button = page_controls.querySelector('.return-button'); 

    const credits = document.querySelector('.credits-button');
    const block = document.querySelector('.credits');

    credits.addEventListener('click', () => {
        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.height = '100%';
        block.style.opacity = '1';

        swiper.disable();
    });

    return_button.addEventListener('click', () => {
        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.height = '0';
        block.style.opacity = '0.7';

        swiper.enable()
    });
};