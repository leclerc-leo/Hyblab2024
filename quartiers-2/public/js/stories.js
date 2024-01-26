"use strict";

// Just animate the logo
const homeStories = function(){
  // on cache le slider au chargement de la page
  document.querySelector('#mySwiper').style.display = 'none';

  // Init of the (touch friendly) Swiper slider
  const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    //effects : 'cards',
  });

  swiper.on("slideChange", function () {
    switch( swiper.activeIndex ) {
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

  // Get img element
  let stories = document.querySelectorAll(".story");
  let swiper_slides = document.querySelectorAll(".swiper-slide");

  // Pour chaque story on va chercher le contenu de la slide correspondante et ajouter un event listener
  for(let i = 1; i <= stories.length; i++) {
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
          swiper.slideTo(slideIndex, 0);

          console.log('slide ' + slideIndex + ' active');

          // on affiche le swiper
          document.querySelector('#mySwiper').style.display = 'block';
        });

  }


};