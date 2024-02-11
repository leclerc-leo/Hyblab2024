"use strict";

let isPopupOpen = false;

// async init function (because of the awaits on fetches)
const initSlide2 = async function (popupId, objectId) {

  // TELEPHONE VIDEO QUIZZ
  const buttons = document.getElementsByClassName("btn_quiz")
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.addEventListener('click', selectAnswer);
  }
  function selectAnswer(e) {
    const selectedButton = e.target;
    boingOnClick(selectedButton);
    if (selectedButton.id == "answer") {
      selectedButton.classList.add('correct');
      setTimeout(() => {
        anime({ target: "#explication_quizz", display: "block", easing: "easeIn", duration: 200 });
        var phone_popup = document.getElementById("popup_tel");
        phone_popup.classList.remove("show");
        setTimeout(function () {
          phone_popup.style.display = "none";
        }, 300);
        var answer_popup = document.getElementById("popup_quizz_end");
        answer_popup.style.display = "block";
        setTimeout(function () {
          answer_popup.classList.add("show");
        }, 20);
      }, 100)
      //
      //console.log("DING ! Bonne réponse !!!");
    }
    else {
      selectedButton.classList.add('wrong');
      //console.log("mauvaise réponse");
    }
  }
  // Get logo element
  const bag = document.querySelector("#bag");
  const fleche = document.querySelector("#fleche");

  // (Re)set initial scale of logo

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

  document.querySelector("#billet_svg").addEventListener("click", function () {
    var popup = document.getElementById("popup-billet");
    popup.style.display = "block";
    setTimeout(function () {
      popup.classList.add("show");
    }, 20);
  });

  document
    .querySelector("#bouton-retour")
    .addEventListener("click", function () {
      var popup = document.getElementById("popup-billet");
      popup.classList.remove("show");
      setTimeout(function () {
        popup.style.display = "none";
      }, 300);
    });

  // Retrieve the partner's topic from our API
  let response = await fetch("data/ticket.json");
  const data1 = await response.json();
  document.getElementById("popup-title").innerHTML = data1.title;
  document.getElementById("popup-subtitle").innerHTML = data1.subtitle;
  document.getElementById("popup-text").innerHTML = data1.texte;

  document.getElementById(objectId).addEventListener("click", (evt) => {
    showPopup(popupId, objectId);
  });

  try {
    const response = await fetch("data/second-slide.json");
    const data = await response.json();

    const objData = data[objectId];
    const title = document.querySelector(`#${popupId} #title-obj`);
    const img = document.querySelector(`#${popupId} #img-obj`);
    const textContainer = document.querySelector(`#${popupId} #text-container`);
    
    title.textContent = objData.title || "PAS DE TITRE";
    img.src = objData.picture || "PAS D'IMAGE";
    textContainer.innerHTML = "";

    if (objData.text && Array.isArray(objData.text)) {
      objData.text.forEach((paragraphText, index) => {
        const paragraph = document.createElement("p");
        paragraph.classList.add("text-obj");
        paragraph.textContent = paragraphText;
        paragraph.setAttribute("id", `${objectId}-p${index}`);
        textContainer.appendChild(paragraph);
      });
    } else {
      const paragraph = document.createElement("p");
      paragraph.classList.add("text-obj");
      paragraph.textContent = objData.text || "PAS DE TEXTE";
      textContainer.appendChild(paragraph);
    }
    title.innerHTML = objData.title.split(" ").map((word, index, array) => {
      if (index === array.length - 1) {
        return `<span class="last-word-color">${word}</span>`;
      } else {
        return word;
      }
    }).join(" ");
    
  } catch (error) {
    console.error("ERREUR JSON :", error);
  }

  document
    .querySelector(`#${popupId} #close`)
    .addEventListener("click", (evt) => {
      closePopup(popupId);
    });
  document.addEventListener("click", (evt) => {
    clickOutsidePopup(popupId, evt);
  });

};
const showPopup = (name, objID) => {
  if (isPopupOpen) return;
  isPopupOpen = true;

  if (name != "popup_quizz_end") {
    const popup = document.getElementById(name);
    popup.style.display = "block";
    setTimeout(() => {
      popup.classList.add("show");
    }, 20);
    document.getElementById(objID).classList.add("clicked");
    const svgElements = document.getElementsByTagName("svg");
    for (let i = 0; i < svgElements.length; i++) {
      if (svgElements[i].id != "Video_Phone_contour_svg") {
        svgElements[i].classList.add("blured");
        svgElements[i].style.transition = "filter 0.5s";
      }
    }
  }
};

const closePopup = (name) => {
  isPopupOpen = false;
  const popup = document.getElementById(name);
  popup.classList.remove("show");
  setTimeout(() => {
    popup.style.display = "none";
  }, 20);
  const svgElements = document.getElementsByTagName("svg");
  for (let i = 0; i < svgElements.length; i++) {
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

// Utilisation de la fonction initSlide2 pour chaque objet dans le JSON
initSlide2("popup_manique", "manique");
initSlide2("popup_cupcake", "cupcake");
initSlide2("popup_coupe", "coupe");
initSlide2("popup_gourde", "gourde");
initSlide2("popup_algerie", "algerie");
initSlide2("popup_medaille", "medaille");
initSlide2("popup_photo", "photo");
initSlide2("popup_tel", "tel");
initSlide2("popup_quizz_end", "tel");
