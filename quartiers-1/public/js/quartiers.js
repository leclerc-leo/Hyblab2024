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

// Fonction qui fait défiler l'image de fond en fonction du thème choisit
function backgroundTransition() {
    const container = document.querySelector(".background-container");
    const old_img = document.querySelector(".background-container img, #background-animation");

    if (old_img.nodeName === "DIV") {
        old_img.classList.add("animated_background_out");
    } else {
        old_img.classList.add("out");

    }

    const new_img = document.createElement("img");
    new_img.src = "img/backgrounds/" + quartier.toLocaleLowerCase() + "/" + topic + "." + extension;
    container.appendChild(new_img);

    const guide_fixe = document.querySelector("#guide-coucou");
    const guide_walk = document.querySelector("#guide-walk");
    guide_fixe.classList.add("empty");
    guide_walk.classList.remove("empty");
    guide_walk_animation.stop();
    guide_walk_animation.play();

    setTimeout(function() {
        old_img.remove();
        guide_walk.classList.add("empty");
        guide_fixe.classList.remove("empty");
        guide_walk_animation.stop();
    }, 2000);
}

// Fonction qui fait défiler le titre en fonction du thème choisit
function titleTransition() {
    const container = document.querySelector("#guide-chemin");
    const old_title = document.querySelector("#guide-chemin h1");

    old_title.classList.remove("title-in");
    old_title.classList.add("title-out");

    const new_title = document.createElement("h1");
    new_title.innerHTML = topic_dico[topic];
    new_title.classList.add("topic-title");
    new_title.classList.add("title-in");
    container.appendChild(new_title);

    setTimeout(function() {
        old_title.remove();
    }, 2000);
}