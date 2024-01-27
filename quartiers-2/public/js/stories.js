"use strict";

const homeStories = function () {
    // on cache le slider au chargement de la page
    document.querySelector('#mySwiper').style.display = 'none';

    // Init of the (touch friendly) Swiper slider
    const swiper = new Swiper("#mySwiper", {
      direction: "horizontal",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoHeight: true,
      allowTouchMove: false, // a mettre en false quand on aura fini de coder pour eviter de swiper
      loop: true // pour swiper en boucle
    });

    /* Fonction executée à chaque slide qui permet de changer le contenu de la slide */
    swiper.on("slideChange", function () {
      // on récupère les boutons previous et next
      let next = document.querySelectorAll('.next');
      let previous = document.querySelectorAll('.previous');

      next.forEach(button => {
        button.addEventListener('click', () => {
          swiper.slideNext();
          document.querySelector('.content').scrollIntoView();
        });
      })
      previous.forEach(button => {
        button.addEventListener('click', () => {
          swiper.slidePrev();
          document.querySelector('.content').scrollIntoView();
        });
      })

      switch (swiper.realIndex) {
        case 0:
          console.log('slide 1');
          break;
        case 1:
          console.log('slide 2');
          break;
        case 2:
          console.log('slide 3');
          break;
      }
    });

    let stories = document.querySelectorAll(".story");
    let swiper_slides = document.querySelectorAll(".swiper-slide");

    // Pour chaque story, on va chercher le contenu de la slide correspondante et ajouter un event listener
    for (let i = 1; i <= stories.length; i++) {
      let slideIndex = i - 1;

      let story = stories[slideIndex]
      let address = "/quartiers-2/story" + i + ".html";

      // on remplit la slide avec le fetch
      fetch(address)
        .then(response => response.text())
        .then(data => {
            swiper_slides[slideIndex].innerHTML = data;
          }
        );

      // On ajoute les event listeners sur les stories pour afficher le slider
      story.addEventListener('click', () => {
        // on met la bonne slide active
        swiper.slideTo(swiper.realIndex, 0);

        // on cache les stories
        stories.forEach(story => {
          story.style.display = 'none';
        });

        // on affiche le swiper
        document.querySelector('#mySwiper').style.display = 'block';
        document.querySelector('.content').scrollIntoView();

      });
    }

    // on récupère la fleche de retour
    let retour = document.querySelector('#back_button');

    // La fleche retour a deux comportements différents selon si le swiper est affiché ou non
    retour.addEventListener('click', () => {
      // si le swiper n'est pas affiché alors on retourne à l'accueil
      if (document.querySelector('#mySwiper').style.display === 'none') {
        fetch('/quartiers-2/index.html')
          .then(res => res.text())
          .then(html => {
            document.querySelector('body').innerHTML = html;
            // on récupère la motion et on l'enlève
            document.querySelector('#motion').style.display = 'none';
            // on init l'accueil
            initAccueil();
          });
      }
      // on reaffiche les stories
      stories.forEach(story => {
        story.style.display = 'block';
      });
      document.querySelector('#mySwiper').style.display = 'none';
      // on remet l'utilisateur en haut de la page
    });
  };
