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

	const heartButtons = document.querySelectorAll('.heart-button');
  
  heartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const heartOutline = this.querySelector('.heart-outline');
      const heartFilled = this.querySelector('.heart-filled');
      const isLiked = heartFilled.style.display === 'block';
      
      if (isLiked) {
        // Logique pour retirer le like
        heartOutline.style.display = 'block';
        heartFilled.style.display = 'none';
        updateLikes(this, -1);
      } else {
        // Logique pour ajouter un like
        heartOutline.style.display = 'none';
        heartFilled.style.display = 'block';
        updateLikes(this, 1);
      }
    });
  });

  function updateLikes(button, delta) {
    const likeCountSpan = button.querySelector('.like-count');
    let likes = parseInt(button.dataset.likes, 10) || 0;
    likes += delta;
    button.dataset.likes = likes; // Met à jour le nombre de likes dans l'attribut data-likes
    likeCountSpan.textContent = likes; // Affiche le nombre mis à jour

    // Optionnel : mise à jour du localStorage pour persister l'état liké
    if (delta > 0) {
      localStorage.setItem(button.getAttribute('data-composition-id'), 'liked');
    } else {
      localStorage.removeItem(button.getAttribute('data-composition-id'));
    }
  }
});
