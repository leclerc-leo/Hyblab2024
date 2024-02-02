"use strict";
const showPopup = (name) => {
  const popup = document.getElementById(name);
  popup.style.display = "block";
  setTimeout(() => {
    popup.classList.add("show");
  }, 20);
};

const closePopup = (name) => {
  const popup = document.getElementById(name);
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
  }, 20);
};

const clickOutsidePopup = (name, event) => {
  const popup = document.getElementById(name);
  if (!popup.contains(event.target) && popup.classList.contains("show")) {
    closePopup(name);
  }
};

const initSlide2 = async function () {
  document.getElementById("algerie").addEventListener("click", (evt) =>{showPopup("popup_algerie");});

  try {
    const response = await fetch("data/obj.json");
    const data = await response.json();

    const title = document.querySelector("#title-obj");
    const text = document.querySelector("#text-obj");
    const img = document.querySelector("#img-obj");

    title.textContent = data.title || " PAS DE TITRE ";
    text.textContent = data.text || " PAS DE TEXTE ";

    img.setAttribute("src", data.picture);

  } catch (error) {
    console.error("ERREUR JSON :", error);
  }

  document.querySelector("#close").addEventListener("click", (evt) =>{closePopup("popup_algerie")});
  document.addEventListener("click",(evt) =>{ clickOutsidePopup("popup_algerie", evt)});
}; 