document.addEventListener("DOMContentLoaded", function () {
  // R�cup�rez les �l�ments du premier carrousel
  const closePopupButton = document.getElementById("close-popup");
  const confirmSelectionButton = document.getElementById("confirm-selection");
  const popupOverlay = document.getElementById("popup-overlay");
  const slides = document.querySelectorAll(".item");
  const navigationButtons = document.querySelectorAll(".button-container .button");

  let current = 0; // Index actuel du slide
  let selectedImageIndex = null; // Index de l'image s�lectionn�e

  // R�cup�rez les �l�ments du deuxi�me carrousel
  const secondPopupOverlay = document.getElementById("second-popup-overlay");
  const secondSlides = document.querySelectorAll(".second-item");
  let currentSecond = 0; // Index actuel pour le second carrousel
  let selectedSecondImageIndex = null; // Pour stocker l'indice de l'image s�lectionn�e du second carrousel
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

  // Fonction pour mettre �  jour le premier carrousel
  const updateCarousel = (index) => {
    // Supprime les classes 'active', 'prev' et 'next' de tous les �l�ments de la liste 'slides'
    slides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev", "next");
    });

    current = index; // Met �  jour l'index actuel

    // Calcule l'indice pr�c�dent et suivant en fonction de l'index actuel
    let prevIndex = current - 1 < 0 ? slides.length - 1 : current - 1;
    let nextIndex = current + 1 >= slides.length ? 0 : current + 1;

    // Ajoute la classe 'active' �  l'�l�ment actuel, 'prev' �  l'�l�ment pr�c�dent et 'next' �  l'�l�ment suivant
    slides[current].classList.add("active");
    slides[prevIndex].classList.add("prev");
    slides[nextIndex].classList.add("next");

    // Modifiez les valeurs de 'prev' et 'next' en fonction de votre logique
    prev = current - 1 < 0 ? slides.length - 1 : current - 1;
    next = current + 1 >= slides.length ? 0 : current + 1;
  };

  // Fonctions pour aller au slide pr�c�dent ou suivant du premier carrousel
  const gotoPrev = () => updateCarousel(current > 0 ? current - 1 : slides.length - 1);
  const gotoNext = () => updateCarousel(current < slides.length - 1 ? current + 1 : 0);

  showPopup();
  //closePopupButton.addEventListener('click', hidePopup);
  navigationButtons.forEach((button, index) => {
    button.addEventListener("click", index === 0 ? gotoPrev : gotoNext);
  });

  // Ajoutez un �couteur d'�v�nements �  chaque image du premier carrousel pour la s�lectionner lorsque cliqu�e
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === current) {
        // Seulement si l'image est le slide actif
        slides.forEach((s) => s.classList.remove("selected")); // D�s�lectionner les autres
        slide.classList.add("selected"); // S�lectionner le slide cliqu�
        selectedImageIndex = index; // Mettre �  jour l'index s�lectionn�
      }
    });
  });

  // Ajoutez un �couteur d'�v�nements �  chaque image du premier carrousel pour la s�lectionner lorsque cliqu�e
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === current) {
        // Seulement si l'image est le slide actif
        slides.forEach((s) => s.classList.remove("selected")); // D�s�lectionner les autres
        slide.classList.add("selected"); // S�lectionner le slide cliqu�
        selectedImageIndex = index; // Mettre �  jour l'index s�lectionn�
      }
    });
  });

  // Attacher l'�v�nement 'click' au bouton de validation du premier carrousel pour ouvrir le deuxi�me carrousel
  confirmSelectionButton.addEventListener("click", function () {
    if (selectedImageIndex !== null) {
      console.log("L�utilisateur a s�lectionn� l�image num�ro:", selectedImageIndex);
      hidePopup();
      showSecondPopup();
    } else {
      alert("Veuillez s�lectionner une image.");
    }
    localStorage.setItem("selectedMaillot", slides[selectedImageIndex].querySelector("img").src);
  });

  //    Fonctions du second carrousel

  // Fonction pour afficher le popup du deuxi�me carrousel
  function showSecondPopup() {
    var popupText1 = document.getElementById("second-popup-text");
    popupText1.innerHTML = "CHOISIS TON <br /><span class='maillot-text'>BLASON</span>";

    secondPopupOverlay.style.display = "block";
    updateSecondCarousel(currentSecond);
  }

  // Fonction pour cacher le popup du deuxi�me carrousel
  function hideSecondPopup() {
    secondPopupOverlay.style.display = "none";
  }

  // Fonction pour mettre �  jour le deuxi�me carrousel
  const updateSecondCarousel = (index) => {
    secondSlides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev", "next");
    });

    currentSecond = index; // Utiliser currentSecond pour le deuxi�me carrousel

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

  // Ajoutez un �couteur d'�v�nements �  chaque image du deuxi�me carrousel pour la s�lectionner lorsque cliqu�e
  secondSlides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (index === currentSecond) {
        // Seulement si l'image est le slide actif
        secondSlides.forEach((s) => s.classList.remove("selected")); // D�s�lectionner les autres
        slide.classList.add("selected"); // S�lectionner le slide cliqu�
        selectedSecondImageIndex = index; // Mettre �  jour l'index s�lectionn�
        localStorage.setItem("selectedBlason", secondSlides[selectedSecondImageIndex].querySelector("img").src);
        console.log("selectedBlason :", localStorage.getItem("selectedBlason"));
      }
    });
  });
});
