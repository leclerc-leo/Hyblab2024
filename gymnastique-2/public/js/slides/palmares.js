"use strict";
document.querySelectorAll('.card-container').forEach(card_container =>{
    card_container.addEventListener("click",()=>{
        if(card_container.childElementCount>1){
            card_container.children[1].classList.toggle("flipcard");
            const img_gif = card_container.children[0];
            img_gif.classList.contains("hidden") ?
                setTimeout(()=>{img_gif.classList.toggle("hidden");},1000) : img_gif.classList.toggle("hidden");
        }else {
            card_container.children[0].classList.toggle("flipcard");
        }
    });
})