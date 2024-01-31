"use strict";

// async init function (because of the awaits on fetches)
const initSlideIntro = async function () {
  const titre = document.querySelector("#titre");
  const texte1 = document.querySelector("#texte1");
  const down_arrow = document.querySelector("#down-arrow");
  const bag = document.querySelector("#bag");


  // get the data from our data/first-slide.json file
  let response = await fetch("data/first-slide.json");
  const data = await response.json();

  // set the title
  titre.innerHTML = data.title;

  // set the text
  texte1.innerHTML = data.texte1;

  anime({
    targets: down_arrow,
    translateY: 20,
    direction: "alternate",
    loop: true,
    easing: "easeInOutQuad",
  });
  anime({
    targets: bag,
    width: "75%",
    top: "70%",
    easing: "easeInOutQuad",
    duration: 300,
  });
  
};
