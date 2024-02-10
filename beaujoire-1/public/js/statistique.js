// Fonction pour incrémenter la sélection
function incrementerSelection(idJoueur) {
	var joueur = document.getElementById(idJoueur);
	var count = parseInt(joueur.getAttribute("data-selection-count")) + 1;
	joueur.setAttribute("data-selection-count", count);
	mettreAJourStatistiques(idJoueur, count);
}

// Fonction pour mettre à jour les statistiques de sélection
function mettreAJourStatistiques(idJoueur, count) {
	var totalSelections = calculerTotalSelections(); // Implémentez cette fonction selon votre logique
	var pourcentage = (count / totalSelections) * 100;

	var joueur = document.getElementById(idJoueur);
	var barreRemplissage = joueur.querySelector(".barre-remplissage");
	barreRemplissage.style.width = pourcentage + "%";
}

// Vous devrez créer une fonction pour calculer le total des sélections
function calculerTotalSelections() {
	// Implémentez la logique pour calculer le total des sélections
	return 100; // Retournez la valeur totale des sélections
}
