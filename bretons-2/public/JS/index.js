"use strict";

function page_accueil() {
	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";
	divTitle.style.flexDirection = "column";
	divTitle.style.alignItems = "center";
	divTitle.style.paddingTop = "6vh";

	const title = document.createElement("h1");
	title.style.fontSize = "9vh";
	title.innerHTML = "DÉCOUVREZ";
	title.style.width = "87%";

	const subtitle = document.createElement("h2");
	subtitle.innerHTML = "NOTRE QUESTIONNAIRE POUR SUIVRE<br>CEUX QUE VOUS AIMEZ";
	subtitle.style.fontSize = "6vh";
	subtitle.style.width = "87%";
	subtitle.style.marginTop = "-10px";

	divTitle.appendChild(title);
	divTitle.appendChild(subtitle);
	
	blank.appendChild(divTitle);

	const divParagraphe = document.createElement("div");
	divParagraphe.style.display = "flex";
	divParagraphe.style.justifyContent = "center";
	divParagraphe.style.paddingTop = "4vh";
	divParagraphe.width = "100%";

	const paragraphe = document.createElement("p");
	paragraphe.style.width = "87%";
	paragraphe.style.fontSize = "3vh";
	paragraphe.style.fontFamily = "Arial";
	paragraphe.style.lineHeight = "3vh";
	//paragraphe.style.fontWeight = "bold";
	paragraphe.innerHTML = "Découvrez et suivez vos sportifs bretons favoris dans leur parcours dans les Jeux Olympiques Paris 2024 !";

	divParagraphe.appendChild(paragraphe);
	blank.appendChild(divParagraphe);

	const divButton = document.createElement("div");
	divButton.style.display = "flex";
	divButton.style.justifyContent = "center";
	divButton.style.paddingTop = "5vh";

	const button = document.createElement("button");
	button.classList.add("btn");
	button.classList.add("btn-danger");
	button.setAttribute("style", "--bs-btn-font-size: 4vh; padding-left: 5vh; padding-right: 5vh; border-radius: 0px; background-color: #E20917;");
	button.textContent = "C'EST PARTI	 !";
	button.onclick = async () => {
		page_sport();
	}

	divButton.appendChild(button);
	blank.appendChild(divButton);
}

function page_sport(){

	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const retour = document.createElement("img");
	retour.src = "./Image/bouton-back.svg";
	retour.alt = "retour";
	retour.id = "retour";
	retour.onclick = () => {
		console.log("retour");
		page_accueil();
	}

	blank.appendChild(retour);

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";

	const title = document.createElement("h1");
	title.classList.add("title");
	title.innerHTML = "CHOISISSEZ<span style='color:#E20917'>\nVOTRE SPORT<span>";
	//title.style.fontWeight = "bold";
	title.style.zIndex = "2";
	title.style.position = "absolute";

	divTitle.appendChild(title);
	blank.appendChild(divTitle);

	const divSwipper = document.createElement("div");
	divSwipper.classList.add("swiper");

	const divSwipperWrapper = document.createElement("div");
	divSwipperWrapper.classList.add("swiper-wrapper");

	divSwipper.appendChild(divSwipperWrapper);

	blank.appendChild(divSwipper);

	["Football","Handball","Volleyball"].forEach(sport => {

		const slide = document.createElement("div");
		slide.classList.add("swiper-slide");
	
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.height = "100%";

		const iframe = document.createElement("iframe");
		
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");

		switch (sport) {
			case "Football":
				iframe.setAttribute("src", "https://lottie.host/embed/ae4d7ea9-f4b8-414c-9699-9d3955eccde7/BoMxTiQqmR.json");
				break;
			case "Handball":
				iframe.setAttribute("src", "https://lottie.host/embed/385ff92e-0691-4584-b86c-9a34a7ae4dc3/fxtOhwTAS2.json");
				break;
			case "Volleyball":
				iframe.setAttribute("src", "https://lottie.host/embed/09735584-ef44-4da6-8282-81ed9c919abe/3N1o8KjcYI.json");
				break;
			default:
				break;
		}

		div.appendChild(iframe);

		const button = document.createElement("button");
		button.classList.add("btn");
		button.classList.add("btn-dark");
		button.setAttribute("style", "--bs-btn-font-size: 4vh; margin-bottom: auto; padding-left: 5vh; padding-right: 5vh; border-radius: 0px; background-color: #141456; text-transform: uppercase");
		button.textContent = sport;
		button.onclick = () => {
			page_historique(sport);
		}

		div.appendChild(button);
	
		slide.appendChild(div);
	
		divSwipperWrapper.appendChild(slide);

	});

	

	const swiper = new Swiper('.swiper', {
		
		direction: 'horizontal',
		loop: true,
		mousewheel: true,
	
		// If we need pagination
		// pagination: {
		//   el: '.swiper-pagination',
		//   clickable: true,
		// }
	
		// scrollbar: {
		// 	el: '.swiper-scrollbar',
		// 	draggable: true,
		// },
	});
}

