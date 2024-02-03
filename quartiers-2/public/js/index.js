"use strict";

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 6500,
    targets: '#motion',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initAccueil();
}, 0);