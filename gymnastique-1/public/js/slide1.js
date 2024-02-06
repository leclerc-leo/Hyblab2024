"use strict";
const showPopup = (name,objID) => {
  const popup = document.getElementById(name);
  popup.style.display = "block";
  setTimeout(() => {
    popup.classList.add("show");
  }, 20);
  document.getElementById(objID).classList.add("clicked");
  const svgElements = document.getElementsByTagName('svg');
  for(let i = 0; i < svgElements.length; i++) {
    svgElements[i].classList.add("blured");
    svgElements[i].style.transition = "filter 0.5s";
  }
};

const closePopup = (name) => {
  const popup = document.getElementById(name);
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
  }, 20);
  const svgElements = document.getElementsByTagName('svg');
  for(let i = 0; i < svgElements.length; i++) {
    svgElements[i].classList.remove("blured");
    svgElements[i].style.transition = "filter 0.5s";
  }
};

const clickOutsidePopup = (name, event) => {
  let popup = document.getElementById(name);
  if (!popup.contains(event.target) && popup.classList.contains("show")) {
    closePopup(name);
  }
};

const initSlide2 = async function (popupId, objectId) {
  document.getElementById(objectId).addEventListener("click", (evt) => { showPopup(popupId,objectId); });

  try {
    const response = await fetch("data/obj.json");
    const data = await response.json();

    const objData = data[objectId]; // Récupérer les données de l'objet correspondant

    const title = document.querySelector(`#${popupId} #title-obj`);
    const text = document.querySelector(`#${popupId} #text-obj`);
    const img = document.querySelector(`#${popupId} #img-obj`);

    title.textContent = objData.title || " PAS DE TITRE ";
    text.textContent = objData.text || " PAS DE TEXTE ";
    img.src = objData.image || " PAS D'IMAGE ";

  } catch (error) {
    console.error("ERREUR JSON :", error);
  }

  document.querySelector(`#${popupId} #close`).addEventListener("click", (evt) => { closePopup(popupId) });
  document.addEventListener("click", (evt) => { clickOutsidePopup(popupId, evt) });
};

// Utilisation de la fonction initSlide2 pour chaque objet dans le JSON
initSlide2("popup_manique", "manique");
initSlide2("popup_cupcake", "cupcake");
initSlide2("popup_coupe", "coupe");
initSlide2("popup_gourde", "gourde");
initSlide2("popup_algerie", "algerie");
initSlide2("popup_medaille", "medaille");
initSlide2("popup_photo", "photo");
initSlide2("popup_tel", "tel");
