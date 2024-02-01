"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function () {
  $(document).ready(function () {
    setTimeout(replaceGif, 2000)
  });

};

function replaceGif(){
  const gif = document.getElementById('anim-40');
  const img = document.getElementById('img-40');
  img.style.display = "block"
  gif.style.display = "none";
}