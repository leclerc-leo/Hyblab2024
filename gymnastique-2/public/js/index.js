"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "horizontal",
  mousewheel: true,
  navigation:{
    enabled: true,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  initialSlide: 1,
});

swiper.on("slideChange", function () {
  switch( swiper.activeIndex ) {
    case 1:
      init_accueil();
      break;
    case 0:
      init_past();
      break;
    case 2:
      init_futur();
      break;
  }
});

init_accueil();

const categories_buttons = document.querySelectorAll('.category-button');
const swiper_controls = document.querySelector('.swiper-controls');
const page_controls = document.querySelector('.page-controls');

const exit_button = document.querySelector('.exit-button');

categories_buttons.forEach( button => {
  console.log(button);
  button.addEventListener('click', () => {
    console.log(button);
    const category = button.id.split('-')[0];

    const block = document.querySelector(`#${category}-page`);
    block.classList.toggle('hidden');

    swiper_controls.classList.toggle('hidden');
    page_controls.classList.toggle('hidden');

    exit_button.id = `${category}-exit`;

    swiper.allowSlideNext = false;
    swiper.allowSlidePrev = false;
  });
});

exit_button.addEventListener('click', () => {
  const category = exit_button.id.split('-')[0];

  const block = document.querySelector(`#${category}-page`);
  block.classList.toggle('hidden');

  swiper_controls.classList.toggle('hidden');
  page_controls.classList.toggle('hidden');

  exit_button.id = 'exit';

  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
});