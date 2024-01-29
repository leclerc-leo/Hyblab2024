"use strict";

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
    anime({
        delay: 100,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
}, 100);

// Fermer le tuto
document.querySelector("#tuto").addEventListener("click", function(event) {
    document.querySelector("#tuto").style.visibility = "hidden";
});

// Ouvrir le tuto
document.querySelector("#tuto-open").addEventListener("click", function() {
    document.querySelector("#tuto").style.visibility = "visible";
});

// Création du swiper
const swiper = new Swiper("#quartiers-swiper", {
    direction: "horizontal",
    spaceBetween: 0,
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: "true",
    speed: 1000
});

// Fonction permettant de remettre tous les quartiers en gris
function resetMapColor() {
    document.querySelectorAll("#rennes_map path").forEach(function(path) {
        path.style.fill = "#D9D9D9";
    });
}

// On actualise la couleur du quartier sélectionné
swiper.on("slideChange", function () {
    resetMapColor();
    document.querySelector('path[data-no_slide="' + swiper.realIndex + '"]').style.fill = "#E35D5D";
});


// Ajout des events listener sur les quartiers pour atteindre un quartier
document.querySelectorAll("#rennes_map path").forEach(function(path) {
    path.addEventListener("click", function(event) {
        swiper.slideToLoop(event.target.dataset.no_slide);
        console.log("go to slide " + event.target.id + " (" + event.target.dataset.no_slide + ")");
    });
});

// Ajout des events listener sur les boutons de swipe
document.querySelector("#previous").addEventListener("click", function() {
    swiper.slidePrev();
});
document.querySelector("#next").addEventListener("click", function() {
    swiper.slideNext();
});

// Bouton voir le quartier
document.querySelector("#see-quartier").addEventListener("click", function() {
    console.log("Go to" + swiper.realIndex);
    window.location.href = "/quartiers-1/quartiers";
});
