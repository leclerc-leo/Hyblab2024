"use strict";

let selectedPlayerId = null;

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

window.addEventListener("load", function () {
	// Récupérer les joueurs du localStorage
	const storedPlayers = JSON.parse(localStorage.getItem("players"));
	console.log(storedPlayers);
	// Parcourir chaque joueur stocké
	for (const playerId in storedPlayers) {
		// Récupérer le nom du joueur
		const playerName = storedPlayers[playerId];
		// Récupérer l'élément du terrain correspondant à l'id du joueur
		const playerElement = document.getElementById(playerId);
		if (playerElement && playerName !== "") {
			// Mettre à jour le terrain avec le nom du joueur
			fetch("./data/DataBase.json")
				.then((response) => response.json())
				.then((players) => {
					const player = players.find(
						(player) => player.NOM === playerName
					);
					if (player.NUMÉRO !== undefined) {
						document
							.getElementById(playerId)
							.setAttribute("data-number", player.NUMÉRO);
					}
				});
			playerElement;
			playerElement.innerHTML = `
			<img src="./img/jersey.svg" alt="jersey" />
			<p class="player-name">${playerName}</p>
			`;
		} else {
			console.log(`No element found with id ${playerId}`);
		}
	}
});

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

document.querySelector("#bio-btn").addEventListener("click", () => {
	let bio = document.querySelector(".bio-overlay");
	const selectedPlayer = document.querySelector(".carousel-item.selected");
	if (selectedPlayer) {
		const selectedPlayerName =
			selectedPlayer.querySelector("h1").textContent;
		fetch("./data/DataBase.json")
			.then((response) => response.json())
			.then((players) => {
				const player = players.find(
					(player) => player.NOM === selectedPlayerName
				);
				if (player) {
					bio.querySelector("h2").textContent = player.NOM;
					bio.querySelector("p").innerHTML = player.BIO;
					bio.style.display = "flex";
				} else {
					console.log(
						`No player found with name ${selectedPlayerName}`
					);
				}
			});
	} else {
		console.log("No player selected");
	}
});

document.querySelector("#close-bio").addEventListener("click", () => {
	document.querySelector(".bio-overlay").style.display = "none";
});

