"use strict";

// Just animate the logo
const init_past = async swiper => {

    move_background(0, true);

    remove_listeners('.exit-button');
    remove_listeners('.home-button');
  
    const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
    const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page
    const exit_button = page_controls.querySelector('.exit-button'); 
    const home_button = page_controls.querySelector('.home-button');

    exit_button.addEventListener('click', handle_exit.bind(null, swiper, swiper_controls, page_controls, exit_button, home_button));
    home_button.addEventListener('click', handle_home.bind(null, swiper, swiper_controls, page_controls, home_button));
};