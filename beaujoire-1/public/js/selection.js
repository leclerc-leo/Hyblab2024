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

	heartButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			const heartOutline = this.querySelector(".heart-outline");
			const heartFilled = this.querySelector(".heart-filled");
			const isLiked = heartFilled.style.display === "block";

			if (isLiked) {
				// Logique pour retirer le like
				heartOutline.style.display = "block";
				heartFilled.style.display = "none";
				updateLikes(this, -1);
			} else {
				// Logique pour ajouter un like
				heartOutline.style.display = "none";
				heartFilled.style.display = "block";
				updateLikes(this, 1);
			}
		});
	});

	function updateLikes(button, delta) {
		const likeCountSpan = button.querySelector(".like-count");
		let likes = parseInt(button.dataset.likes, 10) || 0;
		likes += delta;
		button.dataset.likes = likes; // Met à jour le nombre de likes dans l'attribut data-likes
		likeCountSpan.textContent = likes; // Affiche le nombre mis à jour

		// Mise à jour du localStorage pour persister l'état liké
		const compositionId = button.getAttribute("data-composition-id");
		if (delta > 0) {
			localStorage.setItem(compositionId, likes.toString()); // Stocke le nombre actuel de likes
		} else {
			const storedLikes = parseInt(
				localStorage.getItem(compositionId),
				10
			);
			if (storedLikes <= likes) {
				localStorage.setItem(compositionId, likes.toString()); // Stocke le nombre actuel de likes
			}
		}
	}
});
