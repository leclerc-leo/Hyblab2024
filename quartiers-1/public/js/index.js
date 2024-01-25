"use strict";

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
    anime({
        delay: 200,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
}, 200);

// Création du swiper
const swiper = new Swiper("#quartiers-swiper", {
    direction: "horizontal",
    loop: "true",
    speed: 1000
});

// Fonction permettant de remettre tous les quartiers en gris
function resetMapColor() {
    document.querySelectorAll("#rennes_map path").forEach(function(path) {
        path.style.fill = "#D9D9D9";
    });
}

// Ajout des events listener sur les quartiers pour atteindre un quartier
document.querySelectorAll("#rennes_map path").forEach(function(path) {
    path.addEventListener("click", function(event) {
        swiper.slideToLoop(event.target.dataset.no_slide);
        console.log("go to slide " + event.target.id + " (" + event.target.dataset.no_slide + ")");
    });
});

// Ajout des events listener sur les boutons de navigation
document.querySelector("#previous").addEventListener("click", function() {
    swiper.slidePrev();
});

document.querySelector("#next").addEventListener("click", function() {
    swiper.slideNext();
});

swiper.on("slideChange", function () {
    resetMapColor();
    document.querySelector('path[data-no_slide="' + swiper.realIndex + '"]').style.fill = "#E35D5D";
});
