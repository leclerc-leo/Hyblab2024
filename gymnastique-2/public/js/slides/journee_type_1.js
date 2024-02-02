"use strict";





const init_journee = async swiper => {
    console.log("init_journee");

    remove_listeners('.exit-button');
    remove_listeners('.home-button');

    const swiper_controls = document.querySelector('.swiper-controls'); // les boutons qui permettent de changer de slides + la pagination
    const page_controls = document.querySelector('.page-controls'); // les boutons qui permettent de revenir à l'accueil ou de quitter la page
    const exit_button = page_controls.querySelector('.exit-button'); 
    const home_button = page_controls.querySelector('.home-button');

    exit_button.addEventListener('click', handle_exit.bind(null, swiper, swiper_controls, page_controls, exit_button, home_button));
    home_button.addEventListener('click', handle_home.bind(null, swiper, swiper_controls, page_controls, home_button));
};


/*
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("custom-slider");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
*/