document.addEventListener("DOMContentLoaded", async function () {
    var swiper = new Swiper(".swiper-container", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    await fetchInitialLikes();
    updateUIForLikedComposition();

    const heartButtons = document.querySelectorAll(".heart-button");
    heartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            toggleLike(this);
        });
    });
});

async function fetchInitialLikes() {
    // Votre code existant pour charger les likes initiaux
}

async function updateLikeCountOnServer(compositionId, newLikes) {
    // Votre code existant pour mettre à jour le serveur
}

function updateUIForLikedComposition() {
    let currentlyLiked = localStorage.getItem("likedComposition");
    if (currentlyLiked) {
        const button = document.querySelector(`.heart-button[data-composition-id="${currentlyLiked}"]`);
        if (button) {
            button.classList.add('liked'); // Marquez visuellement la composition comme aimée
        }
    }
}

function toggleLike(selectedButton) {
    const selectedCompositionId = selectedButton.getAttribute('data-composition-id');
    let currentlyLiked = localStorage.getItem("likedComposition");

    // Retirez le like si la même composition est cliquée à nouveau
    if (currentlyLiked === selectedCompositionId) {
        localStorage.removeItem("likedComposition");
        selectedButton.classList.remove('liked');
        updateLikeCountOnServer(selectedCompositionId, -1); // Décrémentez le like
    } else {
        // Changez le like vers la nouvelle composition
        if (currentlyLiked) {
            const previouslyLikedButton = document.querySelector(`.heart-button[data-composition-id="${currentlyLiked}"]`);
            previouslyLikedButton.classList.remove('liked');
            updateLikeCountOnServer(currentlyLiked, -1); // Décrémente l'ancien like
        }
        selectedButton.classList.add('liked');
        localStorage.setItem("likedComposition", selectedCompositionId);
        updateLikeCountOnServer(selectedCompositionId, 1); // Incrémente le nouveau like
    }

    // Assurez-vous de mettre à jour l'interface utilisateur en conséquence
    // Ceci peut inclure l'ajustement du nombre de likes affichés, si votre UI le montre
}
