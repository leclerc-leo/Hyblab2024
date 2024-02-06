"use strict";

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => {
    //Vérifie si le cookie first anim pour savoir si l'animation doit se jouer
    if(window.sessionStorage.getItem("first-anim") != "faux"){
        anime({
            delay: 7000,
            targets: '#accueil',
            opacity: '0',
            'z-index' : -1,
            easing: 'easeOutQuad',
        });
    }
    //Conséquence de si l'animation a déjà été lancé
    else{
        document.querySelector("#accueil").style.visibility = "hidden";
        document.querySelector("#tuto").style.visibility = "hidden";
    }
}, 100);

// Fermer l'accueil
document.querySelector("#accueil").addEventListener("click", function(event) {
    document.querySelector("#accueil").style.visibility = "hidden";
});

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
    slidesPerView: 1,
    centeredSlides: true,
    loop: "true",
    speed: 1000
});

// Fonction permettant de remettre tous les quartiers en gris
function resetMapColor() {
    document.querySelectorAll(".shadow_map").forEach(function(path) {
        path.style.fill = "#EDBDBF";
    });
    document.querySelectorAll(".quartier_map").forEach(function(path) {
        path.style.fill = "#FFFFFF";
    });
}

// On actualise la couleur du quartier sélectionné
swiper.on("slideChange", function () {
    resetMapColor();
    document.querySelector('path[data-no_slide_shadow="' + swiper.realIndex + '"]').style.fill = "#AA2E33";
    document.querySelector('path[data-no_slide="' + swiper.realIndex + '"]').style.fill = "#D74F50";
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
    sessionStorage.setItem("quartier", document.querySelector('path[data-no_slide="' + swiper.realIndex + '"]').id);
    window.location.href = "/quartiers-1/quartiers";
});

