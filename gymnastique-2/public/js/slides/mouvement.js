const swiperMouvement = new Swiper('#swiper_mouvement', {
    direction: "horizontal",
    loop: false,
    mousewheel: true,
    navigation: {
        enabled: false,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }

});

const fleche_gauche_mouv = document.querySelectorAll('#fleche_gauche_mouv');
fleche_gauche_mouv.forEach( fleche => {
    fleche.addEventListener('click', () => {
        swiperMouvement.slidePrev();
        console.log("ouiG")
    });
});

const fleche_droite_mouv = document.querySelectorAll('#fleche_droite_mouv');
fleche_droite_mouv.forEach( fleche => {
    fleche.addEventListener('click', () => {
        console.log("ouiD")
        swiperMouvement.slideNext();
    });
});
window.onload = function() {
    if(screen.width<800){
        const vid = document.querySelector("#mouvement-video").style;
        vid.transform = "translate(-50%,-50%) scale(57.5%)";
    }
    if(screen.height<1250){
        const vid = document.querySelector("#mouvement-video").style;
        vid.transform = "translate(-50%,-50%) scale(57.5%)";
    }
};