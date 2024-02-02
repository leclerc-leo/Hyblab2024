"use strict";

// Just animate the logo
const initSlide3 = async function(){
  const porteur = document.querySelector("#nom_porteur");
  const redac1 = document.querySelector("#redac1");
  const redac2 = document.querySelector("#redac2");
  const graph1 = document.querySelector("#graph1");
  const graph2 = document.querySelector("#graph2");
  const prod1 = document.querySelector("#prod1");
  const prod2 = document.querySelector("#prod2");
  const prod3 = document.querySelector("#prod3");
  const prod4 = document.querySelector("#prod4");
  const prod5 = document.querySelector("#prod5");
  const prod6 = document.querySelector("#prod6");

  let response = await fetch("data/third-slide.json");
  const data = await response.json();

  porteur.innerHTML = data.porteur;
  redac1.innerHTML = data.redac1;
  redac2.innerHTML = data.redac2;
  graph1.innerHTML = data.graph1;
  graph2.innerHTML = data.graph2;
  prod1.innerHTML = data.prod1;
  prod2.innerHTML = data.prod2;
  prod3.innerHTML = data.prod3;
  prod4.innerHTML = data.prod4;
  prod5.innerHTML = data.prod5;
  prod6.innerHTML = data.prod6;
  
};