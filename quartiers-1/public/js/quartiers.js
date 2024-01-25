"use strict";

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
    // fade out the loader "slide"
    // and send it to the back (z-index = -1)
    anime({
        delay: 100,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
}, 100);

const swiper_horizontal = new Swiper(".swiper-horizontal", {
    direction: "horizontal",
    allowTouchMove: true
});

const sections = document.querySelectorAll(".quartier");
sections.forEach(function(section) {
    const swiper = section.querySelector(".swiper-vertical");
    const swiper_vertical = new Swiper(swiper, {
        direction: "vertical",
        allowTouchMove: false
    });

    const next_button = section.querySelector(".more-info");
    next_button.addEventListener("click", function() {
        swiper_vertical.slideNext();
    });

    const prev_button = section.querySelector(".back-to-home");
    prev_button.addEventListener("click", function() {
        swiper_vertical.slidePrev();
    });
});

const map_button = document.querySelector(".go-to-map");
    map_button.addEventListener("click", function() {
        swiper_vertical.slideNext();
    });