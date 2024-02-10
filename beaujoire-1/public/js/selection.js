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
