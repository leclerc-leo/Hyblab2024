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
  
	var heartButtons = document.querySelectorAll(".heart-button");
	var currentlyLiked = null; // Stocker l'ID de la composition actuellement likée
  
	function fetchInitialLikes() {
	  fetch("./data/Likes.json")
		.then((response) => response.json())
		.then((likes) => {
		  heartButtons.forEach(function (button) {
			const compositionId = button.getAttribute("data-composition-id");
			button.dataset.likes = likes[compositionId] || 0;
			button.querySelector(".like-count").textContent = likes[compositionId] || 0;
			button.style.color = "grey";
		  });
		})
		.catch((error) => console.error("Erreur de chargement des likes:", error));
	}
  
	function toggleLike(button) {
	  const compositionId = button.getAttribute("data-composition-id");
	  let currentLikes = parseInt(button.dataset.likes, 10);
  
	  // Si une autre composition était déjà likée, décrémenter son compteur
	  if (currentlyLiked && currentlyLiked !== compositionId) {
		const previousLikedButton = document.querySelector(`.heart-button[data-composition-id="${currentlyLiked}"]`);
		let previousLikes = parseInt(previousLikedButton.dataset.likes, 10);
		previousLikes = Math.max(previousLikes - 1, 0); // Éviter les nombres négatifs
		previousLikedButton.dataset.likes = previousLikes;
		previousLikedButton.querySelector(".like-count").textContent = previousLikes;
		previousLikedButton.style.color = "grey";
		// Mettre à jour l'ancienne composition likée sur le serveur
		updateLikeCountOnServer(currentlyLiked, previousLikes);
	  }
  
	  // Inverser le statut de like pour la composition actuelle
	  if (currentlyLiked !== compositionId) {
		currentLikes += 1; // Incrementer seulement si on like une nouvelle compo
		button.style.color = "red";
		currentlyLiked = compositionId; // Mettre à jour la composition actuellement likée
	  } else {
		// Si l'utilisateur clique à nouveau sur la même composition, ne rien faire
		return;
	  }
  
	  button.dataset.likes = currentLikes;
	  button.querySelector(".like-count").textContent = currentLikes;
  
	  // Mettre à jour la composition actuellement likée sur le serveur
	  updateLikeCountOnServer(compositionId, currentLikes);
	}
  
	function updateLikeCountOnServer(compositionId, newLikes) {
	  fetch("api/like", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ [compositionId]: newLikes }),
	  }).catch((error) => console.error("Erreur d'envoi des likes:", error));
	}
  
	heartButtons.forEach(function (button) {
	  button.addEventListener("click", function () {
		toggleLike(this);
	  });
	});
  
	fetchInitialLikes();
  });
  