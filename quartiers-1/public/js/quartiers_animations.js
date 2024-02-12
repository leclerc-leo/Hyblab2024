// Animation de l'image de fond
let background_animation = lottie.loadAnimation({
    container: document.getElementById('background-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'animation/animation_villejean.json'
});

// Animation du guide qui salue
let guide_coucou_animation = lottie.loadAnimation({
    container: document.getElementById('guide-coucou'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'animation/guide_coucou.json'
});

// Animation du guide qui marche
let guide_walk_animation = lottie.loadAnimation({
    container: document.getElementById('guide-walk'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'animation/guide_walk.json'
});

// Animation du guide test
let guide_test_animation = lottie.loadAnimation({
    container: document.getElementById('guide-test'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation/guide_coucou.json'
});