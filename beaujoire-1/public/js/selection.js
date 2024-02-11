document.addEventListener("DOMContentLoaded", function () {
	// Initialisation de Swiper
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

	var heartButtons = document.querySelectorAll(".heart-button");

	// Fonction pour désactiver tous les cœurs (si vous souhaitez permettre un seul like à la fois)
	function deactivateAllHearts() {
		heartButtons.forEach(function (button) {
			button.style.color = "grey";
		});
	}

	// Fonction pour envoyer le like au serveur
	function sendLike(compositionId) {
		let likes;
		fetch("./data/Likes.json")
			.then((response) => response.json())
			.then((data) => {
				likes = data;
				console.log("Likes:", likes);
				// Incrémenter le nombre de likes pour la composition spécifique
				if (typeof likes[compositionId] !== "undefined") {
					likes[compositionId]++;
				} else {
					likes[compositionId] = 1;
				}
				fetch("api/like", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(likes),
				});
			})
			.catch((error) => console.error("Error fetching likes:", error));
	}

	// Ajoutez un écouteur d'événements pour tous les boutons cœur
	heartButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			const compositionId = this.getAttribute("data-composition-id");

			// Désactiver tous les cœurs et activer le cœur cliqué
			deactivateAllHearts(); // Commentez ou supprimez cette ligne si les likes multiples sont autorisés
			this.style.color = "red";

			// Envoyer le like au serveur
			sendLike(compositionId);
		});
	});
});
