"use strict";

let isAnyItemFlipped = false;
let selectedPlayerId = null;
let updatePlayerElement;
let playersData;

window.onload = fetch("./data/DataBase.json")
	.then((response) => response.json())
	.then((players) => {
		playersData = players;
		initizalizePage();
	});

function initizalizePage() {
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
		const playerNames = document.querySelectorAll(".player-name");
		playerNames.forEach((playerName) => {
			const overflow = playerName.scrollWidth - playerName.clientWidth;
			if (overflow > 0) {
				playerName.style.transform = `translateX(-${overflow / 2}px)`;
			}
		});
	};

	const urlParams = new URLSearchParams(window.location.search);
	const playersParam = urlParams.get("players");
	console.log(`URL parameters: ${playersParam}`);
	const storedPlayers = JSON.parse(localStorage.getItem("players"));

	if (playersParam !== null) {
		const players = playersParam.split("&");
		localStorage.clear();
		console.log("Cleared local storage");
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
				console.log(`No element found with id ${playerId}`);
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
				console.log(`No element found with id ${playerId}`);
			}
		}
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

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".player-clickable").forEach((player) => {
		player.addEventListener("click", handlePlayerClick);
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

	document.querySelector("#settings").addEventListener("click", () => {
		const menu = document.querySelector(".dropdown");
		if (
			menu.style.animationName === "dropDownAnimation" ||
			menu.style.animationName === ""
		) {
			menu.style.animationName = "dropUpAnimation";
		} else {
			menu.style.animationName = "dropDownAnimation";
		}
	});

	document.querySelector("#compare-btn").addEventListener("click", () => {
		handleCompareClick();
	});
});

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
	event.target.classList.add("player-animation");
	showCarousel(event.target.id);
	event.target.addEventListener("animationend", () =>
		event.target.classList.remove("player-animation")
	);
	selectedPlayerId = event.currentTarget.id;
	if (selectedPlayerId == null) {
		console.log("No player selected");
	}
	console.log(`Selected player: ${selectedPlayerId}`);
}

function showCarousel(id) {
	const poste = getPositionFromId(id);

	const filteredPlayers = playersData.filter(
		(player) => player.POSTE === poste
	);
	console.log(
		`Found ${filteredPlayers.length} players for position ${poste}`
	);

	const carousel = document.querySelector(".carousel");
	carousel.innerHTML = "";

	filteredPlayers.forEach((player) => {
		const carouselItemHTML = createCarouselItem(player);
		console.log(`Created carousel item: ${carouselItemHTML}`);
		carousel.appendChild(carouselItemHTML);
	});

	document.querySelector(".carousel-overlay").style.display = "flex";
	document.getElementById("poste-title").textContent = poste;

	// Wait for the next animation frame before scrolling to the middle item
	const middleItemIndex = Math.floor(carousel.children.length / 2);
	const middleItem = carousel.children[middleItemIndex];
	const scrollPosition = middleItem.offsetLeft - middleItem.offsetWidth / 2;
	carousel.scrollTo({
		left: scrollPosition,
		behavior: "smooth",
	});

	middleItem.classList.add("focused");

	isAnyItemFlipped = Array.from(
		document.querySelectorAll(".flip-container")
	).some((el) => el.classList.contains("flip"));

	if (isAnyItemFlipped) {
		handleCarouselAnimation();
	}

	document
		.querySelector(".carousel")
		.addEventListener("scroll", handleCarouselScroll);
}

function handleValidateButtonClick() {
	const selectedPlayer = document.querySelector(".carousel-item.focused");
	const selectedPlayerName =
		selectedPlayer.querySelector("#name").textContent;
	console.log(selectedPlayerName);
	console.log(selectedPlayerId);
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
		item.classList.remove("selected");
	});
	document.querySelector(".carousel-overlay").style.display = "none";
	selectedPlayerId = null;

	if (areAllPlayersSelected()) {
		console.log("Tous les joueurs ont été sélectionnés");
		document.querySelector("#share").style.display = "flex";
		document.querySelector("#captain").style.display = "flex";
		setTimeout(() => {
			document.addEventListener("click", function () {
				document.querySelector("#captain").style.display = "none";
			});
		}, 1000);
	}
}

