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