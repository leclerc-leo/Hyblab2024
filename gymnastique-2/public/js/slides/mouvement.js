const pageMouvement = document.querySelector("#mouvement-container");
const boutonG = pageMouvement.querySelector("#mouvement-contenue-titre-buttonG");
const boutonD = pageMouvement.querySelector("#mouvement-contenue-titre-buttonD");
const titre = pageMouvement.querySelector("#mouvement-contenue-titre-texte");
const texte = pageMouvement.querySelector("#mouvement-contenue-texte");
function getActif(element) {
    const id = element.querySelector(".mouvActif").id.split("-");
    return parseInt(id[id.length-1]);
}
boutonG.addEventListener("click",()=>{
    const idActif = getActif(titre);
    boutonD.classList.remove("hidden");
    titre.querySelector(("#mouvement-contenue-titre-texte-"+idActif)).classList.replace("mouvActif","hidden");
    titre.querySelector(("#mouvement-contenue-titre-texte-"+(idActif-1))).classList.replace("hidden","mouvActif");
    texte.querySelector(("#mouvement-contenue-texte-"+idActif)).classList.replace("mouvActif","hidden");
    texte.querySelector(("#mouvement-contenue-texte-"+(idActif-1))).classList.replace("hidden","mouvActif");
    console.log(idActif);
    if(idActif-1===1){
        boutonG.classList.add("hidden");
    }
});
boutonD.addEventListener("click",()=>{
    const idActif = getActif(titre);
    boutonG.classList.remove("hidden");
    console.log(idActif);
    titre.querySelector(("#mouvement-contenue-titre-texte-"+idActif)).classList.replace("mouvActif","hidden");
    titre.querySelector(("#mouvement-contenue-titre-texte-"+(idActif+1))).classList.replace("hidden","mouvActif");
    texte.querySelector(("#mouvement-contenue-texte-"+idActif)).classList.replace("mouvActif","hidden");
    texte.querySelector(("#mouvement-contenue-texte-"+(idActif+1))).classList.replace("hidden","mouvActif");
    if(idActif+1===titre.childElementCount){
        boutonD.classList.add("hidden");
    }
});