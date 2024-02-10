// Fonction pour incrémenter la sélection
let stats;
window.onload = async function () {
	await fetch("./data/DataBase.json")
		.then((response) => response.json())
		.then((players) => {
			playersData = players;
			initializePage();
		})
		.catch((error) => {
			console.error("Erreur : fetching DataBase.json", error);
		});

	await fetch("./data/Stats.json")
		.then((response) => response.json())
		.then((data) => {
			stats = data;
			console.log(stats);
		})
		.catch((error) => {
			console.error("Erreur : fetching Stats.json", error);
		});
};
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
async function calculerTotalSelections() {
	await fetch("./data/Stats.json")
		.then((response) => response.json())
		.then((data) => {
			stats = data;
		})
		.catch((error) => {
			console.error("Erreur :", error);
		});
	return 100; // Retournez la valeur totale des sélections
}

let isAnyItemFlipped = false;
let isCaptainSelected = false;
let isCaptainBeingSelected = false;
let selectedPlayerId;
let updatePlayerElement;
let playersData;
let isFirstCall = true;

function initializePage() {
	const maillotButton = document.getElementById("maillot");
	const blasonButton = document.getElementById("blason");

	const selectedMaillot = localStorage.getItem("selectedMaillot");
	const selectedBlason = localStorage.getItem("selectedBlason");
	console.log("Selected Maillot:", selectedMaillot);
	console.log("Selected Blason:", selectedBlason);

	if (selectedMaillot) {
		console.log("test");
		maillotButton.style.backgroundImage = `url(${selectedMaillot})`;
	}

	if (selectedBlason) {
		console.log("test2");
		blasonButton.style.backgroundImage = `url(${selectedBlason})`;
	}
	updatePlayerElement = function (playerElement, playerName) {
		const player = playersData.find((player) => player.NOM === playerName);
		if (player.POSTE !== "ENTRAÎNEUR" && player.NUMÉRO !== undefined) {
			playerElement.setAttribute("data-number", player.NUMÉRO);
			playerElement.innerHTML = `
				<img src="./img/jersey.svg" alt="jersey" />
				<p class="player-name">${playerName}</p>
			`;
		} else {
			playerElement.textContent = playerName;
		}
		selectedPlayerId = null;
	};

	const urlParams = new URLSearchParams(window.location.search);
	const playersParam = urlParams.get("players");
	const captainParam = urlParams.get("captain");
	console.log(`Captain parameter: ${captainParam}`);
	console.log(`URL parameters: ${playersParam}`);
	const storedPlayers = JSON.parse(localStorage.getItem("players"));

	if (playersParam !== null) {
		const players = playersParam.split("&");
		console.log(`Players from URL: ${players}`);
		// Iterate through each player from the URL parameters
		players.forEach((player) => {
			let [playerId, playerName] = player.split("=");
			playerId = decodeURIComponent(playerId);
			playerName = decodeURIComponent(playerName);

			// Retrieve the player element corresponding to the player's id
			const playerElement = document.getElementById(playerId);
			// Update the player information
			if (playerElement && playerName !== "") {
				updatePlayerElement(playerElement, playerName);
			} else {
				console.log(`No player found for id ${playerId}`);
			}
		});
		if (captainParam) {
			handleCaptainSelect(captainParam);
		}
		document.getElementById("statistiques").style.display = "inline-block";
		document.getElementById("redac").style =
			"margin:0 ; transform: translateX(0)";
	} else if (storedPlayers) {
		console.log("Players found in local storage");
		// Iterate through each player from the local storage
		for (const playerId in storedPlayers) {
			const playerName = storedPlayers[playerId];
			// Retrieve the player element corresponding to the player's id
			const playerElement = document.getElementById(playerId);
			// Update the player information
			if (playerElement && playerName !== "") {
				updatePlayerElement(playerElement, playerName);
			} else {
				console.log(`No player found for id ${playerId}`);
			}
		}
		const captain = localStorage.getItem("captain");
		if (captain) {
			isCaptainBeingSelected = true;
			handleCaptainSelect(captain);
		}
		document.getElementById("statistiques").style.display = "inline-block";
		document.getElementById("redac").style =
			"margin:0 ; transform: translateX(0)";
	}
}

let players = JSON.parse(localStorage.getItem("players")) || {
	goalkeeper: "",
	entraineur: "",
	"ailier-droit": "",
	"ailier-gauche": "",
	"attaquant-centre": "",
	"arriere-droit": "",
	"arriere-gauche": "",
	"midfielder-lead": "",
	"midfielder-1": "",
	"midfielder-3": "",
	"defender-2": "",
	"defender-3": "",
};
