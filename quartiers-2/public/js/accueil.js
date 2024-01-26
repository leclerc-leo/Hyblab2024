"use strict";

const initAccueil = function(){
  const decouvrir = document.querySelector('#bouton-decouvrir');
  decouvrir.setAttribute('style', 'transform :scale(1);');

  decouvrir.addEventListener('click', () => {
    anime({
      targets: '#bouton-decouvrir',
      scale: 1.3, // Faites grossir l'élément
      duration: 1200,
      opacity: 0, // Rendre l'élément transparent
      easing: 'easeInOutQuad', // Utilisez une fonction d'atténuation pour une animation plus agréable
      complete: function(anim) {
        fetch('/quartiers-2/stories.html')
          .then(res => res.text())
          .then(html => {
            document.querySelector('body').innerHTML = html;
            homeStories();
          });
      }
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