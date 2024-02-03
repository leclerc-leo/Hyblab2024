"use strict";

globalThis.nbreVotes = 12 ; 

/************* Archives *************/
function checkVotes() {
  var archivesButton = document.getElementById('archives');
  if (globalThis.nbreVotes === 12) {
    archivesButton.classList.remove("disabled");
    archivesButton.classList.add("enabled");
    archivesButton.href = "/beaujoire-2/archives";
  } else {
    archivesButton.classList.remove("enabled");
    archivesButton.classList.add("disabled");
    archivesButton.href = "javascript: void(0)";
  }
}
/************* Archives *************/

/************* Pop up  **************/

if (globalThis.nbreVotes === 12) {

window.addEventListener("load", function(){
  setTimeout(
      function open(event){
          document.querySelector(".popup").style.display = "block";
          document.getElementById('container').style.opacity = 0.7 ;
      },
      1000
  )
});

document.querySelector("#close").addEventListener("click", function(){
  document.querySelector(".popup").style.display = "none";
  document.getElementById('container').style.opacity = 1 ;
}); }

/************* Pop up  **************/



// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 0,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
}, 1000);

checkVotes();