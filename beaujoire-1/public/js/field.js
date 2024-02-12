"use strict";

let isAnyItemFlipped = false;
let isCaptainSelected = false;
let isCaptainBeingSelected = false;
let selectedPlayerId;
let updatePlayerElement;
let playersData;
let cardJersey;

window.onload = fetch("./data/DataBase.json")
	.then((response) => response.json())
	.then((players) => {
		playersData = players;
		initializePage();
	});

function initializePage() {
	const maillotButton = document.getElementById("maillot");
	const blasonButton = document.getElementById("blason");

	const selectedMaillot = localStorage.getItem("selectedMaillot");
	const selectedBlason = localStorage.getItem("selectedBlason");

	if (selectedMaillot) {
		console.log("selectedMaillot:", selectedMaillot);
		maillotButton.style.backgroundImage = `url(${selectedMaillot})`;
		updateCardJersey();
	}

	if (selectedBlason) {
		console.log("selectedBlason:", selectedBlason);
		blasonButton.style.backgroundImage = `url(${selectedBlason})`;
	}
	updatePlayerElement = function (playerElement, playerName) {
		const player = playersData.find((player) => player.NOM === playerName);
		if (player.POSTE !== "ENTRAÎNEUR" && player.NUMÉRO !== undefined) {
			playerElement.setAttribute("data-number", player.NUMÉRO);
			playerElement.innerHTML = `
				<img src="./${localStorage.getItem("cardJersey")}" alt="jersey" />
				<p class="player-name">${playerName}</p>
			`;
		} else {
			playerElement.textContent = playerName;
		}
		if (player.POSTE !== "ENTRAÎNEUR" && player.NUMÉRO !== undefined) {
			const playerNameElem = playerElement.querySelector(".player-name");
			const overflow =
				playerElement.scrollWidth - playerNameElem.clientWidth;
			if (overflow > 0) {
				playerNameElem.style.transform = `translateX(-${
					overflow / 2
				}px)`;
			}
		}

		selectedPlayerId = null;
	};

	const playerNames = document.querySelectorAll(".player-name");
	playerNames.forEach((playerName) => {
		if (player.POSTE !== "ENTRAÎNEUR" && player.NUMÉRO !== undefined) {
			const overflow = playerName.scrollWidth - playerName.clientWidth;
			if (overflow > 0) {
				playerName.style.transform = `translateX(-${overflow / 2}px)`;
			}
		}
	});

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
		document.querySelector("#share").style.display = "flex";
		document.getElementById("statistiques").style.display = "inline-block";
		document.getElementById("redac").style =
			"margin:0 ; transform: translateX(0)";
		document.getElementById("capitaine").style.display = "inline-block";
		document.getElementById("capitaine").style.animationName =
			"cap-bar-down";
		document.getElementById("capitaine").style.display = "inline-block";
		document
			.getElementById("capitaine")
			.addEventListener("click", handleCaptainClick);

		setInterval(() => {
			if (isCaptainSelected) {
				document.querySelector("#cap-bar").style.animationName =
					"cap-bar-down";
			} else {
				document.querySelector("#cap-bar").style.animationName =
					"cap-bar-up";
			}
		}, 100);
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
		document.querySelector("#share").style.display = "flex";
		document.getElementById("statistiques").style.display = "inline-block";
		document.getElementById("redac").style =
			"margin:0 ; transform: translateX(0)";
		document.getElementById("capitaine").style.display = "inline-block";
		document.getElementById("capitaine").style.animationName =
			"cap-bar-down";
		document.getElementById("capitaine").style.display = "inline-block";
		document
			.getElementById("capitaine")
			.addEventListener("click", handleCaptainClick);

		setInterval(() => {
			if (isCaptainSelected) {
				document.querySelector("#cap-bar").style.animationName =
					"cap-bar-down";
			} else {
				document.querySelector("#cap-bar").style.animationName =
					"cap-bar-up";
			}
		}, 100);
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

function updateCardJersey() {
	const selectedMaillot = localStorage.getItem("selectedMaillot");
	// Divisez la chaîne en un tableau en utilisant le slash comme séparateur
	const parts = selectedMaillot.split("/");
	// Prenez le dernier élément du tableau, qui est le chemin relatif
	let relativePath =
		parts[parts.length - 3] +
		"/" +
		parts[parts.length - 2] +
		"/" +
		parts[parts.length - 1];
	console.log("Relative path:", relativePath);
	// Ajoutez le chemin relatif au chemin absolu de la page

	switch (relativePath) {
		case "img/maillots/maillot-00-01.png":
			cardJersey = "img/cardJerseys/card_jersey00-01.svg";
			break;
		case "img/maillots/maillot-12-13.png":
			cardJersey = "img/cardJerseys/card_jersey12-13.svg";
			break;
		case "img/maillots/maillot-21-22.png":
			cardJersey = "img/cardJerseys/card_jersey21-22.svg";
			break;
		case "img/maillots/maillot-84-85.png":
			cardJersey = "img/cardJerseys/card_jersey84-85.svg";
			break;
		case "img/maillots/maillot-94-95.png":
			cardJersey = "img/cardJerseys/card_jersey94-95.svg";
			break;
		default:
			cardJersey = "img/cardJerseys/card_jersey00-01.svg";
	}
	console.log("Card Jersey:", cardJersey);
	localStorage.setItem("cardJersey", cardJersey);
}
document.addEventListener("DOMContentLoaded", async () => {
	if (localStorage.getItem("isFirstCall") === null) {
		// Si ce n'est pas le cas, définissez-le sur "true"
		localStorage.setItem("isFirstCall", "true");
	}

	document
		.querySelector("#statistiques")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			await saveStats();
		});
	document.querySelector("#back-overlay").addEventListener("click", () => {
		document.querySelectorAll(".carousel-item").forEach((item) => {
			item.classList.remove("selected");
		});
		document.querySelector(".carousel-overlay").style.display = "none";
		selectedPlayerId = null;
	});

	document.querySelector("#close-bio").addEventListener("click", () => {
		document.querySelector(".bio-overlay").style.display = "none";
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

	document.querySelector("#compare-btn").addEventListener("click", () => {
		handleCompareClick();
	});

	document
		.querySelectorAll(".player.player-clickable.forward")
		.forEach((player) => {
			player.addEventListener("click", (event) => {
				if (
					!(!isCaptainSelected && areAllPlayersSelected()) &&
					!isCaptainBeingSelected
				) {
					animatePlayer(
						"attaquant-gif",
						"img/animations/attaquant-fond-gris.gif",
						1250,
						event
					);
				}
			});
		});
	document
		.querySelectorAll(".player.player-clickable.midfielder")
		.forEach((player) => {
			player.addEventListener("click", (event) => {
				if (
					!(!isCaptainSelected && areAllPlayersSelected()) &&
					!isCaptainBeingSelected
				) {
					animatePlayer(
						"milieu-gif",
						"img/animations/milieu-fond-gris.gif",
						1080,
						event
					);
				}
			});
		});

	document
		.querySelectorAll(".player.player-clickable.defender")
		.forEach((player) => {
			player.addEventListener("click", (event) => {
				if (
					!(!isCaptainSelected && areAllPlayersSelected()) &&
					!isCaptainBeingSelected
				) {
					animatePlayer(
						"defenseur-gif",
						"img/animations/defence-fond-gris.gif",
						1100,
						event
					);
				}
			});
		});

	document.querySelector("#goalkeeper").addEventListener("click", (event) => {
		if (
			!(!isCaptainSelected && areAllPlayersSelected()) &&
			!isCaptainBeingSelected
		) {
			animatePlayer(
				"gardien-gif",
				"img/animations/gardien-fond-gris.gif",
				1360,
				event
			);
		}
	});

	document.querySelector("#entraineur").addEventListener("click", (event) => {
		if (
			!(!isCaptainSelected && areAllPlayersSelected()) &&
			!isCaptainBeingSelected
		) {
			animatePlayer(
				"coach-gif",
				"img/animations/coach-fond-gris.gif",
				1360,
				event
			);
		}
	});

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
});

fetch("api/test")
	.then((response) => response.text())
	.then((data) => console.log(data))
	.catch((error) => console.error("Error:", error));

async function saveStats() {
	if (
		areAllPlayersSelected() &&
		isCaptainSelected &&
		!isCaptainBeingSelected &&
		localStorage.getItem("statsSaved") !== "true"
	) {
		try {
			const response = await fetch("./data/Stats.json");
			const stats = await response.json();
			Object.values(players).forEach((player) => {
				if (stats[player] !== undefined) {
					stats[player]++;
				} else {
					// Handle the case where the player doesn't exist in the stats object
					console.log(`Player ${player} not found in stats.`);
				}
			});
			localStorage.setItem("stats", JSON.stringify(stats));
			console.log("Updated Stats:", stats);
			// Send the updated stats back to the server
			const updateResponse = await fetch("api/updateStats", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(stats),
			});
			if (!updateResponse.ok) {
				throw new Error("Error updating stats");
			}
			// Set the flag in localStorage to indicate that the stats have been saved
			localStorage.setItem("statsSaved", "true");
			window.location.href = "./statistique.html";
		} catch (error) {
			console.error("Error fetching stats:", error);
		}
	}
	// Always redirect to the statistics page, regardless of whether the stats were saved
	window.location.href = "./statistique.html";
}
function animatePlayer(elementId, imgSrc, timeoutDuration, event) {
	const element = document.getElementById(elementId);
	const imgElement = element.querySelector("img");

	imgElement.src = imgSrc;
	imgElement.onload = function () {
		element.style.display = "flex";
		element.style.opacity = "1";
		element.querySelector("audio").play();
		setTimeout(() => {
			handlePlayerClick({
				target: document.getElementById(
					event.target.closest(".player-clickable").id
				),
			});
		}, 10);
		setTimeout(() => {
			element.style.opacity = "0";
			setTimeout(() => {
				element.style.display = "none";
				imgElement.src = "";
			}, 200);
		}, timeoutDuration - 20);
	};
}