function areAllPlayersSelected() {
	for (const playerId in players) {
		if (players[playerId] === "") {
			return false;
		}
	}
	return true;
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

async function showCarousel(id) {
	const poste = getPositionFromId(id);

	try {
		const response = await fetch("./data/DataBase.json");
		const players = await response.json();

		const filteredPlayers = players.filter(
			(player) => player.POSTE === poste
		);
		console.log(
			`Found ${filteredPlayers.length} players for position ${poste}`
		);

		const carousel = document.querySelector(".carousel");
		carousel.innerHTML = "";

		filteredPlayers.forEach((player) => {
			const carouselItemHTML = createCarouselItem(player);
			document
				.getElementById(selectedPlayerId)
				.setAttribute("data-number", player.NUMÉRO);
			console.log(`Created carousel item: ${carouselItemHTML}`);
			carousel.appendChild(carouselItemHTML);
		});

		document.querySelector(".carousel-overlay").style.display = "flex";
		document.getElementById("poste-title").textContent = poste;
		handleCarouselItemClick();

		// Wait for the next animation frame before scrolling to the middle item
		requestAnimationFrame(() => {
			const middleItemIndex = Math.floor(carousel.children.length / 2);
			const middleItem = carousel.children[middleItemIndex];
			const scrollPosition =
				middleItem.offsetLeft * middleItemIndex -
				middleItem.offsetWidth / 2;
			carousel.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		});

		const isAnyItemFlipped = Array.from(
			document.querySelectorAll(".flip-container")
		).some((el) => el.classList.contains("flip"));
		if (isAnyItemFlipped) {
			handleGridAnimation();
		}

		// Add event listeners after the carousel items are loaded
		document.querySelectorAll(".carousel-item").forEach((item) => {
			item.addEventListener("click", handleCarouselItemClick);
		});
	} catch (error) {
		console.error("Error fetching players", error);
	}

	document
		.querySelector(".carousel")
		.addEventListener("scroll", handleCarouselScroll);
}

function handleValidateButtonClick() {
	const selectedPlayer = document.querySelector(".carousel-item.selected");
	const selectedPlayerName =
		selectedPlayer.querySelector("#name").textContent;
	console.log(selectedPlayerName);
	console.log(selectedPlayerId);
	//Add the player to the list of selected players
	players[selectedPlayerId] = selectedPlayerName;
	//Save the list of selected players to local storage
	localStorage.setItem("players", JSON.stringify(players));
	//Update the field with the selected player
	document.getElementById(selectedPlayerId).innerHTML = `
	<img src="./img/jersey.svg" alt="jersey" />
	<p>${selectedPlayerName}</p>
	`;
	selectedPlayerName;
	document.getElementById(selectedPlayerId).innerHTML = `
	<img src="./img/jersey.svg" alt="jersey" />
	<p class="player-name">${selectedPlayerName}</p>
	`;
	//Hide the carousel
	document.querySelectorAll(".carousel-item").forEach((item) => {
		item.classList.remove("selected");
	});
	if (areAllPlayersSelected()) {
		console.log("Tous les joueurs ont été sélectionnés");
		document.querySelector("#share").style.display = "block";
	}
	document.querySelector(".carousel-overlay").style.display = "none";
	selectedPlayerId = null;
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
	// if (carte == "" || carte == "fcn-" || carte == "fcn") {
	// 	carte = "NA";
	// 	carouselItem.innerHTML = `
	// 	<div style="
	// 	height: 45%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;">
	//     <img class= "carte-img" src="img/cartes/${carte}.webp" alt="Photo de ${player.NOM}" />
	//     <h1 class="green small-title" style="background-color: hsla(240, 14%, 14%, 0.9); border-radius: 10px; padding: 10px">${player.NOM}</h1>
	// 	</div>
	//     <div class="carousel-grid">
	//         <div class="carousel-matchs">
	//             <p class="small-title green">${player.MATCHS}</p>
	// 			<div class="flex-row">
	// 				<div class="bar-container">
	// 					<div id="bar1" class="bar"></div>
	// 				</div>
	// 				<div class="bar-container">
	// 					<div id="bar2" class="bar"></div>
	// 				</div>
	// 				<div class="bar-container">
	// 					<div id="bar3" class="bar"></div>
	// 				</div>
	// 			</div>
	//             <p class="stat-name"><span class="green">NOMBRE DE</span> MATCHS </p>
	//         </div>
	//         <div class="carousel-buts">
	//             <p class="small-title green">${player.BUTS}</p>
	//             <p class="stat-name"><span class="green">NOMBRE DE</span> ${but} </p>
	//         </div>
	//         <div class="carousel-coupes">
	//             <div class="coupes">
	// 				<div class="cp-col">
	// 					<p class="small-title green" style="align-self:flex-start">${player.champ_fr}</p>
	// 					${champ_fr}
	// 				</div>
	// 				<div class="cp-col">
	// 					<p class="small-title green">${player.tr_champ}</p>
	// 					${tr_champ}
	// 				</div>
	// 				<div class="cp-col">
	// 					<p class="small-title green">${player.cp_fr}</p>
	// 					${cp_fr}
	// 				</div>
	// 				<div class="cp-col">
	// 					<p class="small-title green">${player.lig_champ}</p>
	// 					${lig_champ}
	// 				</div>
	// 			</div>
	//             <p class="stat-name"><span class="green">NOMBRE DE</span> COUPES </p>
	//         </div>
	//         <div class="carousel-taille">
	//             <p class="small-title green">${player.TAILLE}</p>
	//             <p class="stat-name"><span class="green">TAILLE EN</span> M </p>
	//         </div>
	//     </div>
	// `;

	// 	carouselItem.addEventListener("click", handleCarouselItemClick);

	// 	return carouselItem;
	// }
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
		<img class="carte-img" src="img/back_card.svg" alt="Bio de ${player.NOM}" />
			<p class="back-title">${player.NOM}</p>
			<p class="back-text">${player.DOS}}</p>
			<div class="buttons" id="bottom-btn">
				<button class="back-btn" id="back-overlay" title="close">
					<img src="./img/back-btn.svg" alt="close" />
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

	carouselItem.addEventListener("click", handleCarouselItemClick);
	carouselItem
		.querySelector("#validate-button")
		.addEventListener("click", () => {
			handleValidateButtonClick();
		});
	carouselItem
		.querySelector(".flip-container")
		.addEventListener("click", function () {
			handleFlip(this);
		});
	return carouselItem;
}

function handleCarouselItemClick(event) {
	console.log("Carousel item clicked");
	document.querySelectorAll(".carousel-item").forEach((item) => {
		item.classList.remove("selected");
	});
	event.currentTarget.classList.add("selected");
	console.log(
		"Selected class to:" +
			event.currentTarget.querySelector("h1").textContent
	);
	document.getElementById("validate-button").style.backgroundColor = "white";
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
	shareBlock.style.transform = "translateY(-10%) ";
	shareBlock.style.opacity = "1";
	shareBlock.style.transition =
		"transform 0.3s ease-out, opacity 0.2s ease-out";
	shareBlock.classList.add("visible");
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

function handleGridAnimation() {
	document.querySelectorAll(".carousel-grid").forEach((item) => {
		item.addEventListener("animationend", () => {
			if (
				item.style.animationName === "slideOut" ||
				item.style.animationName === ""
			) {
				item.style.display = "none";
			} else if (item.style.animationName === "slideIn") {
				item.style.display = "grid";
			}
		});

		if (item.style.animationName === "slideOut") {
			item.style.animationName = "slideIn";
			item.style.display = "block";
		} else if (
			item.style.animationName === "slideIn" ||
			item.style.animationName === ""
		) {
			item.style.animationName = "slideOut";
		}
	});
}

function handleFlip(element) {
	element.classList.toggle("flip");
	handleGridAnimation();
	document.querySelectorAll("#validate-button").forEach((item) => {
		if (item.style.display === "none") {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
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
		item.classList.remove("focused");
		// Si l'élément a la classe 'flip', la retirer
		const flipContainer = item.querySelector(".flip-container");
		if (flipContainer && flipContainer.classList.contains("flip")) {
			flipContainer.classList.remove("flip");
		}
	});

	// Ensure the focused index is within valid bounds
	const validFocusedIndex = Math.min(
		Math.max(focusedIndex, 0),
		carouselItems.length - 1
	);

	carouselItems[validFocusedIndex].classList.add("focused");
}
