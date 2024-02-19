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

var animation = lottie.loadAnimation({ 
    container: document.getElementById('background-animation'), 
    renderer: 'svg', 
    loop: false, 
    autoplay: true, 
    path: 'animation/animation_villejean.json' 
});

// Ajout des event listener sur les boutons de thème du menu burger
document.querySelectorAll(".topicButton").forEach(button => {
    button.addEventListener("click", function(event) {
        sessionStorage.setItem("quartier", "villejean");
        sessionStorage.setItem("topic", event.target.dataset.topic);
        sessionStorage.removeItem("save");
        sessionStorage.removeItem("saveExist");


        window.location.href = "quartiers";
    });
});