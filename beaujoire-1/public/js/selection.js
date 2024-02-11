document.addEventListener("DOMContentLoaded", function () {
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

	let currentlyLiked;

	(async function () {
		await fetchInitialLikes();

		const likedComposition = localStorage.getItem("likedComposition");
		if (likedComposition) {
			const button = document.querySelector(
				`.heart-button[data-composition-id="${likedComposition}"]`
			);
			if (button) {
				console.log("button found, setting color to yellow");
				button.style.color = "#fadc00"; // Changer la couleur en jaune
				currentlyLiked = likedComposition; // Mettre à jour la composition actuellement likée
			}
		}
	})();

	const heartButtons = document.querySelectorAll(".heart-button");

	async function fetchInitialLikes() {
		try {
			const response = await fetch("./data/Likes.json");
			const likes = await response.json();

			heartButtons.forEach(function (button) {
				const compositionId = button.getAttribute(
					"data-composition-id"
				);
				button.dataset.likes = likes[compositionId] || 0;
				button.querySelector(".like-count").textContent =
					likes[compositionId] || 0;
				button.style.color = "grey"; // Initialiser en gris
			});
		} catch (error) {
			console.error("Erreur de chargement des likes:", error);
		}
	}

	async function updateLikeCountOnServer(compositionId, newLikes) {
		let likies;
		const response = await fetch("./data/Likes.json");
		const likes = await response.json();
		console.log("Initial likes:", likes);
		likes[compositionId] = newLikes;
		console.log("Updated likes:", likes);
		likies = likes;
		await fetch("api/like", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(likies),
		});
	}

	async function decrementLike(compositionId) {
		const button = document.querySelector(
			`.heart-button[data-composition-id="${compositionId}"]`
		);
		let likes = parseInt(button.dataset.likes, 10);
		likes = Math.max(likes - 1, 0); // Éviter les nombres négatifs
		button.dataset.likes = likes;
		button.querySelector(".like-count").textContent = likes;
		button.style.color = "grey";
		// Mettre à jour l'ancienne composition likée sur le serveur
		await updateLikeCountOnServer(compositionId, likes);
	}

	async function updateRanking() {
		// Trier les boutons de cœur par nombre de likes, du plus grand au plus petit
		const sortedButtons = Array.from(heartButtons).sort((a, b) => {
			const likesA = parseInt(a.dataset.likes, 10);
			const likesB = parseInt(b.dataset.likes, 10);
			return likesB - likesA;
		});

		// Ajouter chaque composition et son nombre de likes à la liste de classement
		sortedButtons.forEach((button) => {
			const compositionId = button.getAttribute("data-composition-id");
		});
	}

	async function toggleLike(button) {
		const compositionId = button.getAttribute("data-composition-id");
		let currentLikes = parseInt(button.dataset.likes, 10);

		// Si le bouton cliqué était déjà le bouton liké
		if (currentlyLiked === compositionId) {
			// Retirer le like
			currentLikes = Math.max(currentLikes - 1, 0); // Éviter les nombres négatifs
			button.style.color = "grey"; // Changer la couleur en gris
			currentlyLiked = null; // Réinitialiser la composition actuellement likée
			localStorage.removeItem("likedComposition"); // Supprimer la composition likée du localStorage
		} else {
			// Si une autre composition était déjà likée, décrémenter son compteur
			if (currentlyLiked) {
				await decrementLike(currentlyLiked);
			}

			// Ajouter un like à la composition actuelle
			currentLikes += 1;
			button.style.color = "#fadc00"; // Changer la couleur en jaune
			currentlyLiked = compositionId; // Mettre à jour la composition actuellement likée
			localStorage.setItem("likedComposition", compositionId); // Sauvegarder la composition likée dans le localStorage
		}

		button.dataset.likes = currentLikes;
		button.querySelector(".like-count").textContent = currentLikes;

		// Mettre à jour la composition actuellement likée sur le serveur
		await updateLikeCountOnServer(compositionId, currentLikes);

		// Mettre à jour le classement
		await updateRanking();
	}

	heartButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			toggleLike(this);
			button.classList.remove("like");
			void button.offsetWidth;
			button.classList.add("like");
		});
	});
});
