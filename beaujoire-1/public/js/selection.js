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
	const creditsButton = document.getElementById("credits");
	const overlay = document.getElementById("credit-overlay");

	creditsButton.addEventListener("click", function () {
		overlay.style.display = "flex";
	});

	document
		.getElementById("close-credits")
		.addEventListener("click", function () {
			overlay.style.display = "none";
		});

	(async function () {
		await fetchInitialLikes();

		const likedComposition = localStorage.getItem("likedComposition");
		if (likedComposition) {
			const button = document.querySelector(
				`.heart-button[data-composition-id="${likedComposition}"]`
			);
			if (button) {
				console.log("button found, setting color to yellow");
				const heartFilled = button.querySelector(".heart-filled");
				const heartOutline = button.querySelector(".heart-outline");
				heartFilled.style.display = "block";
				heartOutline.style.display = "none";
				currentlyLiked = likedComposition; // Mettre à jour la composition actuellement likée
			}
		}

		updateRanking();
	})();

	document.addEventListener("click", () => {
		document.querySelector("#back-sound").play();
	});

	document
		.querySelector(".dropdown")
		.querySelector("img")
		.addEventListener("click", (event) => {
			document.querySelectorAll("audio").forEach((audio) => {
				audio.muted = !audio.muted;
			});
		});
	document.querySelector("#settings").addEventListener("click", (event) => {
		const menu = document.querySelector(".dropdown");
		if (
			menu.style.animationName === "dropDownAnimation" ||
			menu.style.animationName === ""
		) {
			menu.style.animationName = "dropUpAnimation";
		} else {
			menu.style.animationName = "dropDownAnimation";
		}
		// Empêche l'événement de se propager au document
		event.stopPropagation();
	});

	// Ajoute un écouteur d'événements au document pour cacher le menu lorsque vous cliquez ailleurs
	document.addEventListener("click", () => {
		const menu = document.querySelector(".dropdown");
		if (menu.style.animationName === "dropUpAnimation") {
			menu.style.animationName = "dropDownAnimation";
		}
	});
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
		const heartFilled = button.querySelector(".heart-filled");
		const heartOutline = button.querySelector(".heart-outline");
		heartFilled.style.display = "none";
		heartOutline.style.display = "block";
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

		// Ajouter les coupes de classement
		const compo1 = sortedButtons[0].closest(".field");
		const compo2 = sortedButtons[1].closest(".field");
		const compo3 = sortedButtons[2].closest(".field");
		const compo4 = sortedButtons[3].closest(".field");

		compo1.querySelector(".tr").style.backgroundImage =
			"url('img/medals/medal1.svg')";
		compo2.querySelector(".tr").style.backgroundImage =
			"url('img/medals/medal2.svg')";
		compo3.querySelector(".tr").style.backgroundImage =
			"url('img/medals/medal3.svg')";
		compo4.querySelector(".tr").style.backgroundImage = "none";

		console.log("Ranked compositions:", sortedButtons);
	}

	async function toggleLike(button) {
		const heartFilled = button.querySelector(".heart-filled");
		const heartOutline = button.querySelector(".heart-outline");
		const compositionId = button.getAttribute("data-composition-id");
		let currentLikes = parseInt(button.dataset.likes, 10);

		// Si le bouton cliqué était déjà le bouton liké
		if (currentlyLiked === compositionId) {
			// Retirer le like
			currentLikes = Math.max(currentLikes - 1, 0);
			heartFilled.style.display = "none";
			heartOutline.style.display = "block";
			currentlyLiked = null; // Réinitialiser la composition actuellement likée
			localStorage.removeItem("likedComposition"); // Supprimer la composition likée du localStorage
		} else {
			// Si une autre composition était déjà likée, décrémenter son compteur
			if (currentlyLiked) {
				await decrementLike(currentlyLiked);
			}

			// Ajouter un like à la composition actuelle
			currentLikes += 1;
			heartFilled.style.display = "block";
			heartOutline.style.display = "none";
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