function getPositionFromId(id) {
	console.log(`Getting position from id: ${id}`); // Log the input
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
			position = "MILIEU OFF D";
			break;
		case elementId.includes("ailier-gauche"):
			position = "MILIEU OFF";
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
			position = "ATTAQUANT";
			break;
		case elementId.includes("midfielder-1"):
			position = "MILIEU DÉF G";
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
	console.log(`Position for id ${id} is ${position}`); // Log the result
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
	console.log(carte);
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
			<p class="small-title green">${player.MATCHS}</p>
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
			<p class="small-title green">${player.BUTS}</p>
			<div class="flex-row">
				<div class="circle-container" style="width:20%">
					<div id="circle1"></div>
				</div>
				<div class="circle-container" style="width:30%">
					<div id="circle2"></div>
				</div>
				<div class="circle-container" style="width:50%">
					<div id="circle3"></div>
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> ${but} </p>
		</div>
		<div class="carousel-coupes">
			<div class="coupes">
				<div class="cp-col">
					<p class="small-title green">${player.champ_fr}</p>
					${champ_fr}
				</div>
				<div class="cp-col">
					<p class="small-title green">${player.tr_champ}</p>
					${tr_champ}
				</div>
				<div class="cp-col">
					<p class="small-title green">${player.cp_fr}</p>
					${cp_fr}
				</div>
				<div class="cp-col">
					<p class="small-title green">${player.lig_champ}</p>
					${lig_champ}
				</div>
			</div>
			<p class="stat-name"><span class="green">NOMBRE DE</span> COUPES </p>
		</div>
		<div class="carousel-taille">
			<p class="small-title green">${player.TAILLE}</p>
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
	const matchs = player.MATCHS; // Remplacez ceci par le nombre de matchs du joueur

	const bar1 = carouselItem.querySelector("#bar1");
	const bar2 = carouselItem.querySelector("#bar2");
	const bar3 = carouselItem.querySelector("#bar3");
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
		circle1.style.backgroundColor = player.BUTS >= 1 ? "#00a55a" : "white";
		circle2.style.backgroundColor =
			player.BUTS >= 100 ? "#00a55a" : "white";
		circle3.style.backgroundColor =
			player.BUTS >= 200 ? "#00a55a" : "white";
	}

	bar1.style.backgroundColor = matchs >= 36 ? "#00a55a" : "white";
	bar2.style.backgroundColor = matchs >= 200 ? "#00a55a" : "white";
	bar3.style.backgroundColor = matchs >= 400 ? "#00a55a" : "white";

	bar4.style.backgroundColor = player.TAILLE >= 1.5 ? "#00a55a" : "white";
	bar5.style.backgroundColor = player.TAILLE >= 1.6 ? "#00a55a" : "white";
	bar6.style.backgroundColor = player.TAILLE >= 1.7 ? "#00a55a" : "white";
	bar7.style.backgroundColor = player.TAILLE >= 1.8 ? "#00a55a" : "white";
	bar8.style.backgroundColor = player.TAILLE >= 1.9 ? "#00a55a" : "white";

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
	let params = playersArray.join("&");
	let shareUrl = new URL(window.location.href);
	shareUrl.search = `players=${encodeURIComponent(params)}`;

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

let comparePlayerMatchs = 0;
let comparePlayerButs = 0;
let comparePlayerCoupes = 0;
let comparePlayerTaille = 0;

