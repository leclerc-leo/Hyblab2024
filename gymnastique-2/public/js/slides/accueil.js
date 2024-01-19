"use strict";

// async init function (because of the awaits on fetches)
const init_accueil = async swiper => {
    // Get logo element
    const logo = document.querySelector('#logo-hyblab');

    // (Re)set initial scale of logo
    logo.setAttribute('style', 'transform :scale(1);');

    // Animate hyblab logo and make shrink on click
    anime({
        targets: '#logo-hyblab',
        scale: 1.2,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    // Add click listener
    logo.addEventListener('click', () => {
        anime({
                targets: '#logo-hyblab',
                scale: 0
            });
        swiper.slideNext()
    });

    // Get some dummy data
    const response = await fetch('data/dummy.json');
    const data2 = await response.json();

    console.log(data2.message);

    remove_listeners('.exit-button');
    remove_listeners('.home-button');
    remove_listeners('.credits-button');

    const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
    const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page
    const exit_button = page_controls.querySelector('.exit-button'); 
    const home_button = page_controls.querySelector('.home-button');

    const credits = document.querySelector('.credits-button');
    const block = document.querySelector('.credits');

    credits.addEventListener('click', () => {
        console.log(page_controls)
        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.height = '100%';
        block.style.opacity = '1';

        swiper.disable();
    });

    exit_button.addEventListener('click', () => {
        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.height = '0';
        block.style.opacity = '0.7';

        swiper.enable()
    });

    home_button.addEventListener('click', () => {
        swiper_controls.classList.toggle('hidden');
        page_controls.classList.toggle('hidden');

        block.style.height = '0';
        block.style.opacity = '0.7';
    
        swiper.enable();
    });
};