function areAllPlayersSelected() {
	let compteur = 0;
	for (const playerId in players) {
		if (players[playerId] === "") {
			console.log(`Player position not selected yet: ${playerId}`);
			compteur++;
		}
	}
	return compteur === 0;
}

function handlePlayerClick(event) {
	const playerElement = event.target.closest(".player-clickable");
	if (playerElement) {
		selectedPlayerId = playerElement.id;
		// Add player animation class
		playerElement.classList.add("player-animation");

		// Show carousel for selected player
		showCarousel(selectedPlayerId);

		// Remove player animation class after animation ends
		playerElement.addEventListener("animationend", () =>
			playerElement.classList.remove("player-animation")
		);
	} else {
		console.log("No player selected");
	}
}

function showCarousel(id) {
	const poste = getPositionFromId(id);

	const filteredPlayers = playersData.filter(
		(player) => player.POSTE === poste
	);

	const carousel = document.querySelector(".carousel");
	carousel.innerHTML = "";

	filteredPlayers.forEach((player) => {
		const carouselItemHTML = createCarouselItem(player);
		carousel.appendChild(carouselItemHTML);
	});

	document.querySelector(".carousel-overlay").style.display = "flex";
	document.getElementById("poste-title").textContent = poste;

	// Wait for the items to load before scrolling to the middle item
	setTimeout(() => {
		const middleItemIndex = Math.floor(carousel.children.length / 2);
		const middleItem = carousel.children[middleItemIndex];
		const scrollPosition =
			middleItem.offsetLeft - middleItem.offsetWidth / 2;
		carousel.scrollTo({
			left: scrollPosition,
			behavior: "smooth",
		});
		middleItem.classList.add("focused");
		carousel.addEventListener("scroll", handleCarouselScroll);
	}, 10);

	isAnyItemFlipped = Array.from(
		document.querySelectorAll(".flip-container")
	).some((el) => el.classList.contains("flip"));

	if (isAnyItemFlipped) {
		handleCarouselAnimation();
	}
}

