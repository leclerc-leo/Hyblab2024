const allcard = document.querySelectorAll('.card-container');
allcard.forEach(card_container =>{
    card_container.addEventListener("click",()=>{
        const promise = new  Promise((resolve,reject)=>{
            card_container.classList.remove("smaller");
            card_container.style.transform = "translate(0,0)";
            if(card_container.childElementCount>1){
                card_container.children[1].classList.toggle("flipcard");
                const img_gif = card_container.children[0];
                img_gif.classList.contains("hidden") ?
                    setTimeout(()=>{img_gif.classList.toggle("hidden");},1000) : img_gif.classList.toggle("hidden");
            }else {
                card_container.children[0].classList.toggle("flipcard");
            }
            resolve("ok")
        });
        promise.then(()=>{
            allcard.forEach(async (card) => {
                if(card_container.id == "card-mondiaux"){
                    if(card_container.children[1].classList.contains("flipcard")){
                        card_container.style.transform = "translate(0,-8vh)";
                    }
                    else{
                        card_container.style.transform = "translate(0,0)";
                    }
                }
            if(card != card_container){
                card.children[1].classList.remove("flipcard");
                const img_gif = card.children[0];
                img_gif.classList.contains("hidden") ?
                    setTimeout(()=>{img_gif.classList.toggle("hidden");},1000) : img_gif.classList.toggle("hidden");
                if(card_container.children[1].classList.contains("flipcard")){
                    //card.style.display ="none";
                    card.classList.add("smaller");
                    if(card.id==="card-mondiaux"){
                        card_container.id==="card-afrique" || card_container.id==="card-inter" ?
                        card.style.transform = "translate(0px,15vh)" :
                            card.style.transform = "translate(0,0)";
                    }

                    if(card.id==="card-inter"){
                        if(card_container.id==="card-afrique") {
                            card.style.transform = "translate(0,15vh)"
                        }else{
                            card.style.transform = "translate(0,0)";
                        }
                    }

                }else{
                    //card.style.display ="";
                    card.classList.remove("smaller");
                    card.style.transform = "translate(0,0)";


                }
            }
        })});
    });

});