function page_historique(sport) {
	
	const athlete = {};

	fetch("./JSON/data.json")
	.then(response => response.json())
	.then(data => {
		for (const [a, dataAthlete] of Object.entries(data)) {
			if (dataAthlete.discipline == sport) {
				athlete[a] = dataAthlete;
				console.log(dataAthlete) // pour tester
			}
		}
	}).then(() => {
		console.log(athlete);

		const blank = document.querySelector("#blank");
		blank.innerHTML = ""; // clear

		const retour = document.createElement("img");
		retour.src = "./Image/bouton-back.svg";
		retour.alt = "retour";
		retour.id = "retour";
		retour.onclick = () => {
			page_sport();
		}

		blank.appendChild(retour);

		const divTitle = document.createElement("div");
		divTitle.id = "divTitle";

		const title = document.createElement("h1");
		title.classList.add("title");
		title.innerHTML = `HISTORIQUE<span style='color:red'>\n${sport.toUpperCase()}<span>`;
		//title.style.fontWeight = "bold";
		title.style.zIndex = "2";
		title.style.position = "absolute";

		divTitle.appendChild(title);
		blank.appendChild(divTitle);

		const divSwipper = document.createElement("div");
		divSwipper.classList.add("swiper");

		const divSwipperWrapper = document.createElement("div");
		divSwipperWrapper.classList.add("swiper-wrapper");

		divSwipper.appendChild(divSwipperWrapper);

		blank.appendChild(divSwipper);

		for (const [a, dataAthlete] of Object.entries(athlete)) {


			const slide = document.createElement("div");
			slide.classList.add("swiper-slide");
		
			const div = document.createElement("div");
			div.style.display = "flex";
			div.style.flexDirection = "column";
			div.style.justifyContent = "center";
			div.style.alignItems = "center";
			div.style.height = "100%";

			const video = document.createElement("video");

			video.src = './Videos/debut_fin.mp4';
			// video.autoplay = true;
			video.controle = true;
			video.controlsList = "nodownload";
			video.style.height = "40%";
			video.style.border = "0.5px solid black"; //à modifier ?

			const sourceMP4 = document.createElement("source");
			sourceMP4.src = './Videos/debut_fin.mp4';
			sourceMP4.type = 'video/mp4';

			const sourceWebM = document.createElement("source");
			sourceWebM.src = './IVideos/debut_fin.webm';
			sourceWebM.type = 'video/webm';

			video.oncanplay = ()=>{
				video.style.cursor = "pointer";
				const playButton = document.createElement("button");
				const playButtonImage = document.createElement("img");
				playButtonImage.src = "./Image/picto-button-video/play.svg";
				playButtonImage.alt = "Play"; 
				playButton.appendChild(playButtonImage);

				playButton.style.backgroundColor = "transparent";
				playButton.style.border = "none";
				playButton.style.cursor = "pointer";

				playButtonImage.style.width = "30px"; 
    			playButtonImage.style.height = "30px";

				playButton.style.border = "none"; 
				playButton.style.cursor = "pointer"; 
				playButton.style.position = "absolute"; 
				playButton.style.top = "50%"; 
				playButton.style.left = "50%"; 
				playButton.style.transform = "translate(-50%, -50%)";

				let isPlaying = false;

				playButton.addEventListener("click", function () {
					playButton.style.opacity = 1;

					if (!isPlaying) {
						video.play();
						playButtonImage.src = "./Image/picto-button-video/pause.svg";

						isPlaying = true;

						playButton.classList.add("fade-out");

						setTimeout(function () {
							playButton.style.opacity = 0; 
						}, 1000);
					} else {
						playButtonImage.src = "./Image/picto-button-video/play.svg"; 
						video.pause();

						isPlaying = false;

						playButton.classList.add("fade-out");
				
						setTimeout(function () {
							playButton.style.opacity = 0; 
						}, 1000);
					}
				});

				video.addEventListener("click", function () {
					playButton.style.opacity = 1;

					if (isPlaying) {
						playButtonImage.src = "./Image/picto-button-video/pause.svg"; 
						video.pause();

						isPlaying = false;

						// playButton.classList.add("fade-out");
				
						// setTimeout(function () {
						// 	playButton.style.opacity = 0; 
						// }, 1000);

						playButtonImage.src = "./Image/picto-button-video/play.svg"; 
					}
					else {
						playButtonImage.src = "./Image/picto-button-video/pause.svg"; 
						video.play();

						isPlaying = true;

						playButton.classList.add("fade-out");
				
						setTimeout(function () {
							playButton.style.opacity = 0; 
						}, 1000);
					}
				});

				// playButton.addEventListener("transitionend", function () {
				// 	playButton.style.display = "none";
				// });

				video.appendChild(sourceMP4);
				video.appendChild(sourceWebM);

				div.appendChild(video);
				div.appendChild(playButton);
				slide.appendChild(div);
				divSwipperWrapper.appendChild(slide);

			}
			
		}

		blank.appendChild(divSwipper);

		const swiperConfig = {
			centeredSlides: true,
		  }
	});
}

const myModal = new bootstrap.Modal('#modal')
const phone = document.getElementById("phone");
document.getElementById("menu-modal").onclick = () =>{
	myModal.show();
	phone.style.filter = "blur(4px)"

	myModal._element.addEventListener('hidden.bs.modal', () => {
        phone.style.filter = "";
    });
}

document.getElementById("retour-modal").onclick = () =>{
	myModal.hide();
}

//const modal = document.getElementById("modal");modal.addEventListener()
page_sport();