function handleCompareClick() {
	//Open compare overlay with focused player
	const focusedItem = document.querySelector(".carousel-item.focused");
	const focusedPlayerName = focusedItem.querySelector("#name").textContent;
	const focusedPlayer = playersData.find(
		(player) => player.NOM === focusedPlayerName
	);

	const focusedPlayerMatchs = focusedPlayer.MATCHS;
	const focusedPlayerButs = focusedPlayer.BUTS;
	const focusedPlayerCoupes = parseFloat(
		focusedPlayer.champ_fr +
			focusedPlayer.tr_champ +
			focusedPlayer.cp_fr +
			focusedPlayer.lig_champ
	);
	const focusedPlayerTaille = parseFloat(focusedPlayer.TAILLE);
	const focusedPlayerCarte = focusedPlayer.CARTE;

	const compareOverlay = document.querySelector(".compare-overlay");
	compareOverlay.style.display = "flex";
	const comparePlayers = document.querySelector(".compare-players");

	comparePlayers
		.querySelector("#c-player")
		.querySelector("img")
		.addEventListener("click", () => {
			showCompareCarousel(selectedPlayerId);
		});
	compareOverlay
		.querySelector("#f-player")
		.querySelector("img").src = `img/cartes/${focusedPlayerCarte}.webp`;

	let matchs_bar = compareOverlay.querySelector("#matchs-bar");
	let buts_bar = compareOverlay.querySelector("#buts-bar");
	let coupes_bar = compareOverlay.querySelector("#coupes-bar");
	let taille_bar = compareOverlay.querySelector("#taille-bar");

	let tot_matchs = focusedPlayerMatchs + comparePlayerMatchs;
	let tot_buts = focusedPlayerButs + comparePlayerButs;
	let tot_coupes = focusedPlayerCoupes + comparePlayerCoupes;
	let tot_taille = focusedPlayerTaille + comparePlayerTaille;

	matchs_bar.querySelector(".player1-bar").style.width =
		tot_matchs !== 0
			? `${(focusedPlayerMatchs / tot_matchs) * 100}%`
			: "0%";
	matchs_bar.querySelector(".player2-bar").style.width =
		tot_matchs !== 0
			? `${(comparePlayerMatchs / tot_matchs) * 100}%`
			: "0%";

	buts_bar.querySelector(".player1-bar").style.width =
		tot_buts !== 0 ? `${(focusedPlayerButs / tot_buts) * 100}%` : "0%";
	buts_bar.querySelector(".player2-bar").style.width =
		tot_buts !== 0 ? `${(comparePlayerButs / tot_buts) * 100}%` : "0%";

	coupes_bar.querySelector(".player1-bar").style.width =
		tot_coupes !== 0
			? `${(focusedPlayerCoupes / tot_coupes) * 100}%`
			: "0%";
	coupes_bar.querySelector(".player2-bar").style.width =
		tot_coupes !== 0
			? `${(comparePlayerCoupes / tot_coupes) * 100}%`
			: "0%";

	taille_bar.querySelector(".player1-bar").style.width =
		tot_taille !== 0
			? `${(focusedPlayerTaille / tot_taille) * 100}%`
			: "0%";
	taille_bar.querySelector(".player2-bar").style.width =
		tot_taille !== 0
			? `${(comparePlayerTaille / tot_taille) * 100}%`
			: "0%";
}

function showCompareCarousel(player) {
	//Show carousel with players to compare

	const poste = getPositionFromId(selectedPlayerId);

	const filteredPlayers = playersData.filter(
		(player) => player.POSTE === poste
	);

	const carousel = document.querySelector("#compare-carousel");
	carousel.innerHTML = "";

	filteredPlayers.forEach((player) => {
		const carouselItemHTML = createCarouselItem(player);
		carousel.appendChild(carouselItemHTML);
	});

	document.querySelector("#compare-carousel-overlay").style.display = "flex";
	document.getElementById("compare-subtitle").textContent = poste;

	// Wait for the next animation frame before scrolling to the middle item
	const middleItemIndex = Math.floor(carousel.children.length / 2);
	const middleItem = carousel.children[middleItemIndex];
	const scrollPosition = middleItem.offsetLeft - middleItem.offsetWidth / 2;
	carousel.scrollTo({
		left: scrollPosition,
		behavior: "smooth",
	});

	middleItem.classList.add("focused");
}

function createCompareCarouselItem(player) {
	const carouselItem = document.createElement("div");
	carouselItem.classList.add("compare-carousel-item");
	carouselItem.innerHTML = `
		<div>
			<img class="carte-img" src="img/cartes/${player.CARTE}.webp" alt="Photo de ${player.NOM}" />
			<h1 id="name" style="display: none">${player.NOM}</h1>
		</div>
	`;

	carouselItem.addEventListener("click", () => {
		document.querySelector("#compare-carousel").style.display = "none";
	});

	return carouselItem;
}

function handleCaptain() {}

if (areAllPlayersSelected()) {
	console.log("Tous les joueurs ont été sélectionnés");
	document.querySelector("#share").style.display = "flex";
}

//Compare Section
let team1Possession = 60; // Remplacez par la possession réelle de l'équipe 1
let team2Possession = 40; // Remplacez par la possession réelle de l'équipe 2

document.querySelector(".player1-bar").style.width = `${team1Possession}%`;
document.querySelector(".player2-bar").style.width = `${team2Possession}%`;
