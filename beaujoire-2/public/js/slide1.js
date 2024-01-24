"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  // Get button element
  const button = document.querySelector('#creer-equipe');

  // (Re)set initial scale of logo
  button.setAttribute('style', 'transform :scale(1);');

  // Animate  and make shrink on click
  /*anime({
    targets: '#creer-equipe',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });*/

  // Add click listener
  button.addEventListener('click', () => {
    anime({
        targets: '#logo-hyblab',
        scale: 0
      });
    swiper.slideNext()
  });

};