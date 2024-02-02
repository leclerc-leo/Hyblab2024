"use strict";

// ---------- Initialisation des boutons de réponse ----------
function changeState(imageId, yesButtons, noButtons) {
      // on a cliqué sur le bouton non
      if (imageId.slice(0, 3) === 'yes') {
        let yesSvg = yesButtons[imageId.slice(-1) - 1].firstChild;
        // on change la couleur dans le style du svg de "cls-2"
        let elemBgColor_svg = yesSvg.contentDocument.querySelector('#bg-color');
        elemBgColor_svg.classList.remove("vert");
        elemBgColor_svg.classList.add("gris");

        // on met le bouton non en rose
        let noImage = noButtons[imageId.slice(-1) - 1].firstChild
        elemBgColor_svg = noImage.contentDocument.querySelector('#bg-color');
        elemBgColor_svg.classList.remove("gris");
        elemBgColor_svg.classList.add("rose");

        // on enlève dans le localStorage le bouton oui
        localStorage.removeItem('yes' + imageId.slice(-1));
      }
      // on a cliqué sur le bouton oui
      else {
        let noImage = noButtons[imageId.slice(-1) - 1].firstChild;
        let elemBgColor_svg = noImage.contentDocument.querySelector('#bg-color');
        elemBgColor_svg.classList.remove("rose");
        elemBgColor_svg.classList.add("gris");

        // on met le bouton oui en vert
        let yesImage = yesButtons[imageId.slice(-1) - 1].firstChild
        elemBgColor_svg = yesImage.contentDocument.querySelector('#bg-color');
        elemBgColor_svg.classList.remove("gris");
        elemBgColor_svg.classList.add("vert");

        // on enlève dans le localStorage le bouton non
        localStorage.removeItem('no' + imageId.slice(-1));
      }
}

const homeStories = function () {
    anime({
    targets: '#swipe_invite_right',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
  anime({
    targets: '#swipe_invite_left',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

  let swipe_invite_right = document.querySelector('#swipe_invite_right');
  let swipe_invite_left = document.querySelector('#swipe_invite_left');
  swipe_invite_left.style.opacity = '0';

  let loader = document.querySelector('#loader');
  loader.style.opacity = '1';

  /* Premier slider pour choisir quel story cliquer */
  // Init of the (touch friendly) Swiper slider
    const swiperHomeStories = new Swiper("#swiperHomeStories", {
      direction: "horizontal",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoHeight: true,
      allowTouchMove: true, // à mettre en false quand on aura fini de coder pour eviter de swiper
    });

    swiperHomeStories.on("slideChange", function () {
      switch (swiperHomeStories.realIndex) {
        case 0:
          swipe_invite_left.style.opacity = '0';
          break;
        case 1:
          swipe_invite_left.style.display = 'block';
          swipe_invite_left.style.opacity = '1';
          swipe_invite_right.style.display = 'block';
          swipe_invite_right.style.opacity = '1';
          break;
        case 2:
          swipe_invite_right.style.opacity = '0';
          break;
      }
    });

    swipe_invite_right.addEventListener('click', () => {
        swiperHomeStories.slideNext();
    });
    swipe_invite_left.addEventListener('click', () => {
        swiperHomeStories.slidePrev();
    });

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


    // get recap button
    let recap = document.querySelector('#recap_button');
    recap.addEventListener('click', () => {
      fetch('/quartiers-2/recap.html')
        .then(res => res.text())
        .then(html => {
          document.querySelector('body').innerHTML = html;
        });
    });

    /* a factoriser */
    let credits = document.querySelector('footer');
    credits.addEventListener('click', () => {
      fetch('/quartiers-2/credits.html')
        .then(res => res.text())
        .then(html => {
          loader.style.display = 'block';
          loader.style.opacity = '1';
          loader.style.zIndex = '3000';

          // on rajoute a notre container le body de la page credits
          let container = document.querySelector('#container');

          container.innerHTML = html;

          setTimeout(() => {
            anime({
                delay: 800,
                targets: '#loader',
                opacity: '0',
                'z-index' : -1,
            });
          }, 800);

          // on enlève le loader
          let retour = document.querySelector('#back_button');
          retour.addEventListener('click', () => {
            fetch('/quartiers-2/stories.html')
              .then(res => res.text())
              .then(html => {
                loader.style.opacity = '1';
                loader.style.display = 'block';


                // on rajoute a notre container le body de la page credits
                let container = document.querySelector('#container');

                container.innerHTML = html;

                // on attend 1 seconde
                setTimeout(() => {
                  anime({
                      delay: 300,
                      targets: '#loader',
                      opacity: '0',
                      'z-index' : -1,
                  });
                }, 300);
                // on init l'accueil
                homeStories();
              });
          });
        });
    });



    let stories = document.querySelectorAll(".story");
    let swiper_slides = document.querySelectorAll(".swiper-slide");
    // on récupère la deuxième moitié des slides
    swiper_slides = Array.prototype.slice.call(swiper_slides, swiper_slides.length - stories.length, swiper_slides.length);

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
        // on enleve le bouton recap
        recap.style.display = 'none';

        // on met le z-index du footer à 0
        document.querySelector('footer').style.zIndex = "0";

        // on cache invite_swipe left et right
        swipe_invite_left.style.display = 'none';
        swipe_invite_right.style.display = 'none';

        // on met la bonne slide active
        swiper.slideToLoop(slideIndex, 0, true);

        // on cache les stories
        stories.forEach(story => {
          story.style.display = 'none';
        });

        loader.style.display = 'block';
        loader.style.opacity = '1';
        loader.style.zIndex = '3000';

        // on rajoute a notre container le body de la page credits
        let container = document.querySelector('#container');

        setTimeout(() => {
          anime({
              delay: 400,
              targets: '#loader',
              opacity: '0',
              'z-index' : -1,
          });
        }, 400);


        // on affiche le swiper
        document.querySelector('#mySwiper').style.display = 'block';
        document.querySelector('.content').scrollIntoView();

        let yesImages = document.querySelectorAll('.yesButton');
        let noImages = document.querySelectorAll('.noButton');

        yesImages.forEach((image, index) => {
          image.firstChild.contentDocument.querySelector('#bg-color').style.transition = "all 0.2s ease-in-out";
          image.addEventListener('mousedown', function() {
              localStorage.setItem('yes' + (index + 1), 'yes');
              changeState('no' + (index + 1), yesImages, noImages);
            });
        });

        noImages.forEach((image, index) => {
          image.firstChild.contentDocument.querySelector('#bg-color').style.transition = "all 0.2s ease-in-out";
              image.addEventListener('mousedown', function() {
                  localStorage.setItem('no' + (index + 1), 'no');
                  changeState('yes' + (index + 1), yesImages, noImages);
              });
          });
      });
    }




    // on récupère la fleche de retour
    let retour = document.querySelector('#back_button');

    // La fleche retour a deux comportements différents selon si le swiper est affiché ou non
    retour.addEventListener('click', () => {
      // si le swiper n'est pas affiché alors, on retourne à l'accueil
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
      // on réaffiche le bouton recap
      recap.style.display = 'block';
      // on reaffiche les stories
      stories.forEach(story => {
        story.style.display = 'block';
      });
      document.querySelector('#mySwiper').style.display = 'none';
      // on remet le footer
      document.querySelector('footer').style.zIndex = "6";

      // on remet les boutons swipe
      swipe_invite_left.style.display = 'block';
      swipe_invite_right.style.display = 'block';
    });
  };
