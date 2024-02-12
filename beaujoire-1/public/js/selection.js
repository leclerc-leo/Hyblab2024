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

    // Initialisation des likes basée sur les données locales et serveur
    await fetchInitialLikes();
    highlightLikedComposition();

    document.querySelectorAll(".heart-button").forEach(button => {
        button.addEventListener('click', function() {
            handleLikeClick(this);
        });
    });
});

async function fetchInitialLikes() {
    try {
        const response = await fetch("./data/Likes.json");
        const likes = await response.json();
        document.querySelectorAll(".heart-button").forEach(button => {
            const id = button.getAttribute("data-composition-id");
            button.dataset.likes = likes[id] || 0;
            button.querySelector(".like-count").textContent = likes[id] || 0;
        });
    } catch (error) {
        console.error("Error loading likes:", error);
    }
}

function highlightLikedComposition() {
    const likedCompositionId = localStorage.getItem("likedComposition");
    if (likedCompositionId) {
        const likedButton = document.querySelector(`.heart-button[data-composition-id="${likedCompositionId}"]`);
        if (likedButton) {
            likedButton.classList.add('liked');
            const heartFilled = likedButton.querySelector('.heart-filled');
            const heartOutline = likedButton.querySelector('.heart-outline');
            heartFilled.style.display = 'block';
            heartOutline.style.display = 'none';
        }
    }
}

async function handleLikeClick(clickedButton) {
    const currentCompositionId = clickedButton.getAttribute("data-composition-id");
    const previouslyLikedId = localStorage.getItem("likedComposition");

    if (previouslyLikedId === currentCompositionId) {
        // User is unliking the currently liked composition
        updateLikeState(clickedButton, false);
        localStorage.removeItem("likedComposition");
        await updateLikeCountOnServer(currentCompositionId, -1);
    } else {
        // Changing like to another composition
        if (previouslyLikedId) {
            const previouslyLikedButton = document.querySelector(`.heart-button[data-composition-id="${previouslyLikedId}"]`);
            updateLikeState(previouslyLikedButton, false);
            await updateLikeCountOnServer(previouslyLikedId, -1);
        }
        updateLikeState(clickedButton, true);
        localStorage.setItem("likedComposition", currentCompositionId);
        await updateLikeCountOnServer(currentCompositionId, 1);
    }
}

function updateLikeState(button, isLiked) {
    const heartFilled = button.querySelector('.heart-filled');
    const heartOutline = button.querySelector('.heart-outline');
    const likeCountSpan = button.querySelector('.like-count');
    let likes = parseInt(button.dataset.likes, 10) || 0;

    if (isLiked) {
        heartFilled.style.display = 'block';
        heartOutline.style.display = 'none';
        button.classList.add('liked');
        likes++;
    } else {
        heartFilled.style.display = 'none';
        heartOutline.style.display = 'block';
        button.classList.remove('liked');
        likes = Math.max(likes - 1, 0);
    }

    button.dataset.likes = likes;
    likeCountSpan.textContent = likes;
}

async function updateLikeCountOnServer(compositionId, delta) {
    // Supposons que cette fonction envoie une requête au serveur pour mettre à jour le nombre de likes
    // La logique exacte dépendra de votre API serveur
    console.log(`Updating like count for ${compositionId}: ${delta}`);
    // Exemple (à remplacer par votre logique d'appel API réelle):
    // await fetch(`/api/likes/${compositionId}`, { method: 'POST', body: JSON.stringify({ delta }) });
}
