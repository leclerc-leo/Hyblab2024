document.addEventListener("DOMContentLoaded", function () {
    var mainSwiper = new Swiper(".mainSwiper", {
        direction: "vertical",
        keyboard: true,
        mousewheel: {
            releaseOnEdges: true,
            thresholdDelta: 5,
            thresholdTime: 250
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });

    var scrollSwiper = new Swiper(".scrollSwiper", {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        nested: true,
        cssMode: true
    });

    mainSwiper.on("slideChangeTransitionEnd", () => {
        const activeSlide = mainSwiper.slides[mainSwiper.activeIndex];

        if (activeSlide.querySelector(".scrollSwiper")) {
            mainSwiper.mousewheel.disable();
        }
    });

    scrollSwiper.on("toEdge", () => {
        mainSwiper.mousewheel.enable();
    });
});
