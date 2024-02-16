"use strict";

function openDrawer(slideSelector) {
  const drawerSelector = `${slideSelector} .drawer`;
  const overlaySelector = `${slideSelector} .overlay`;
  const chevronSelector = `${slideSelector} .chevron`;
  const overlay = document.querySelector(overlaySelector);
  const chevron = document.querySelector(chevronSelector);

  let t1 = anime.timeline({
    easing: "easeInOutQuad",
  });
  let t2 = anime.timeline({
    easing: "easeInOutQuad",
  });
  let t3 = anime.timeline({
    easing: "easeInOutQuad",
  });

  overlay.setAttribute("style", "z-index: 10;");
  t1.add({
    targets: drawerSelector,
    left: "0%",
  });
  t2.add({
    targets: overlaySelector,
    opacity: 1,
  });
  t3.add({
    targets: chevron,
    rotate: -180,
  });
}

function closeDrawer(slideSelector) {
  const drawerSelector = `${slideSelector} .drawer`;
  const overlaySelector = `${slideSelector} .overlay`;
  const chevronSelector = `${slideSelector} .chevron`;
  const chevron = document.querySelector(chevronSelector);

  let t1 = anime.timeline({
    easing: "easeInOutQuad",
  });
  let t2 = anime.timeline({
    easing: "easeInOutQuad",
  });
  let t3 = anime.timeline({
    easing: "easeInOutQuad",
  });

  t1.add({
    targets: drawerSelector,
    left: "100%",
  });
  t2.add({
    targets: overlaySelector,
    opacity: 0,
    zIndex: -1,
  });
  t3.add({
    targets: chevron,
    rotate: 0,
  });
}

function mkDrawer(slideSelector) {
  const drawerSelector = `${slideSelector} .drawer`;
  const drawerContainerSelector = `${slideSelector} .drawer-container`;
  const overlaySelector = `${slideSelector} .overlay`;
  const chevronSelector = `${slideSelector} .chevron`;
  const scrollSwiperSelector = `${slideSelector} .scroll-swiper`;
  const drawer = document.querySelector(drawerSelector);
  const drawerContainer = document.querySelector(drawerContainerSelector);
  const button = document.querySelector(`${drawerSelector} .drawer-button`);
  const overlay = document.querySelector(overlaySelector);
  const chevron = document.querySelector(chevronSelector);
  const scrollSwiper = document.querySelector(scrollSwiperSelector);

  // Reset attributes
  drawer.setAttribute("style", "left: 100%;");
  overlay.setAttribute("style", "opacity: 0;");
  overlay.setAttribute("style", "z-index: -1;");
  chevron.setAttribute("style", "transform: rotate(0);");

  let drawerIsOpen = false;
  button.addEventListener("click", function () {
    switch (drawerIsOpen) {
      case true:
        closeDrawer(slideSelector);
        drawerIsOpen = false;
        break;
      case false:
        openDrawer(slideSelector);
        drawerIsOpen = true;
        break;
    }
  });

  overlay.addEventListener("click", function () {
    closeDrawer(slideSelector);
    drawerIsOpen = false;
  });

  const minXTravel = 50; // px
  let firstTouchX;
  let firstTouchY;
  let lastTouchX;
  let lastTouchY;

  drawerContainer.addEventListener("touchstart", function (event) {
    firstTouchX = event.changedTouches[event.changedTouches.length - 1].pageX;
    firstTouchY = event.changedTouches[event.changedTouches.length - 1].pageY;
  });

  drawerContainer.addEventListener("touchmove", function (event) {
    lastTouchX = event.changedTouches[event.changedTouches.length - 1].pageX;
    lastTouchY = event.changedTouches[event.changedTouches.length - 1].pageY;
    const dx = firstTouchX - lastTouchX;
    const dy = firstTouchY - lastTouchY;
    if (Math.abs(dy) >= Math.abs(dx)) {
      return;
    }
    event.preventDefault();
  });

  drawerContainer.addEventListener("touchend", function (event) {
    lastTouchX = event.changedTouches[event.changedTouches.length - 1].pageX;
    lastTouchY = event.changedTouches[event.changedTouches.length - 1].pageY;
    const dx = firstTouchX - lastTouchX;
    const dy = firstTouchY - lastTouchY;

    if (Math.abs(dy) >= Math.abs(dx)) {
      return;
    }

    switch (drawerIsOpen) {
      case true:
        if (dx < 0 && -dx >= minXTravel) {
          closeDrawer(slideSelector);
          drawerIsOpen = false;
        }
        break;
      case false:
        if (dx >= minXTravel) {
          openDrawer(slideSelector);
          drawerIsOpen = true;
        }
        break;
    }
  });

  drawerContainer.addEventListener("touchcancel", function (event) {
    // reset l'état du tiroir
    drawer.setAttribute("style", "left: 100%;");
    overlay.setAttribute("style", "opacity: 0;");
    overlay.setAttribute("style", "z-index: -1;");
    chevron.setAttribute("style", "transform: rotate(0);");
  });
}
