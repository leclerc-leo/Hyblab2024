"use strict";

const init_past = async swiper => {

    remove_listeners('.return-button');
  
    const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
    const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page
    const return_button = page_controls.querySelector('.return-button'); 

    return_button.addEventListener('click', handle_return.bind(null, swiper, swiper_controls, page_controls, return_button));
};