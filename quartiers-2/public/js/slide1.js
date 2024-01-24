"use strict";

// async init function (because of the awaits on fetches)
const initAccueil = async function(){
  // Animate hyblab logo and make shrink on click
    // On récupère le bouton "découvrir"
  const decouvrir = document.querySelector('#bouton-decouvrir');
  decouvrir.setAttribute('style', 'transform :scale(1);');

  // si on clique dessus on passe à la page suivante
  decouvrir.addEventListener('click', () => {
      anime({
        targets: '#bouton-decouvrir',
        scale: 0
      });
    // on charge dans la page actuelle le contenu de la page suivante
    // en utilisant la méthode fetch
    fetch('/quartiers-2/stories.html')
      .then(res => res.text())
      .then(html => {
        // on remplace le contenu de la page actuelle par le contenu de la page suivante
        document.querySelector('body').innerHTML = html;
        // on lance l'animation de la page suivante
        initSlide2();
      });
    });

  anime({
    targets: '#bouton-decouvrir',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

};