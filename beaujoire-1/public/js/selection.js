document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  document.querySelector("#settings").addEventListener("click", () => {
    const menu = document.querySelector(".dropdown");
    if (
      menu.style.animationName === "dropDownAnimation" ||
      menu.style.animationName === ""
    ) {
      menu.style.animationName = "dropUpAnimation";
    } else {
      menu.style.animationName = "dropDownAnimation";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Votre code Swiper existant ici

  var heartButtons = document.querySelectorAll('.heart-button');

  // Fonction pour désactiver tous les cœurs
  function deactivateAllHearts() {
    heartButtons.forEach(function(button) {
      button.style.color = 'black';
    });
  }

  // Ajoutez un écouteur d'événements pour tous les boutons cœur
  heartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Désactiver tous les cœurs
      deactivateAllHearts();
      // Activer le cœur cliqué
      this.style.color = 'yellow';
    });
  });
});