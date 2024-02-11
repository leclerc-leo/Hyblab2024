// Fonction pour incrémenter la sélection
let stats;
let filterStats;
let isCaptainSelected = false;
let isCaptainBeingSelected = false;
let selectedPlayerId;
let updatePlayerElement;
let playersData;

window.onload = async function () {
	await fetch("./data/Stats.json")
		.then((response) => response.json())
		.then((statis) => {
			console.log("Stats:", statis);
			stats = statis;
			filterStats = filterStatsWithPlayer(statis, players);
		})
		.catch((error) => {
			console.error("Error fetching stats:", error);
		});
	await fetch("./data/DataBase.json")
		.then((response) => response.json())
		.then((data) => {
			playersData = data;
		})
		.catch((error) => {
			console.error("Error fetching players data:", error);
		});
	initializePage();
};

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
			const playerElementdiv = `
			<img src="./${localStorage.getItem("cardJersey")}" alt="jersey" />
				<p class="player-name">${playerName}</p>
			`;
			playerElement.innerHTML =
				playerElementdiv + playerElement.innerHTML;
		} else {
			const playerElementdiv = `
			<img src="./img/cardJerseys/card_coach.svg" alt="jersey" />
		   <p class="player-name">${playerName}</p>
			`;
			playerElement.innerHTML =
				playerElementdiv + playerElement.innerHTML;
		}
		selectedPlayerId = null;
	};

	const storedPlayers = JSON.parse(localStorage.getItem("players"));
	if (storedPlayers) {
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
	} else {
		console.log("No players found in local storage");
	}

	updateVotePercentages();
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

function filterStatsWithPlayer(stats, players) {
	// Convertir l'objet players en un tableau de noms de joueurs
	let playerNames = Object.values(players);
	let filteredStats = {};
	Object.keys(stats).forEach((player) => {
		if (playerNames.includes(player)) {
			filteredStats[player] = stats[player];
		}
	});
	console.log("filteredStats:", filteredStats);
	return filteredStats;
}

function computeStatsPerPosition(stats, playersData) {
	const statsPerPosition = {};
	Object.keys(stats).forEach((player) => {
		const playerData = playersData.find(
			(playerData) => playerData.NOM === player
		);
		if (playerData) {
			const playerPosition = playerData.POSTE;
			if (!statsPerPosition[playerPosition]) {
				statsPerPosition[playerPosition] = 0;
			}
			statsPerPosition[playerPosition] += stats[player];
		}
	});

	return statsPerPosition;
}

// Cette fonction calcule le pourc	tage des votes pour chaque joueur
// et met à jour l'élément HTML pour afficher ce pourcentage.
function updateVotePercentages() {
	const totalVotesPerPosition = computeStatsPerPosition(stats, playersData);
	const playerPercentages = {};

	// Calculez le pourcentage des votes pour chaque joueur
	for (const player in filterStats) {
		const playerVotes = filterStats[player];
		const playerData = playersData.find(
			(playerData) => playerData.NOM === player
		);
		const playerPosition = playerData.POSTE;
		const totalVotesForPosition = totalVotesPerPosition[playerPosition];
		const playerPercentage = (playerVotes / totalVotesForPosition) * 100;
		playerPercentages[player] = playerPercentage;
	}

	console.log("Player percentages:", playerPercentages);

	// Mettez à jour l'élément HTML pour chaque joueur avec le pourcentage de votes
	for (const player in playerPercentages) {
		// Get the id of the player from the player name
		const playerElementId = Object.keys(players).find(
			(key) => players[key] === player
		);
		if (!playerElementId) {
			console.log(`No player found for name ${player}`);
			continue;
		}
		const playerElement = document.getElementById(playerElementId);
		if (playerElement) {
			const barId = "#" + playerElementId + "-bar";
			const barElem = document.querySelector(barId);
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
			barElem.querySelector(
				".player1-bar"
			).style.width = `${playerPercentages[player]}%`;

			barElem.querySelector(".player1-bar").style.animationName =
				"scaleSide";
		}
	}
}
