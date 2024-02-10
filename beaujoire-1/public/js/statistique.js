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
			stats = filterStatsWithPlayer(data, players);
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
function calculerTotalSelections() {}

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
		console.log(player.POSTE);
		if (player.POSTE !== "ENTRAÎNEUR" && player.NUMÉRO !== undefined) {
			playerElement.setAttribute("data-number", player.NUMÉRO);
			playerElement.innerHTML = `
		 	<img src="./img/jersey.svg" alt="jersey" />				<p class="player-name">${playerName}</p>
		 	`;
		} else {
			playerElement.innerHTML = `
		 	<img src="./img/jersey.svg" alt="jersey" />
		 	<p class="player-name">${playerName}</p>
		 	`;
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

function handleCaptainClick() {
	isCaptainBeingSelected = true;
	if (isCaptainSelected) {
		const capElements = document.querySelectorAll(".cap");
		capElements.forEach((element) => {
			element.remove();
		});
		isCaptainSelected = false;
	}
	const cap_btn = document.querySelector("#capitaine");
	const cap_bar = cap_btn.querySelector("#cap-bar");
	if (cap_btn) {
		document.querySelectorAll(".player-clickable").forEach((player) => {
			player.addEventListener("click", (event) => {
				handleCaptainSelect(
					event.target.closest(".player-clickable").id
				);
			});
		});
	} else {
		console.log("captain button not found");
	}
}

function handleCaptainSelect(id) {
	if (isCaptainBeingSelected) {
		const selectedPlayer = id;
		const selectedPlayerElement = document.getElementById(selectedPlayer);
		const captain = document.createElement("div");
		captain.classList.add("cap");
		captain.innerHTML = `
		c
	`;
		selectedPlayerElement.appendChild(captain);
		selectedPlayerElement.classList.add("captain");
		isCaptainSelected = true;
		localStorage.setItem("captain", id);
		document.querySelectorAll(".player-clickable").forEach((player) => {
			player.removeEventListener("click", handleCaptainClick);
		});
		isCaptainBeingSelected = false;
	}
}

// Fonction pour filtrer les statistiques avec le joueur dans players
function filterStatsWithPlayer(stats, players) {
	const filteredStats = {};
	Object.keys(stats).forEach((player) => {
		if (players.hasOwnProperty(player)) {
			filteredStats[player] = stats[player];
		}
	});
	return filteredStats;
}
// Cette fonction calcule le pourcentage des votes pour chaque joueur
// et met à jour l'élément HTML pour afficher ce pourcentage.
function updateVotePercentages() {
	const totalVotesPerPosition = {}; // stocke le total des votes pour chaque poste
	const playerPercentages = {}; // stocke le pourcentage des votes pour chaque joueur

	// Calculez le total des votes pour chaque poste
	for (const player in stats) {
		const position = player.split("-")[1]; // suppose que le nom du joueur contient le poste, séparé par un tiret
		if (!totalVotesPerPosition[position]) {
			totalVotesPerPosition[position] = 0;
		}
		totalVotesPerPosition[position] += stats[player];
	}

	// Calculez le pourcentage des votes pour chaque joueur
	for (const player in stats) {
		const position = player.split("-")[1]; // suppose que le nom du joueur contient le poste, séparé par un tiret
		playerPercentages[player] =
			(stats[player] / totalVotesPerPosition[position]) * 100;
	}

	// Mettez à jour l'élément HTML pour chaque joueur avec le pourcentage de votes
	for (const player in playerPercentages) {
		const playerElementId = player.toLowerCase(); // l'ID de l'élément HTML correspondant au joueur
		const playerElement = document.getElementById(playerElementId);
		if (playerElement) {
			const percentageDisplay =
				playerElement.querySelector(".vote-percentage");
			if (!percentageDisplay) {
				// Créez un nouvel élément pour afficher le pourcentage si ce n'est pas déjà fait
				const newPercentageDisplay = document.createElement("div");
				newPercentageDisplay.className = "vote-percentage";
				playerElement.appendChild(newPercentageDisplay);
			}
			// Mettez à jour le pourcentage affiché
			percentageDisplay.textContent =
				playerPercentages[player].toFixed(2) + "%";
		}
	}
}