function handleValidateButtonClick() {
	localStorage.setItem("statsSaved", "false");
	const selectedPlayer = document.querySelector(".carousel-item.focused");
	const selectedPlayerName =
		selectedPlayer.querySelector("#name").textContent;
	console.log(
		`Selected player for position ${selectedPlayerId}: ${selectedPlayerName}`
	);
	//Add the player to the list of selected players
	players[selectedPlayerId] = selectedPlayerName;
	//Save the list of selected players to local storage
	localStorage.setItem("players", JSON.stringify(players));
	updatePlayerElement(
		document.getElementById(selectedPlayerId),
		selectedPlayerName
	);

	//Hide the carousel
	document.querySelectorAll(".carousel-item").forEach((item) => {
		item.classList.remove("focused");
		item.classList.remove("unfocused");
	});
	document.querySelector(".carousel-overlay").style.display = "none";
	selectedPlayerId = null;

	if (areAllPlayersSelected()) {
		console.log("Tous les joueurs ont été sélectionnés");
		document.querySelector("#share").style.display = "flex";
		document.getElementById("statistiques").style.display = "inline-block";
		document.getElementById("redac").style =
			"margin:0 ; transform: translateX(0)";
		document.getElementById("capitaine").style.display = "inline-block";
		document.getElementById("capitaine").style.animationName =
			"cap-bar-down";
		document.getElementById("capitaine").style.display = "inline-block";
		document
			.getElementById("capitaine")
			.addEventListener("click", handleCaptainClick);
		if (!isCaptainSelected) {
			document.querySelector("#captain").style.display = "flex";
			handleCaptainClick();
		}
		setTimeout(() => {
			document.addEventListener("click", function () {
				document.querySelector("#captain").style.display = "none";
			});
			setTimeout(() => {
				document.querySelector("#captain").style.display = "none";
			}, 5000);
		}, 1000);
	}
}

function getPositionFromId(id) {
	const element = document.getElementById(id);
	if (!element) {
		console.log(`No element found with id ${id}`);
		return "";
	}

	const elementId = element.id;
	let position = "";
	switch (true) {
		case elementId.includes("goalkeeper"):
			position = "GARDIEN";
			break;
		case elementId.includes("entraineur"):
			position = "ENTRAÎNEUR";
			break;
		case elementId.includes("ailier-droit"):
			position = "AILIER DROIT";
			break;
		case elementId.includes("ailier-gauche"):
			position = "AILIER GAUCHE";
			break;
		case elementId.includes("attaquant-centre"):
			position = "AVANT CENTRE";
			break;
		case elementId.includes("arriere-droit"):
			position = "ARRIÈRE D";
			break;
		case elementId.includes("arriere-gauche"):
			position = "ARRIÈRE G";
			break;
		case elementId.includes("midfielder-lead"):
			position = "MILIEU OFF";
			break;
		case elementId.includes("midfielder-1"):
			position = "MILIEU OFF G";
			break;
		case elementId.includes("midfielder-3"):
			position = "MILIEU DÉF D";
			break;
		case elementId.includes("defender-2"):
			position = "LIBERO";
			break;
		case elementId.includes("defender-3"):
			position = "STOPPEUR";
			break;
		default:
			position = "";
	}
	return position;
}

