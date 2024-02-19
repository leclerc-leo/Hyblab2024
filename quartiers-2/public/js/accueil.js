"use strict";

const initAccueil = function(){
  const loader = document.querySelector('#loader');
  loader.style.display = 'none';

  const decouvrir = document.querySelector('#bouton-decouvrir');
  decouvrir.setAttribute('style', 'transform :scale(1);');

  decouvrir.addEventListener('click', () => {
    anime({
      targets: '#bouton-decouvrir',
      scale: 1.3, // Faites grossir l'élément
      duration: 2000,
      opacity: 0, // Rendre l'élément transparent
      easing: 'easeInOutQuad', // Utilisez une fonction d'atténuation pour une animation plus agréable
      complete: function(anim) {
        fetch('stories.html')
          .then(res => res.text())
          .then(html => {
            loader.style.display = 'block';

            // on rajoute a notre container le body de la page credits
            let container = document.querySelector('#container');

            container.innerHTML = html;

            setTimeout(() => {
              anime({
                  delay: 700,
                  targets: '#loader',
                  opacity: '0',
                  'z-index' : -1,
                  easing: 'easeInOutQuad',
              });
            }, 700);

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