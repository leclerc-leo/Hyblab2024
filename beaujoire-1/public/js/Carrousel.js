document.addEventListener("DOMContentLoaded", function () {
  // RÈcupÈrez les ÈlÈments du premier carrousel
  const closePopupButton = document.getElementById("close-popup");
  const confirmSelectionButton = document.getElementById("confirm-selection");
  const popupOverlay = document.getElementById("popup-overlay");
  const slides = document.querySelectorAll(".item");
  const navigationButtons = document.querySelectorAll(".button-container .button");

  let current = 0; // Index actuel du slide
  let selectedImageIndex = null; // Index de l'image sÈlectionnÈe

  // RÈcupÈrez les ÈlÈments du deuxiËme carrousel
  const secondPopupOverlay = document.getElementById("second-popup-overlay");
  const secondSlides = document.querySelectorAll(".second-item");
  let currentSecond = 0; // Index actuel pour le second carrousel
  let selectedSecondImageIndex = null; // Pour stocker l'indice de l'image sÈlectionnÈe du second carrousel
  const navigationButtons1 = document.querySelectorAll(".button-container1 .button");

  // Fonction pour afficher le popup du premier carrousel
  function showPopup() {
    var popupText = document.getElementById("popup-text");
    popupText.innerHTML = "CHOISIS TON <br /><span class='maillot-text'>MAILLOT</span>";

    popupOverlay.style.display = "block";
    updateCarousel(current);
  }

  // Fonction pour cacher le popup du premier carrousel
  function hidePopup() {
    popupOverlay.style.display = "none";
  }

  // Fonction pour mettre ù  jour le premier carrousel
  const updateCarousel = (index) => {
    // Supprime les classes 'active', 'prev' et 'next' de tous les ÈlÈments de la liste 'slides'
    slides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev", "next");
    });

    current = index; // Met ù  jour l'index actuel

    // Calcule l'indice prÈcÈdent et suivant en fonction de l'index actuel
    let prevIndex = current - 1 < 0 ? slides.length - 1 : current - 1;
    let nextIndex = current + 1 >= slides.length ? 0 : current + 1;

    // Ajoute la classe 'active' ù  l'ÈlÈment actuel, 'prev' ù  l'ÈlÈment prÈcÈdent et 'next' ù  l'ÈlÈment suivant
    slides[current].classList.add("active");
    slides[prevIndex].classList.add("prev");
    slides[nextIndex].classList.add("next");

    // Modifiez les valeurs de 'prev' et 'next' en fonction de votre logique
    prev = current - 1 < 0 ? slides.length - 1 : current - 1;
    next = current + 1 >= slides.length ? 0 : current + 1;
  };

  // Fonctions pour aller au slide prÈcÈdent ou suivant du premier carrousel
  const gotoPrev = () => updateCarousel(current > 0 ? current - 1 : slides.length - 1);
  const gotoNext = () => updateCarousel(current < slides.length - 1 ? current + 1 : 0);

  showPopup();
  //closePopupButton.addEventListener('click', hidePopup);
  navigationButtons.forEach((button, index) => {
    button.addEventListener("click", index === 0 ? gotoPrev : gotoNext);
  });

  // Ajoutez un Ècouteur d'ÈvÈnements ù  chaque image du premier carrousel pour la sÈlectionner lorsque cliquÈe
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === current) {
        // Seulement si l'image est le slide actif
        slides.forEach((s) => s.classList.remove("selected")); // DÈsÈlectionner les autres
        slide.classList.add("selected"); // SÈlectionner le slide cliquÈ
        selectedImageIndex = index; // Mettre ù  jour l'index sÈlectionnÈ
      }
    });
  });

  // Ajoutez un Ècouteur d'ÈvÈnements ù  chaque image du premier carrousel pour la sÈlectionner lorsque cliquÈe
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === current) {
        // Seulement si l'image est le slide actif
        slides.forEach((s) => s.classList.remove("selected")); // DÈsÈlectionner les autres
        slide.classList.add("selected"); // SÈlectionner le slide cliquÈ
        selectedImageIndex = index; // Mettre ù  jour l'index sÈlectionnÈ
      }
    });
  });

  // Attacher l'ÈvÈnement 'click' au bouton de validation du premier carrousel pour ouvrir le deuxiËme carrousel
  confirmSelectionButton.addEventListener("click", function () {
    if (selectedImageIndex !== null) {
      console.log("Líutilisateur a sÈlectionnÈ líimage numÈro:", selectedImageIndex);
      hidePopup();
      showSecondPopup();
    } else {
      alert("Veuillez sÈlectionner une image.");
    }
    localStorage.setItem("selectedMaillot", slides[selectedImageIndex].querySelector("img").src);
  });

  //    Fonctions du second carrousel

  // Fonction pour afficher le popup du deuxiËme carrousel
  function showSecondPopup() {
    var popupText1 = document.getElementById("second-popup-text");
    popupText1.innerHTML = "CHOISIS TON <br /><span class='maillot-text'>BLASON</span>";

    secondPopupOverlay.style.display = "block";
    updateSecondCarousel(currentSecond);
  }

  // Fonction pour cacher le popup du deuxiËme carrousel
  function hideSecondPopup() {
    secondPopupOverlay.style.display = "none";
  }

  // Fonction pour mettre ù  jour le deuxiËme carrousel
  const updateSecondCarousel = (index) => {
    secondSlides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev", "next");
    });

    currentSecond = index; // Utiliser currentSecond pour le deuxiËme carrousel

    let prevIndex = currentSecond - 1 < 0 ? secondSlides.length - 1 : currentSecond - 1;
    let nextIndex = currentSecond + 1 >= secondSlides.length ? 0 : currentSecond + 1;

    secondSlides[currentSecond].classList.add("active");
    secondSlides[prevIndex].classList.add("prev");
    secondSlides[nextIndex].classList.add("next");

    prev1 = currentSecond - 1 < 0 ? secondSlides.length - 1 : currentSecond - 1;
    next1 = currentSecond + 1 >= secondSlides.length ? 0 : currentSecond + 1;
  };
  const gotoPrev1 = () => updateSecondCarousel(currentSecond > 0 ? currentSecond - 1 : secondSlides.length - 1);
  const gotoNext1 = () => updateSecondCarousel(currentSecond < secondSlides.length - 1 ? currentSecond + 1 : 0);
  secondPopupOverlay.addEventListener("click", showSecondPopup);
  navigationButtons1.forEach((button, index) => {
    button.addEventListener("click", index === 0 ? gotoPrev1 : gotoNext1);
  });

  // Ajoutez un Ècouteur d'ÈvÈnements ù  chaque image du deuxiËme carrousel pour la sÈlectionner lorsque cliquÈe
  secondSlides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === currentSecond) {
        // Seulement si l'image est le slide actif
        secondSlides.forEach((s) => s.classList.remove("selected")); // DÈsÈlectionner les autres
        slide.classList.add("selected"); // SÈlectionner le slide cliquÈ
        selectedSecondImageIndex = index; // Mettre ù  jour l'index sÈlectionnÈ
        localStorage.setItem("selectedBlason", secondSlides[selectedSecondImageIndex].querySelector("img").src);
        console.log("selectedBlason :", localStorage.getItem("selectedBlason"));
      }
    });
  });
});
