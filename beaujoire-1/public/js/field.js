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
					document
						.getElementById(playerId)
						.setAttribute("data-number", player.NUMÉRO);
				});
			playerElement;
			playerElement.innerHTML = `
			<img src="./img/jersey.svg" alt="jersey" />
			<p>${playerName}</p>
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

function showCarousel(id) {
	const poste = getPositionFromId(id);

	fetch("./data/DataBase.json")
		.then((response) => response.json())
		.then((players) => {
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
		});
	document.querySelectorAll(".carousel-item").forEach((item) => {
		item.addEventListener("click", handleCarouselItemClick);
	});
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
			position = "11";
			break;
		case elementId.includes("ailier-gauche"):
			position = "7";
			break;
		case elementId.includes("attaquant-centre"):
			position = "9";
			break;
		case elementId.includes("arriere-droit"):
			position = "ARRIÈRE D";
			break;
		case elementId.includes("arriere-gauche"):
			position = "ARRIÈRE G";
			break;
		case elementId.includes("midfielder-lead"):
			position = "MENEUR";
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
	if (carte == "" || carte == "fcn-" || carte == "fcn") {
		carte = "NA";
		carouselItem.innerHTML = `
		<div style="
		height: 45%;
		display: flex;
		flex-direction: column;
		align-items: center;">
        <img class= "carte-img" src="img/cartes/${carte}.webp" alt="Photo de ${player.NOM}" />
        <h1 class="green small-title" style="background-color: hsla(240, 14%, 14%, 0.9); border-radius: 10px; padding: 10px">${player.NOM}</h1>
		</div>
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
                <p class="stat-name"><span class="green">NOMBRE DE</span> ${but} </p>
            </div>
            <div class="carousel-coupes">
                <div class="coupes">
					<div class="cp-col">
						<p class="small-title green" style="align-self:flex-start">${player.champ_fr}</p>
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
                <p class="stat-name"><span class="green">TAILLE EN</span> M </p>
            </div>
        </div>
    `;

		carouselItem.addEventListener("click", handleCarouselItemClick);

		return carouselItem;
	}
	carouselItem.innerHTML = `
        <img class= "carte-img" src="img/cartes/${player.CARTE}.webp" alt="Photo de ${player.NOM}" />
        <h1 style="display : none">${player.NOM}</h1>
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
                <p class="stat-name"><span class="green">TAILLE EN</span> M </p>
            </div>
        </div>
    `;
	const matchs = player.MATCHS; // Remplacez ceci par le nombre de matchs du joueur

	const bar1 = carouselItem.querySelector("#bar1");
	const bar2 = carouselItem.querySelector("#bar2");
	const bar3 = carouselItem.querySelector("#bar3");

	bar1.style.backgroundColor = matchs >= 36 ? "#00a55a" : "white";
	bar2.style.backgroundColor = matchs >= 200 ? "#00a55a" : "white";
	bar3.style.backgroundColor = matchs >= 400 ? "#00a55a" : "white";

	carouselItem.addEventListener("click", handleCarouselItemClick);

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
	document.getElementById("validate-button").style.display = "block";
}

document
	.getElementById("validate-button")
	.addEventListener("click", function () {
		const selectedPlayer = document.querySelector(
			".carousel-item.selected"
		);
		const selectedPlayerName =
			selectedPlayer.querySelector("h1").textContent;
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
		document.getElementById(selectedPlayerId).style.backgroundImage =
			'url("../img/jersey.svg");';
		//Hide the carousel
		document.querySelectorAll(".carousel-item").forEach((item) => {
			item.classList.remove("selected");
		});
		if (areAllPlayersSelected()) {
			console.log("Tous les joueurs ont été sélectionnés");
		}
		document.querySelector(".carousel-overlay").style.display = "none";
		selectedPlayerId = null;
	});
