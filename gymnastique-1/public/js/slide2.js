"use strict";

// async init function (because of the awaits on fetches)
const initSlide2 = async function () {
  // Get logo element
  const logo = document.querySelector("#logo-hyblab");
  const bag = document.querySelector("#bag");
  const fleche = document.querySelector("#fleche");

  // (Re)set initial scale of logo
  logo.setAttribute("style", "transform :scale(1);");

  function animateBag() {
    anime({
      targets: bag,
      width: "130%",
      top: "60%",
      easing: "easeInOutQuad",
      duration: 100,
    });
  }

  animateBag();

  // Animate hyblab logo and make shrink on click
  anime({
    targets: "#logo-hyblab",
    scale: 1.2,
    easing: "easeInOutQuad",
    direction: "alternate",
    loop: true,
  });

  anime({
    targets: fleche,
    translateY: [0, 25],
    direction: "alternate",
    loop: true,
    easing: "easeInOutQuad",
  });

  document.getElementById("logo-hyblab").addEventListener("click", function () {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(function () {
      popup.classList.add("show");
    }, 20);
  });

  document.querySelector("#bouton-retour").addEventListener("click", function () {
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  });

  // Retrieve the partner's topic from our API
  let response = await fetch("api/topic");
  const data1 = await response.json();

  // Get some dummy data
  response = await fetch("data/dummy.json");
  const data2 = await response.json();
};
