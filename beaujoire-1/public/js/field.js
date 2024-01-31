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
	showCarousel(event.target.className);
	event.target.addEventListener("animationend", () =>
		event.target.classList.remove("player-animation")
	);
	selectedPlayerId = event.currentTarget.id;
	if (selectedPlayerId == null) {
		console.log("No player selected");
	}
	console.log(`Selected player: ${selectedPlayerId}`);
}

function showCarousel(className) {
	const poste = getPositionFromClassName(className);

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

function getPositionFromClassName(className) {
	if (className.includes("goalkeeper")) {
		return "GARDIEN";
	} else if (className.includes("forward")) {
		return "ATTAQUANT";
	} else if (className.includes("midfielder")) {
		return "MILIEU";
	} else if (className.includes("defender")) {
		return "DÉFENSEUR";
	} else if (className.includes("coach")) {
		return "ENTRAÎNEUR";
	}
	return "";
}

function createCarouselItem(player) {
	const carouselItem = document.createElement("div");
	carouselItem.classList.add("carousel-item");
	carouselItem.innerHTML = `
                <h2>${player.NOM}</h2>
                <p>Numéro: ${player.NUMÉRO}</p>
                <p>Durée: ${player.DURÉE}</p>
                <p>Matchs: ${player.MATCHS}</p>
                <p>Buts: ${player.BUTS || "N/A"}</p>
            `;

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
			event.currentTarget.querySelector("h2").textContent
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
