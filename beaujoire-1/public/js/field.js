"use strict";

let selectedPlayerId = null;

document.querySelectorAll(".player-clickable").forEach((player) => {
	player.addEventListener("click", handlePlayerClick);
});

document.querySelector(".close").addEventListener("click", () => {
	document.querySelectorAll(".carousel-item").forEach((item) => {
		item.classList.remove("selected");
	});
	document.querySelector(".carousel-overlay").style.display = "none";
	selectedPlayerId = null;
});

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
				(player) => player.POSTE.toLowerCase() === poste.toLowerCase()
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
			position = "AILIER DROIT";
			break;
		case elementId.includes("ailier-gauche"):
			position = "AILIER GAUCHE";
			break;
		case elementId.includes("arriere-droit"):
			position = "ARRIÈRE DROIT";
			break;
		case elementId.includes("arriere-gauche"):
			position = "ARRIÈRE GAUCHE";
			break;
		case elementId.includes("midfielder-lead"):
			position = "MENEUR";
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
	let carte = player.CARTE;
	if (carte !== "") {
		carouselItem.innerHTML = `
            <img class= "carte-img" src="img/cartes/${
				player.CARTE
			}.png" alt="Photo de ${player.NOM}" />
            <h1 style="display : none">${player.NOM}</h1>
            <div class="carousel-grid">
                <div class="carousel-matchs">
                    <p class="small-title green">${player.MATCHS}</p>
                    <p><span class="green">NOMBRE DE</span> MATCH </p>
                </div>
                <div class="carousel-buts">
                    <p class="small-title green">${
						player.BUTS || "Guardien"
					}</p>
                    <p><span class="green">NOMBRE DE</span> BUT </p>
                </div>
                <div class="carousel-coupes">
                    <p class="small-title green">${player.COUPE}</p>
                    <p><span class="green">NOMBRE DE</span> COUPE </p>
                </div>
                <div class="carousel-taille">
                    <p class="small-title green">${player.TAILLE}</p>
                    <p><span class="green">TAILLE EN</span> M </p>
                </div>
            </div>
        `;
	} else {
		carouselItem.innerHTML = `
            <h1 style="display : none">${player.NOM}</h1>
            <p>Numéro: ${player.NUMÉRO}</p>
            <p>Durée: ${player.DURÉE}</p>
            <p>Matchs: ${player.MATCHS}</p>
            <p>Buts: ${player.BUTS || "N/A"}</p>
        `;
	}

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
			selectedPlayer.querySelector("h2").textContent;
		console.log(selectedPlayerName);
		document.getElementById(selectedPlayerId).textContent =
			selectedPlayerName;
		document.querySelector(".carousel-overlay").style.display = "none";
		selectedPlayerId = null;
	});