function createCarouselItem(player) {
	const carouselItem = document.createElement("div");
	carouselItem.classList.add("carousel-item");
	let but;
	if (player.POSTE == "GARDIEN") {
		but = "CLEAN SHEET";
	} else {
		but = "BUTS";
	}
	let champ_fr = '<img src="./img/champ_fr';
	let tr_champ = '<img src="./img/tr_champ';
	let cp_fr = '<img src="./img/cp_fr';
	let lig_champ = '<img src="./img/lig_champ';

	if (
		player.champ_fr == "0" ||
		player.champ_fr == "" ||
		player.champ_fr == undefined
	) {
		champ_fr += '_b.svg" alt="Coupe"/>';
		player.champ_fr = "";
	} else {
		champ_fr += '.svg" alt="Coupe" />';
	}
	if (
		player.tr_champ == "" ||
		player.tr_champ == "0" ||
		player.tr_champ == undefined
	) {
		tr_champ += '_b.svg" alt="Coupe"/>';
		player.tr_champ = "";
	} else {
		tr_champ += '.svg" alt="Coupe" />';
	}
	if (
		player.cp_fr == "" ||
		player.cp_fr == "0" ||
		player.cp_fr == undefined
	) {
		cp_fr += '_b.svg" alt="Coupe"/>';
		player.cp_fr = "";
	} else {
		cp_fr += '.svg" alt="Coupe" />';
	}
	if (
		player.lig_champ == "" ||
		player.lig_champ == "0" ||
		player.lig_champ == undefined
	) {
		lig_champ += '_b.svg" alt="Coupe"/>';
		player.lig_champ = "";
	} else {
		lig_champ += '.svg" alt="Coupe" />';
	}

	let carte = player.CARTE;
	if (player.POSTE == "ENTRAÎNEUR") {
		carouselItem.innerHTML = `
	<div class="flip-container">
		<div class="flipper">
			<!-- Recto -->
			<div class="front">
				<img class="carte-img" src="img/cartes/${player.CARTE}.webp" alt="Photo de ${player.NOM}" />
				<h1 id="name" style="display: none">${player.NOM}</h1>
			</div>
			<!-- Verso -->
			<div class="back">
				<div>
					<img class="carte-img" src="img/back_card.svg" alt="Bio de ${player.NOM}" />
					<div>
						<p class="back-title">${player.NOM}</p>
						<p class="back-text">${player.DOS}</p>
					</div>
				</div>
				<div class="bottom-btn" id="flip-btn">
					<button class="round-btn" id="back-overlay" title="close">
						<img src="./img/close.svg" alt="close" />
					</button>
					<button class="gm-btn gb-shutter" id="bio-btn">
						Biographie
					</button>
				</div>
			</div>
		</div>
	</div>
	<button class="gm-btn gb-shutter" id="validate-button">
	Sélectionner
	</button>
	<div class="carousel-grid">
		<div class="carousel-matchs">
			<p class="stat-score green">${player.MATCHS}</p>
			<div class="flex-row">
				<div class="bar-container">
					<div id="bar1" class="bar"></div>
				</div>
				<div class="bar-container">
					<div id="bar2" class="bar"></div>
				</div>
				<div class="bar-container">
					<div id="bar3" class="bar"></div>
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> MATCHS </p>
		</div>
		<div class="carousel-coupes">
			<div class= coupes-score>
				<p class="stat-score green">${player.champ_fr}</p>
				<p class="stat-score green">${player.tr_champ}</p>
				<p class="stat-score green">${player.cp_fr}</p>
				<p class="stat-score green">${player.lig_champ}</p>
			</div>
			<div class="flex-row">
				<div class="cp-col">
					${champ_fr}
				</div>
				<div class="cp-col">
					${tr_champ}
				</div>
				<div class="cp-col">
					${cp_fr}
				</div>
				<div class="cp-col">
					${lig_champ}
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> COUPES </p>
		</div>
	</div>
    `;
	} else {
		carouselItem.innerHTML = `<div class="flip-container">
		<div class="flipper">
			<!-- Recto -->
			<div class="front">
				<img class="carte-img" src="img/cartes/${player.CARTE}.webp" alt="Photo de ${player.NOM}" />
				<h1 id="name" style="display: none">${player.NOM}</h1>
			</div>
			<!-- Verso -->
			<div class="back">
				<div>
					<img class="carte-img" src="img/back_card.svg" alt="Bio de ${player.NOM}" />
					<div>
						<p class="back-title">${player.NOM}</p>
						<p class="back-text">${player.DOS}</p>
					</div>
				</div>
				<div class="bottom-btn" id="flip-btn">
					<button class="round-btn" id="back-overlay" title="close">
						<img src="./img/close.svg" alt="close" />
					</button>
					<button class="gm-btn gb-shutter" id="bio-btn">
						Biographie
					</button>
				</div>
			</div>
		</div>
	</div>
	<button class="gm-btn gb-shutter" id="validate-button">
	Sélectionner
	</button>
	<div class="carousel-grid">
		<div class="carousel-matchs">
			<p class="stat-score green">${player.MATCHS}</p>
			<div class="flex-row">
				<div class="bar-container">
					<div id="bar1" class="bar"></div>
				</div>
				<div class="bar-container">
					<div id="bar2" class="bar"></div>
				</div>
				<div class="bar-container">
					<div id="bar3" class="bar"></div>
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> MATCHS </p>
		</div>
		<div class="carousel-buts">
			<p class="stat-score green">${player.BUTS}</p>
			<div class="flex-row">
				<div class="circle-container">
					<div id="circle1"></div>
				</div>
				<div class="circle-container" >
					<div id="circle2"></div>
				</div>
				<div class="circle-container">
					<div id="circle3"></div>
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> ${but} </p>
		</div>
		<div class="carousel-coupes">
			<div class= coupes-score>
				<p class="stat-score green">${player.champ_fr}</p>
				<p class="stat-score green">${player.tr_champ}</p>
				<p class="stat-score green">${player.cp_fr}</p>
				<p class="stat-score green">${player.lig_champ}</p>
			</div>
			<div class="flex-row">
				<div class="cp-col">
					${champ_fr}
				</div>
				<div class="cp-col">
					${tr_champ}
				</div>
				<div class="cp-col">
					${cp_fr}
				</div>
				<div class="cp-col">
					${lig_champ}
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> COUPES </p>
		</div>
		<div class="carousel-taille">
			<p class="stat-score green">${player.TAILLE}</p>
			<div class="flex-row">
				<div class="bar2-container">
					<div id="bar4" class="bar"></div>
				</div>
				<div class="bar2-container">
					<div id="bar5" class="bar"></div>
				</div>
				<div class="bar2-container">
					<div id="bar6" class="bar"></div>
				</div>
				<div class="bar2-container">
					<div id="bar7" class="bar"></div>
				</div>
				<div class="bar2-container">
					<div id="bar8" class="bar"></div>
				</div>
			</div>
			<p class="stat-name"><span class="green">TAILLE EN</span> M </p>
		</div>
	</div>
	`;
	}

	const matchs = player.MATCHS; // Remplacez ceci par le nombre de matchs du joueur

	const bar1 = carouselItem.querySelector("#bar1");
	const bar2 = carouselItem.querySelector("#bar2");
	const bar3 = carouselItem.querySelector("#bar3");
	if (!(player.POSTE == "ENTRAÎNEUR")) {
		const bar4 = carouselItem.querySelector("#bar4");
		const bar5 = carouselItem.querySelector("#bar5");
		const bar6 = carouselItem.querySelector("#bar6");
		const bar7 = carouselItem.querySelector("#bar7");
		const bar8 = carouselItem.querySelector("#bar8");
		const circle1 = carouselItem.querySelector("#circle1");
		const circle2 = carouselItem.querySelector("#circle2");
		const circle3 = carouselItem.querySelector("#circle3");

		circle1.style.backgroundColor = player.BUTS >= 1 ? "#00a55a" : "white";
		circle2.style.backgroundColor = player.BUTS >= 30 ? "#00a55a" : "white";
		circle3.style.backgroundColor = player.BUTS >= 70 ? "#00a55a" : "white";

		if (player.POSTE == "GARDIEN") {
			circle1.style.backgroundColor =
				player.BUTS >= 1 ? "#00a55a" : "white";
			circle2.style.backgroundColor =
				player.BUTS >= 100 ? "#00a55a" : "white";
			circle3.style.backgroundColor =
				player.BUTS >= 200 ? "#00a55a" : "white";
		}

		bar4.style.backgroundColor = player.TAILLE >= 1.5 ? "#00a55a" : "white";
		bar5.style.backgroundColor = player.TAILLE >= 1.6 ? "#00a55a" : "white";
		bar6.style.backgroundColor = player.TAILLE >= 1.7 ? "#00a55a" : "white";
		bar7.style.backgroundColor = player.TAILLE >= 1.8 ? "#00a55a" : "white";
		bar8.style.backgroundColor = player.TAILLE >= 1.9 ? "#00a55a" : "white";
	}

	bar1.style.backgroundColor = matchs >= 36 ? "#00a55a" : "white";
	bar2.style.backgroundColor = matchs >= 200 ? "#00a55a" : "white";
	bar3.style.backgroundColor = matchs >= 400 ? "#00a55a" : "white";

	let flip_container = carouselItem.querySelector(".flip-container");
	let sides = Array.from(carouselItem.querySelector(".flipper").children);
	sides.forEach((side) => {
		side.addEventListener("click", (e) => {
			if (e.target.id !== "bio-btn") {
				handleFlip(flip_container);
			}
		});
	});
	carouselItem
		.querySelector("#validate-button")
		.addEventListener("click", () => {
			handleValidateButtonClick();
		});

	let bioBtn = carouselItem.querySelector("#bio-btn");
	if (bioBtn) {
		bioBtn.addEventListener("click", () => {
			const bio = document.querySelector(".bio-overlay");
			const selectedPlayerName = document
				.querySelector(".carousel-item.focused")
				?.querySelector("h1")?.textContent;
			const player = playersData.find(
				(player) => player.NOM === selectedPlayerName
			);
			bio.querySelector("h2").textContent = player.NOM;
			bio.querySelector("p").innerHTML = player.BIO;
			bio.style.display = player ? "flex" : "none";

			const closeBio = document.querySelector("#close-bio");
			if (closeBio) {
				closeBio.addEventListener("click", () => {
					bio.style.display = "none";
				});
			}
		});
	} else {
		console.log("bio-btn not found");
	}
	return carouselItem;
}

