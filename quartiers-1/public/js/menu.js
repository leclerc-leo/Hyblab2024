var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
  //Gère pour que l'animation de départ ne se relance pas si on lance le menu burger
  window.sessionStorage.setItem("first-anim","faux");
  console.log("coucou")

}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active"); 
}