var shareBlock;

function hideShareBlock() {
	shareBlock.style.transform = "translateY(100%) ";
	shareBlock.style.opacity = "0";
	shareBlock.style.transition =
		"transform 0.3s ease-in, opacity 0.2s ease-in";
	shareBlock.classList.remove("visible");
}

function showShareBlock() {
	document.querySelectorAll(".share-icons_item").forEach((item) => {
		item.addEventListener("click", handleShareUrl);
	});
	document.querySelector(".share-icons").addEventListener("click", () => {
		handleShareUrl();
	});
	shareBlock.style.transform = "translateY(-10%) ";
	shareBlock.style.opacity = "1";
	shareBlock.style.transition =
		"transform 0.3s ease-out, opacity 0.2s ease-out";
	shareBlock.classList.add("visible");
	document
		.querySelector("#share")
		.addEventListener("click", function (event) {
			event.stopPropagation();
			showShareBlock();
		});
	document.addEventListener("click", function (event) {
		if (
			!shareBlock.contains(event.target) &&
			shareBlock.classList.contains("visible")
		) {
			hideShareBlock();
		}
	});
}

function handleShareUrl() {
	let playersArray = Object.entries(players).map(
		([key, value]) =>
			`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
	);
	const captain = localStorage.getItem("captain");
	let params = playersArray.join("&");
	let shareUrl = new URL(window.location.href);
	shareUrl.search = `players=${encodeURIComponent(
		params
	)}&captain=${encodeURIComponent(captain)}`;

	navigator.clipboard.writeText(shareUrl.toString()).then(
		function () {
			console.log("URL copied to clipboard");
			console.log(shareUrl.toString());
		},
		function () {
			console.log("Error copying URL to clipboard");
		}
	);
}

document.addEventListener("DOMContentLoaded", () => {
	shareBlock = document.querySelector(".share-block");
	document.querySelector("#share").addEventListener("click", function () {
		if (shareBlock.classList.contains("visible")) {
			hideShareBlock();
		} else {
			showShareBlock();
		}
	});
	interact(".share-block").draggable({
		onmove: function (event) {
			var target = shareBlock,
				// keep the dragged position in the data-x/data-y attributes
				y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

			// translate the element
			target.style.webkitTransform = target.style.transform =
				"translateY(" + y + "px)";

			// update the position attributes
			target.setAttribute("data-y", y);
		},
		onend: function () {
			var target = shareBlock;
			if (
				parseInt(target.getAttribute("data-y")) > 10 ||
				parseInt(target.getAttribute("data-y")) < -10
			) {
				hideShareBlock();
			}
		},
	});
});

function handleCarouselAnimation() {
	const carousel = document.querySelector(".carousel");
	const flipContainers = document.querySelectorAll(".flip-container");
	flipContainers.forEach((item) => {
		if (
			!item.parentElement.classList.contains("focused") &&
			!item.parentElement.classList.contains("unfocused")
		) {
			if (item.style.animationName === "shrinkAnimation") {
				item.style.animationName = "growBack";
			} else if (
				item.style.animationName === "growBack" ||
				item.style.animationName === ""
			) {
				item.style.animationName = "shrinkAnimation";
			}
		}
	});
	document.querySelectorAll(".carousel-grid").forEach((item) => {
		item.addEventListener("animationend", () => {
			if (
				item.style.animationName === "slideOut" ||
				item.style.animationName === ""
			) {
				item.style.visibility = "hidden";
			} else if (item.style.animationName === "slideIn") {
				item.style.visibility = "visible";
			}
		});

		if (item.style.animationName === "slideOut") {
			item.style.animationName = "slideIn";
			item.style.visibility = "visible";
		} else if (
			item.style.animationName === "slideIn" ||
			item.style.animationName === ""
		) {
			item.style.animationName = "slideOut";
		}
	});
}

function handleFlip(element) {
	if (element.parentElement.classList.contains("focused")) {
		element.classList.toggle("flip");
		let carouBtn = document.querySelector("#carou-btn");
		if (element.classList.contains("flip")) {
			carouBtn.style.opacity = "0";
		} else {
			carouBtn.style.opacity = "1";
		}
		handleCarouselAnimation();
		document.querySelectorAll("#validate-button").forEach((val_btn) => {
			if (val_btn.style.opacity === "0") {
				setTimeout(() => {
					val_btn.style.opacity = "1";
				}, 210);
			} else {
				val_btn.style.opacity = "0";
			}
		});
	}
}

function handleCarouselScroll() {
	const carousel = document.querySelector(".carousel");
	const carouselItems = document.querySelectorAll(".carousel-item");
	const scrollPosition = carousel.scrollLeft;
	const itemWidth = carouselItems[0].offsetWidth;
	const carouselWidth = itemWidth * carouselItems.length;
	const middleIndex = Math.floor(carouselItems.length / 2);

	const focusedIndex = Math.round(
		(scrollPosition + itemWidth / 100000) / itemWidth
	);

	carouselItems.forEach((item, index) => {
		// Si l'élément a la classe 'focused', la retirer et ajouter la class 'unfocused'
		if (item.classList.contains("focused")) {
			item.classList.add("unfocused");
		}
		item.classList.remove("focused");
		// Si l'élément a la classe 'flip', la retirer
		const flipContainer = item.querySelector(".flip-container");
		if (flipContainer && flipContainer.classList.contains("flip")) {
			flipContainer.classList.remove("flip");
			handleCarouselAnimation();
			document.querySelectorAll("#validate-button").forEach((val_btn) => {
				if (val_btn.style.opacity === "0") {
					setTimeout(() => {
						val_btn.style.opacity = "1";
					}, 210);
				} else {
					val_btn.style.opacity = "0";
				}
			});
			let carouBtn = document.querySelector("#carou-btn");
			if (carouBtn.style.opacity === "0") {
				carouBtn.style.opacity = "1";
			} else {
				carouBtn.style.opacity = "0";
			}
		}
		// Si l'élément a la classe 'unfocused', la retirer
		if (item.classList.contains("unfocused")) {
			item.classList.remove("unfocused");
		}
	});

	// Ensure the focused index is within valid bounds
	const validFocusedIndex = Math.min(
		Math.max(focusedIndex, 0),
		carouselItems.length - 1
	);
	// Add the 'focused' class to the item
	carouselItems[validFocusedIndex].classList.add("focused");
}

function handleCompareClick() {
	//Open compare overlay with focused player
	const focusedItem = document.querySelector(".carousel-item.focused");
	const focusedPlayerName = focusedItem.querySelector("#name").textContent;
	const focusedPlayer = playersData.find(
		(player) => player.NOM === focusedPlayerName
	);

	const focusedPlayerCarte = focusedPlayer.CARTE;
	let poste = focusedPlayer.POSTE;
	const compareOverlay = document.querySelector(".compare-overlay");
	compareOverlay.style.display = "flex";
	const comparePlayers = document.querySelector(".compare-players");
	document.querySelector("#compare-subtitle").textContent = poste;
	comparePlayers.querySelector("#c-player").querySelector("img").src =
		"./img/compare.svg";
	comparePlayers
		.querySelector("#c-player")
		.querySelector("#validate-button").style.visibility = "hidden";
	comparePlayers
		.querySelector("#c-player")
		.querySelector("img")
		.addEventListener("click", () => {
			showCompareCarousel(focusedPlayer);
		});
	compareOverlay
		.querySelector("#f-player")
		.querySelector("img").src = `img/cartes/${focusedPlayerCarte}.webp`;
	resetBars();
	updateCompareOverlay();
	compareOverlay
		.querySelector("#f-player")
		.querySelector("#validate-button")
		.addEventListener("click", () => {
			updatePlayerElement(
				document.getElementById(selectedPlayerId),
				focusedPlayerName
			);
			document.querySelector(".compare-overlay").style.display = "none";
			document.querySelector("#compare-carousel").style.display = "none";
			document.querySelector(".carousel-overlay").style.display = "none";
		});
}

function showCompareCarousel(player) {
	//Show carousel with players to compare
	let poste = player.POSTE;
	const filteredPlayers = playersData.filter(
		(player) => player.POSTE === poste
	);

	const compare_carousel = document.querySelector("#compare-carousel");
	const carousel = compare_carousel.querySelector("#cmp-carou");
	compare_carousel.querySelector("#poste-title").textContent = poste;
	carousel.innerHTML = "";

	filteredPlayers.forEach((playert) => {
		if (playert.NOM === player.NOM) {
			return;
		}
		const carouselItemHTML = createCompareCarouselItem(playert);
		carousel.appendChild(carouselItemHTML);
	});

	document.querySelectorAll(".player1-bar").forEach((bar) => {
		bar.style.animationName = "";
	});
	document.querySelectorAll(".player2-bar").forEach((bar) => {
		bar.style.animationName = "";
	});

	document.querySelector("#compare-carousel").style.display = "flex";

	carousel.addEventListener("scroll", handleCompareScroll);

	// Wait for the next animation frame before scrolling to the middle item
	const middleItemIndex = Math.floor(carousel.children.length / 2);
	const middleItem = carousel.children[middleItemIndex];
	const scrollPosition = middleItem.offsetLeft - middleItem.offsetWidth / 2;
	carousel.scrollTo({
		left: scrollPosition,
		behavior: "smooth",
	});
}

function createCompareCarouselItem(player) {
	const carouselItem = document.createElement("div");
	carouselItem.classList.add("compare-carousel-item");
	carouselItem.innerHTML = `
		<img class="carte-img" src="img/cartes/${player.CARTE}.webp" alt="Photo de ${player.NOM}" />
		<h1 id="name" style="display: none">${player.NOM}</h1>
	`;

	carouselItem.addEventListener("click", () => {
		const comparePlayerName =
			carouselItem.querySelector("#name").textContent;
		const comparePlayer = playersData.find(
			(player) => player.NOM === comparePlayerName
		);
		updateCompareOverlay(comparePlayer);
		document.querySelector("#compare-carousel").style.display = "none";

		let c_player = document
			.querySelector(".compare-overlay")
			.querySelector("#c-player");
		c_player.querySelector(
			"img"
		).src = `img/cartes/${comparePlayer.CARTE}.webp`;
		c_player.querySelector("#validate-button").style.visibility = "visible";
		c_player
			.querySelector("#validate-button")
			.addEventListener("click", () => {
				updatePlayerElement(
					document.getElementById(selectedPlayerId),
					comparePlayer.NOM
				);
				document.querySelector(".compare-overlay").style.display =
					"none";
				document.querySelector("#compare-carousel").style.display =
					"none";
				document.querySelector(".carousel-overlay").style.display =
					"none";
			});
	});

	return carouselItem;
}

function updateCompareOverlay(comparePlayer) {
	comparePlayer = comparePlayer || {
		MATCHS: 0,
		BUTS: 0,
		champ_fr: 0,
		tr_champ: 0,
		cp_fr: 0,
		lig_champ: 0,
		TAILLE: 0,
	};

	// Récupérer les données du joueur actuellement en focus
	const focusedItem = document.querySelector(".carousel-item.focused");
	const focusedPlayerName = focusedItem.querySelector("#name").textContent;
	const focusedPlayer = playersData.find(
		(player) => player.NOM === focusedPlayerName
	);
	const compare_buts = document.querySelector("#compare-buts");
	if (focusedPlayer.POSTE == "GARDIEN") {
		compare_buts.textContent = "CLEANSHEET";
	} else {
		compare_buts.textContent = "BUTS";
	}

	//calculer total coupes
	let focusedCoupes =
		(isNaN(parseInt(focusedPlayer.champ_fr))
			? 0
			: parseInt(focusedPlayer.champ_fr)) +
		(isNaN(parseInt(focusedPlayer.tr_champ))
			? 0
			: parseInt(focusedPlayer.tr_champ)) +
		(isNaN(parseInt(focusedPlayer.cp_fr))
			? 0
			: parseInt(focusedPlayer.cp_fr)) +
		(isNaN(parseInt(focusedPlayer.lig_champ))
			? 0
			: parseInt(focusedPlayer.lig_champ));

	let comparePlayerCoupes =
		(isNaN(parseInt(comparePlayer.champ_fr))
			? 0
			: parseInt(comparePlayer.champ_fr)) +
		(isNaN(parseInt(comparePlayer.tr_champ))
			? 0
			: parseInt(comparePlayer.tr_champ)) +
		(isNaN(parseInt(comparePlayer.cp_fr))
			? 0
			: parseInt(comparePlayer.cp_fr)) +
		(isNaN(parseInt(comparePlayer.lig_champ))
			? 0
			: parseInt(comparePlayer.lig_champ));

	// ParseFloat pour éviter les problèmes de concaténation
	focusedPlayer.TAILLE = parseFloat(focusedPlayer.TAILLE);
	comparePlayer.TAILLE = parseFloat(comparePlayer.TAILLE);

	// Calculer les totaux
	let tot_matchs = focusedPlayer.MATCHS + comparePlayer.MATCHS;
	let tot_buts = focusedPlayer.BUTS + comparePlayer.BUTS;
	let tot_coupes = focusedCoupes + comparePlayerCoupes;
	let tot_taille = focusedPlayer.TAILLE + comparePlayer.TAILLE;

	// Mettre à jour les barres
	let matchs_bar = document.querySelector("#matchs-bar");
	let buts_bar = document.querySelector("#buts-bar");
	let coupes_bar = document.querySelector("#coupes-bar");
	let taille_bar = document.querySelector("#taille-bar");

	matchs_bar.querySelector(".player1-bar > .bar-score").textContent =
		focusedPlayer.MATCHS;
	matchs_bar.querySelector(".player2-bar > .bar-score").textContent =
		comparePlayer.MATCHS;
	if (
		matchs_bar.querySelector(".player2-bar > .bar-score").textContent != "0"
	) {
		matchs_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"visible";
	} else {
		matchs_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"hidden";
	}

	buts_bar.querySelector(".player1-bar > .bar-score").textContent =
		focusedPlayer.BUTS;
	buts_bar.querySelector(".player2-bar > .bar-score").textContent =
		comparePlayer.BUTS;
	if (
		buts_bar.querySelector(".player2-bar > .bar-score").textContent != "0"
	) {
		buts_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"visible";
	} else {
		buts_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"hidden";
	}

	coupes_bar.querySelector(".player1-bar > .bar-score").textContent =
		focusedCoupes;
	coupes_bar.querySelector(".player2-bar > .bar-score").textContent =
		comparePlayerCoupes;
	if (
		coupes_bar.querySelector(".player2-bar > .bar-score").textContent != "0"
	) {
		coupes_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"visible";
	} else {
		coupes_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"hidden";
	}

	taille_bar.querySelector(".player1-bar > .bar-score").textContent =
		focusedPlayer.TAILLE;
	taille_bar.querySelector(".player2-bar > .bar-score").textContent =
		comparePlayer.TAILLE;
	if (
		taille_bar.querySelector(".player2-bar > .bar-score").textContent != "0"
	) {
		taille_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"visible";
	} else {
		taille_bar.querySelector(".player2-bar > .bar-score").style.visibility =
			"hidden";
	}

	matchs_bar.querySelector(".player1-bar").style.width =
		tot_matchs !== 0
			? `${(focusedPlayer.MATCHS / tot_matchs) * 100}%`
			: "0%";
	matchs_bar.querySelector(".player2-bar").style.width =
		tot_matchs !== 0
			? `${(comparePlayer.MATCHS / tot_matchs) * 100}%`
			: "0%";

	buts_bar.querySelector(".player1-bar").style.width =
		tot_buts !== 0 ? `${(focusedPlayer.BUTS / tot_buts) * 100}%` : "0%";
	buts_bar.querySelector(".player2-bar").style.width =
		tot_buts !== 0 ? `${(comparePlayer.BUTS / tot_buts) * 100}%` : "0%";

	coupes_bar.querySelector(".player1-bar").style.width =
		tot_coupes !== 0 ? `${(focusedCoupes / tot_coupes) * 100}%` : "0%";
	coupes_bar.querySelector(".player2-bar").style.width =
		tot_coupes !== 0
			? `${(comparePlayerCoupes / tot_coupes) * 100}%`
			: "0%";

	taille_bar.querySelector(".player1-bar").style.width =
		tot_taille !== 0
			? `${(focusedPlayer.TAILLE / tot_taille) * 100}%`
			: "0%";
	taille_bar.querySelector(".player2-bar").style.width =
		tot_taille !== 0
			? `${(comparePlayer.TAILLE / tot_taille) * 100}%`
			: "0%";

	// Animer les barres
	document.querySelectorAll(".player1-bar").forEach((bar) => {
		bar.style.animationName = "scaleSide";
	});
	document.querySelectorAll(".player2-bar").forEach((bar) => {
		bar.style.animationName = "scaleSide";
	});
}

function resetBars() {
	document.querySelectorAll("player1-bar").forEach((bar) => {
		bar.style.width = "0%";
		bar.querySelector(".bar-score").textContent = "0";
	});

	document.querySelectorAll("player2-bar").forEach((bar) => {
		bar.style.width = "0%";
		bar.querySelector(".bar-score").textContent = "0";
		bar.querySelector(".bar-score").style.visibility = "hidden";
		bar.style.animationName = "";
	});
}

function handleCompareScroll() {
	const carousel = document.querySelector("#cmp-carou");
	const carouselItems = document.querySelectorAll(".compare-carousel-item");
	const scrollPosition = carousel.scrollLeft;
	const itemWidth = carouselItems[0].offsetWidth;
	const carouselWidth = itemWidth * carouselItems.length;
	const middleIndex = Math.floor(carouselItems.length / 2);

	const focusedIndex = Math.round(
		(scrollPosition + itemWidth / 100000) / itemWidth
	);

	carouselItems.forEach((item) => {
		// Si l'élément a la classe 'focused', la retirer et ajouter la class 'unfocused'
		if (item.classList.contains("focus")) {
			item.classList.add("unfocused");
		}
		item.classList.remove("focus");
		// Si l'élément a la classe 'unfocused', la retirer
		if (item.classList.contains("unfocused")) {
			item.classList.remove("unfocused");
		}
	});

	// Ensure the focused index is within valid bounds
	const validFocusedIndex = Math.min(
		Math.max(focusedIndex, 0),
		carouselItems.length - 1
	);
	carouselItems[validFocusedIndex].classList.add("focus");
}

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
		if (localStorage.getItem("isFirstCall") === "true") {
			localStorage.setItem("isFirstCall", "false");
			document.querySelector("#fufu").play();
		}
	}
}

function closeCompareCarousel() {
	document.querySelector("#compare-carousel").style.display = "none";
}

function closeCompareOverlay() {
	document.querySelector(".compare-overlay").style.display = "none";
}

function closeCarouselOverlay() {
	document.querySelector(".carousel-overlay").style.display = "none";
}

function closeBioOverlay() {
	document.querySelector(".bio-overlay").style.display = "none";
}

function closeCaptainOverlay() {
	document.querySelector("#captain").style.display = "none";
}

window.addEventListener("load", function () {
	var creditsButton = document.getElementById("credits");
	var overlay = document.getElementById("credit-overlay");

	creditsButton.addEventListener("click", function () {
		overlay.style.display = "flex";
	});

	document
		.getElementById("close-credits")
		.addEventListener("click", function () {
			overlay.style.display = "none";
		});
});
