"use strict";

let swiperSportInstance;

function page_accueil() {
	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";
	divTitle.style.flexDirection = "column";
	divTitle.style.alignItems = "center";
	divTitle.style.paddingTop = "6vh";
	divTitle.style.paddingLeft = "4vw";

	const imgPoingLeve = document.createElement("img");
	imgPoingLeve.id = "imgPoingLeve";
	imgPoingLeve.src = "./Image/Poing_leve.svg";
	imgPoingLeve.style.width = "8vw";
	imgPoingLeve.style.paddingRight = "3vw";
	imgPoingLeve.style.rotate = "-20deg";

	const imgPouceLeve = document.createElement("img");
	imgPouceLeve.id = "imgPouceLeve";
	imgPouceLeve.src = "./Image/Pouce_leve.svg";
	imgPouceLeve.style.width = "9vw";
	imgPouceLeve.style.paddingBottom = "6vh";
	imgPouceLeve.style.paddingLeft = "4vw";
	imgPouceLeve.style.rotate = "-30deg";

	const title = document.createElement("h1");
	title.style.fontSize = "9vh";
	title.innerHTML = "supportez";

	title.style.width = "87%";
	title.style.textAlign = "center";
	title.style.textTransform = "uppercase";

	const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.alignItems = "center";
	titleContainer.style.marginRight = "10vw";

	titleContainer.appendChild(imgPoingLeve);
	titleContainer.appendChild(title);
	titleContainer.appendChild(imgPouceLeve);

	const subtitle = document.createElement("h2");
	subtitle.style.textTransform = "uppercase";
	subtitle.innerHTML = "les athlètes bretons !";
	subtitle.style.textAlign = "center";
	subtitle.style.color = "#E20917";
	subtitle.style.rotate = "-5deg";
	subtitle.style.fontSize = "6vh";
	subtitle.style.width = "87%";
	subtitle.style.marginTop = "-10px";

	divTitle.appendChild(titleContainer);
	divTitle.appendChild(subtitle);
	
	blank.appendChild(divTitle);

	const divParagraphe = document.createElement("div");
	divParagraphe.style.display = "flex";
	divParagraphe.style.justifyContent = "center";
	divParagraphe.style.paddingTop = "4vh";
	divParagraphe.style.paddingLeft = "4vw";
	divParagraphe.width = "100%";

	const paragraphe = document.createElement("p");
	paragraphe.style.width = "87%";
	paragraphe.style.fontSize = "3vh";
	paragraphe.style.fontFamily = "Arial";
	paragraphe.style.lineHeight = "3vh";
	//paragraphe.style.fontWeight = "bold";
	paragraphe.innerHTML = "Suivez les derniers résultats des sportifs bretons aux Jeux Olympiques 2024 grâce au Télégramme des Scores";

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

	const divDrapeau = document.createElement("div")
	divDrapeau.style.position = "absolute";
	divDrapeau.style.bottom = "12vh";
	divDrapeau.style.left = "5vw";

	const imgDrapeau = document.createElement("img")
	imgDrapeau.src = "./Image/drapeau.svg"
	imgDrapeau.style.width = "30vw"

	divDrapeau.appendChild(imgDrapeau)

	blank.appendChild(divDrapeau);

	const divChaussure = document.createElement("div")
	divChaussure.style.position = "absolute";
	divChaussure.style.bottom = "12vh";
	divChaussure.style.left = "70vw";

	const imgChaussure = document.createElement("img")
	imgChaussure.src = "./Image/chaussure.svg"
	imgChaussure.style.width = "18vw"

	divChaussure.appendChild(imgChaussure)

	blank.appendChild(divChaussure);

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

		div.style.cursor = "pointer";

		// iframe.onclick = async () => {
		// 	await page_historique(sport);
		// }

		const button = document.createElement("button");
		button.classList.add("btn");
		button.classList.add("btn-dark");
		button.setAttribute("style", "--bs-btn-font-size: 4vh; margin-bottom: auto; padding-left: 5vh; padding-right: 5vh; border-radius: 0px; background-color: #141456; text-transform: uppercase");
		button.textContent = sport;
		button.onclick = async () => {
			await page_historique(sport);
		}

		div.appendChild(button);
	
		slide.appendChild(div);
	
		divSwipperWrapper.appendChild(slide);

	});
	const divNextButton = document.createElement("div");
	divNextButton.classList.add("swiper-button-next");
	const divPreviousButton = document.createElement("div");
	divPreviousButton.classList.add("swiper-button-prev");

	divSwipper.appendChild(divNextButton);
	divSwipper.appendChild(divPreviousButton);

	const swiper = new Swiper('.swiper', {
		
		direction: 'horizontal',
		loop: true,
		mousewheel: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	
		// scrollbar: {
		// 	el: '.swiper-scrollbar',
		// 	draggable: true,
		// },
	});
}

async function fetchAndProcessData(sport) {

	const listeVideo = {}
	
	try {
	  const response = await fetch("./JSON/videos.json");
	  if (!response.ok) {
		throw new Error(`Erreur de réseau (statut ${response.status})`);
	  }
  
	  const data = await response.json();
	  for (const [discipline, videos] of Object.entries(data)) {
		if (discipline === sport) {
		  listeVideo[discipline] = videos;
		  console.log(videos); // pour tester
		}
	  }
  
	  // Vous pouvez accéder à listeVideo ici, assurez-vous que le fetch est terminé.
	  console.log(listeVideo);
	} catch (error) {
	  console.error("Une erreur s'est produite lors de la récupération des vidéos :", error);
	}
	
	return listeVideo
}

async function page_historique(sport) {
	
	const listeVideo = await fetchAndProcessData(sport);

	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear
	// blank.style.height = "100%";

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
	divTitle.style.height = "20vh";

	const title = document.createElement("h1");
	title.classList.add("title");
	title.innerHTML = `HISTORIQUE<span style='color:red'>\n${sport.toUpperCase()}<span>`;

	//title.style.fontWeight = "bold";
	title.style.zIndex = "2";

	divTitle.appendChild(title);
	blank.appendChild(divTitle);

	const swiperSport = document.createElement("div")
	swiperSport.classList.add("Swiper2")
	// swiperSport.classList.add("mySwiper")

	const swipperSportWrapper = document.createElement("div")
	swipperSportWrapper.classList.add("swiper-wrapper")

	swiperSport.appendChild(swipperSportWrapper)
	blank.appendChild(swiperSport)

	for (const [videoKey, videoPath] of Object.entries(listeVideo[sport])) {
		console.log(`Chargement de la vidéo ${videoKey} depuis ${videoPath}`);

		const slide = document.createElement("div");
		slide.classList.add("swiper-slide");

		const video = document.createElement("video");
		video.style.transformOrigin= 'center';
		video.style.zIndex = "-2";

		const divPartage = document.createElement("div");
		divPartage.style.display = "flex";
		divPartage.style.justifyContent = "center";
		divPartage.style.alignContent = "center";
		divPartage.style.backgroundColor = "#141456";
		divPartage.style.width = "15vw";
		divPartage.style.cursor = "pointer";

		const textPartage = document.createElement("p");
		textPartage.innerHTML = "PARTAGER";
		textPartage.style.marginTop = "1vh";
		textPartage.style.fontSize = "2vh";
		textPartage.style.color = "white";

		if(sport=="Volleyball"){
			sport = "Volley";
		}

		divPartage.addEventListener('click', function(e) {
			e.preventDefault();
			var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(`Un nouveau résultat de nos ${sport.toLowerCase()}eurs bretons vient de tomber ! Regarde cette vidéo récapitulative : ` + `https://hyblab.polytech.univ-nantes.fr/bretons-2/${videoPath}`) + "%20via%20Le%20Télégramme%20Des%20Scores";
			window.open(url, "Partage", "scrollbars=yes, width=640, top=0, left=0");
		})

		console.log(`Création de l'élément vidéo pour ${videoKey}`);
	
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.height = "100%";

		video.controlsList = "nodownload";

		const sourceMP4 = document.createElement("source");
		sourceMP4.src = videoPath;
		sourceMP4.type = 'video/mp4';

		const sourceWebM = document.createElement("source");
		sourceWebM.src = videoPath.replace("mp4", ".webm");
		sourceWebM.type = 'video/webm';

		video.appendChild(sourceMP4);
		video.appendChild(sourceWebM);

		const elementWidth = video.offsetWidth;
		const elementHeight = video.offsetHeight;

		// Récupérez les dimensions de la fenêtre du navigateur
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Calculez les valeurs de translation pour placer l'élément au centre
		const translateX = (windowWidth) / 2;
		const translateY = (windowHeight) / 2;

		console.log(translateX,translateY)
		console.log(windowHeight,windowWidth)

		video.oncanplay = ()=>{
			console.log(`La vidéo ${videoKey} est prête à être lue.`);
			video.style.cursor = "pointer";
			const playButton = document.createElement("button");
			const playButtonImage = document.createElement("img");
			playButtonImage.src = "./Image/picto-button-video/play.svg";
			playButtonImage.alt = "Play"; 
			playButton.appendChild(playButtonImage);

			const retour = document.createElement("img");
            retour.src = "./Image/bouton-back.svg";
            retour.alt = "retour";
            retour.id = "retour";
            retour.onclick = () => {
                console.log("retour");
                vidéoModal.hide();
                fullS = false;
                modalBodyVid.removeChild(video2);
                modalBodyVid.removeChild(playButton);
                modalBodyVid.removeChild(retour);
            }

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
            let fullS = false;

			playButton.addEventListener("click", function () {
				playButton.style.opacity = 1;

				if (!isPlaying) {
					if (!fullS){
						modalBodyVid.style.zIndex=1051;
						modalBodyVid.style.display = "flex";
						modalBodyVid.style.position ="absolute";
						modalBodyVid.style.backgroundColor = "transparent";
						modalBodyVid.style.justifyContent = "center";
						let video2 = video.cloneNode(true);
						video2.style.marginLeft = "calc((100vw - 100 * 3vh / 5) / 2)";
						video2.style.width ="calc(100 * 3vh / 5)";
						retour.style.marginLeft = "calc((100vw - 100 * 3vh / 5) / 2)";
						modalBodyVid.appendChild(video2);
						modalBodyVid.appendChild(playButton);
						modalBodyVid.appendChild(retour);
						vidéoModal.show();
						video2.play();
						fullS = true;
					}
					playButtonImage.src = "./Image/picto-button-video/pause.svg";

					isPlaying = true;

					playButton.classList.add("fade-out");

					setTimeout(function () {
						playButton.style.opacity = 0; 
					}, 1000);
				} else {
					playButtonImage.src = "./Image/picto-button-video/play.svg"; 
					video.pause();
					if (fullS){
						video2.pause();
					}

					isPlaying = false;
				}
			});


			video.addEventListener("click", function () {
				playButton.style.opacity = 1;

				if (isPlaying) {
					playButtonImage.src = "./Image/picto-button-video/play.svg"; 
					video.pause();
					isPlaying = false;
					if (fullS){
						playButtonImage.src = "./Image/picto-button-video/play.svg"; 
						video2.pause();
						isPlaying = false;
					}
					
				}
				else {
					playButtonImage.src = "./Image/picto-button-video/pause.svg"; 
					if (!fullS){
						modalBodyVid.style.zIndex=1051;
						modalBodyVid.style.display = "flex";
						modalBodyVid.style.position ="absolute";
						modalBodyVid.style.backgroundColor = "transparent";
						modalBodyVid.style.justifyContent = "center";
						video.pause()
						let video2 = video.cloneNode(true);
						video2.style.marginLeft = "calc((100vw - 100 * 3vh / 5) / 2)";
						video2.style.width ="calc(100 * 3vh / 5)";
						retour.style.marginLeft = "calc((100vw - 100 * 3vh / 5) / 2)";
						modalBodyVid.appendChild(video2);
						modalBodyVid.appendChild(playButton);
						modalBodyVid.appendChild(retour);
						vidéoModal.show();
						playButtonImage.src = "./Image/picto-button-video/pause.svg"; 
						video2.play();
						fullS = true;
					}

					isPlaying = true;

					playButton.classList.add("fade-out");
			
					setTimeout(function () {
						playButton.style.opacity = 0; 
					}, 1000);
				}
			});

            const modalBodyVid = document.getElementById("modalvideo");

			const vidéoModal = new bootstrap.Modal('#video-modal')
			const modalBody = document.querySelector('.modal-body');


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
				}
			});

			video.addEventListener("click", function () {
				playButton.style.opacity = 1;

				if (isPlaying) {
					playButtonImage.src = "./Image/picto-button-video/play.svg"; 
					video.pause();

					isPlaying = false;
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

			video.appendChild(sourceMP4);
			video.appendChild(sourceWebM);
			div.appendChild(video);
			divPartage.appendChild(textPartage);
			div.appendChild(divPartage);
			div.appendChild(playButton);
			slide.appendChild(div);
			swipperSportWrapper.appendChild(slide);

			console.log(`Vidéo ${videoKey} ajoutée à la page.`);

		}
	}
	const divPagination = document.createElement("div");
	divPagination.classList.add("swiper-pagination");
	divPagination.classList.add("pagin");

	swiperSport.appendChild(divPagination);

	const swiperSportInstance = new Swiper('.Swiper2', {
		direction: 'horizontal',
		//loop: true,
		mousewheel: true,
		//touch: true,
		slidesPerView: 3,
		//centeredSlides: true,
		slidesOffsetBefore: 28, 
    	slidesOffsetAfter: 28, 
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	console.log("Nouvelle instance de swiperSportInstance créée.");
	
	const listeAthletes = {}
	
	try {
	  const response = await fetch("./JSON/Athlètes.json");
	  if (!response.ok) {
		throw new Error(`Erreur de réseau (statut ${response.status})`);
	  }
  
	  const data = await response.json();
	  console.log(data);
	  for (const [titleAthlete, athleteData] of Object.entries(data)) {
		if (athleteData.Sport === sport) {
			listeAthletes[titleAthlete] = athleteData;
		  	console.log(athleteData); // pour tester
		}
	  }
	  console.log(listeAthletes);
	} catch (error) {
	  console.error("Une erreur s'est produite lors de la récupération des vidéos :", error);
	}

	const divTitleAthlete = document.createElement("div");
	divTitleAthlete.id = "divTitleAthlete";
	divTitleAthlete.style.position = "sticky";
	divTitleAthlete.style.paddingTop = "5vh";

	const titleAthlete = document.createElement("h1");
	titleAthlete.classList.add("title");

	titleAthlete.style.zIndex = "2";
	titleAthlete.style.position = "absolute";

	divTitleAthlete.appendChild(titleAthlete);
	blank.appendChild(divTitleAthlete);

	// const divNomAthlete = document.createElement("div");
	// divNomAthlete.id = "divNomAthlete";

	// const nomAthlete = document.createElement("h1");
	// nomAthlete.classList.add("title");
	
	if(Object.keys(listeAthletes).length == 0) {
		titleAthlete.innerHTML = `AUCUN JOUEUR POUR CETTE DISCIPLINE`;
		titleAthlete.style.fontSize = "3vh";
	} else if(Object.keys(listeAthletes).length == 1) {
		titleAthlete.innerHTML = `LE<span style='color:red'>\nJOUEUR<span>`;
		
		const uniqueAthleteName = Object.keys(listeAthletes)[0];
		const uniqueAthlete = listeAthletes[uniqueAthleteName];
		uniqueAthlete.nom = uniqueAthleteName


		const imagesContainer = document.createElement("div");
		imagesContainer.style.display = "flex";
		imagesContainer.style.justifyContent = "center";
		imagesContainer.style.flexWrap = "wrap";

		const divImgAthlete = document.createElement("div");
		divImgAthlete.id = "divImgAthlete";
		divImgAthlete.style.cursor = "pointer";
		divImgAthlete.onclick = () => {
			page_athlete(uniqueAthlete, listeAthletes , isFirstAthlete);
		}

		const imgAthlete = document.createElement("img");

		const divNomAthlete = document.createElement("div");
		divNomAthlete.style.backgroundColor = "#141456";
		divNomAthlete.style.cursor = "pointer";
		divNomAthlete.style.marginBottom = "2vh";

		const nomAthlete = document.createElement("h1");
		nomAthlete.style.color = "white";
		nomAthlete.style.borderTop = "1px solid black";

		imgAthlete.src = uniqueAthlete.Illustration;
    	imgAthlete.alt = uniqueAthleteName;

		nomAthlete.innerHTML = `${uniqueAthleteName}`;

		divNomAthlete.appendChild(nomAthlete);

		imagesContainer.appendChild(imgAthlete);

		imagesContainer.appendChild(divNomAthlete);

		divImgAthlete.appendChild(imagesContainer);

		blank.appendChild(divImgAthlete);

		divNomAthlete.onclick = () => {
			page_athlete(uniqueAthlete, listeAthletes , isFirstAthlete);
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0; 
		}

	} else {
		titleAthlete.innerHTML = `LES<span style='color:red'>\nJOUEURS<span>`;

		for (const athleteName in listeAthletes) {
			const athlete = listeAthletes[athleteName];
			athlete.nom = athleteName
			

			const imagesContainer = document.createElement("div");
			imagesContainer.style.display = "flex";
			imagesContainer.style.justifyContent = "center";
			imagesContainer.style.flexWrap = "wrap";

			const divImgAthlete = document.createElement("div");
			divImgAthlete.id = "divImgAthlete";
			divImgAthlete.style.cursor = "pointer";

			divImgAthlete.onclick = async () => {
				page_athlete(athlete, listeAthletes , isFirstAthlete);
			}

			const imgAthlete = document.createElement("img");

			const divNomAthlete = document.createElement("div");
			divNomAthlete.style.backgroundColor = "#141456";
			divNomAthlete.style.cursor = "pointer";
			divNomAthlete.style.marginBottom = "2vh";

			const nomAthlete = document.createElement("h1");
			nomAthlete.style.color = "white";
			nomAthlete.style.borderTop = "1px solid black";

			imgAthlete.src = athlete.Illustration;
			imgAthlete.alt = athleteName;

			nomAthlete.innerHTML = `${athleteName}`;

			divNomAthlete.appendChild(nomAthlete);

			imagesContainer.appendChild(imgAthlete);

			imagesContainer.appendChild(divNomAthlete);

			divImgAthlete.appendChild(imagesContainer);

			blank.appendChild(divImgAthlete);

			divNomAthlete.onclick = async () => {
				page_athlete(athlete, listeAthletes , isFirstAthlete);
			}
		}
		
	}

}

async function page_athlete(athlete,listeAthletes, isFirstAthlete) {
	
    const blank = document.querySelector("#blank");
    blank.innerHTML = ""; // clear

    const retour = document.createElement("img");
    retour.src = "./Image/bouton-back.svg";
    retour.alt = "retour";
    retour.id = "retour";
    retour.onclick = () => {
        page_sport();
    }
		console.log(athlete)
    
    blank.appendChild(retour);

    // Création des éléments pour afficher les détails de l'athlète
    const divDetails = document.createElement("div");
    divDetails.classList.add("details-athlete");

    const imgAthlete = document.createElement("img");
    imgAthlete.src = athlete.Photo;
    imgAthlete.alt = athlete.nom;
	imgAthlete.className = "img_at_pg_at"
	const imgdiv = document.createElement("div");
	imgdiv.className = "img_div_pg_at"
	imgdiv.appendChild(imgAthlete)

	const nomContainer = document.createElement("div");
	nomContainer.style.display = "flex";
    nomContainer.style.alignItems = "center";
	nomContainer.style.justifyContent = "center";
	nomContainer.style.marginRight = "10vw";

    const nomAthlete = document.createElement("h2");
    nomAthlete.textContent = athlete.nom.split(" ")[0];
	nomAthlete.style.fontSize = "5vh";

	const prenomAthlete = document.createElement("h2");
    prenomAthlete.textContent = athlete.nom.split(" ")[1];
	prenomAthlete.style = "color:red;font-size:5vh"

	const prenomAthlete2 = document.createElement("h2");
	prenomAthlete2.textContent = athlete.nom.split(" ")[2];
	prenomAthlete2.style = "color:red;font-size:5vh"

	const ele_fleche = document.createElement("img");
	ele_fleche.src = "./Image/fleche-3.svg"
	ele_fleche.className = "ele_fleche"
	const ele_sardine = document.createElement("img");
	ele_sardine.src = "./Image/sardine.svg"
	ele_sardine.className = "ele_sardine"

	nomContainer.appendChild(ele_fleche);
	nomContainer.appendChild(nomAthlete);
	nomContainer.appendChild(prenomAthlete);
	nomContainer.appendChild(prenomAthlete2);
	nomContainer.appendChild(ele_sardine);


	const nomdiv = document.createElement("div");
	nomdiv.style.flexDirection = "column";
	nomdiv.style.alignItems = "center";
	nomdiv.style.paddingTop = "6vh";
	nomdiv.style.paddingLeft = "4vw";
	// nomdiv.style.display = "flex";
    // nomdiv.style.alignItems = "center";
	// nomdiv.style.marginRight = "10vw";
	// nomdiv.className = "nom_div_pg_at"
	nomdiv.appendChild(nomContainer)
	// nomdiv.appendChild(nomAthlete)
	// nomdiv.appendChild(prenomAthlete)
	// nomdiv.appendChild(ele_fleche)
	// nomdiv.appendChild(ele_sardine)

	
	const divJoueur = document.createElement("div");
	divJoueur.style.display = "flex";
	divJoueur.style.justifyContent = "space-between";
	divJoueur.style.width = "85vw";

	const JOUEUR= document.createElement("h2");

	if (athlete.genre == "Femme") {
		JOUEUR.textContent = " LA JOUEUSE ";
	}
	else {
		JOUEUR.textContent = " LE JOUEUR ";
	}
	JOUEUR.className = "joueurword"
	divJoueur.appendChild(JOUEUR)

	const img_joueur = document.createElement("img");
	img_joueur.src = "./Image/bol.svg"
	img_joueur.className = "img_cidrebolee"
	divJoueur.appendChild(img_joueur)
		

    const ageAthlete = document.createElement("p");
    ageAthlete.textContent = `Âge : ${athlete.Age}`;

    const lieuNaissance = document.createElement("p");
    lieuNaissance.textContent = `Ville d'origine : ${athlete.VilleOrigine}`;

    const disciplineAthlete = document.createElement("p");
    disciplineAthlete.textContent = `Discipline : ${athlete.Sport}`;

	const img_post = document.createElement("img")
	img_post.src = "./Image/poste.svg"
	img_post.style = "width:30px;float:left;margin-right:20px"
    const posteAthlete = document.createElement("p");
    posteAthlete.textContent = `Poste : ${athlete.Poste}`;
	const div_post = document.createElement("div")
	div_post.className = "box_p_c"
	div_post.appendChild(img_post)
	div_post.appendChild(posteAthlete)
		
	const img_club = document.createElement("img")
	img_club.src = "./Image/club.svg"
	img_club.style = "width:30px;float:left;margin-right:20px"
    const clubAthlete = document.createElement("p");
    clubAthlete.textContent = `Club : ${athlete.Club}`;
	const div_club = document.createElement("div")
	div_club.className = "box_p_c"
	div_club.appendChild(img_club)
	div_club.appendChild(clubAthlete)
		

    const bioAthlete = document.createElement("p");
	bioAthlete.id = "bioAthlete";
    bioAthlete.textContent = athlete.Biographie;

	const txtdiv = document.createElement("div");
	txtdiv.className = "text_pg_at"
	txtdiv.appendChild(ageAthlete);
    txtdiv.appendChild(lieuNaissance);
    txtdiv.appendChild(disciplineAthlete);
	const txtdiv2 = document.createElement("div");
	txtdiv2.className = "text2_pg_at"
	txtdiv2.appendChild(div_post);
    txtdiv2.appendChild(div_club);
	const txtdiv3 = document.createElement("div");
	txtdiv3.className = "text3_pg_at"
    txtdiv3.appendChild(bioAthlete);


	divDetails.appendChild(nomdiv);
    divDetails.appendChild(imgdiv);
	divDetails.appendChild(divJoueur);
	divDetails.appendChild(txtdiv);
	divDetails.appendChild(txtdiv2);
	divDetails.appendChild(txtdiv3);

    
    blank.appendChild(divDetails);

	const nextAthleteDiv = document.createElement("div");
	nextAthleteDiv.style.width = "50vw";
	nextAthleteDiv.style.height = "4vh";
	nextAthleteDiv.style.fontSize = "2.5vh";
	nextAthleteDiv.style.alignItems = "center";
	console.log(listeAthletes);
	const listeAthletesArray = Object.values(listeAthletes);
	const currentIndex = listeAthletesArray.findIndex(item => item.nom === athlete.nom);
	const nextIndex = (currentIndex + 1) % listeAthletesArray.length;
	const nextAthlete = listeAthletesArray[nextIndex];
	if (isFirstAthlete){
		nextAthleteDiv.textContent = `SUIVANT : ${nextAthlete.nom}`;
	} 

	else if(!isFirstAthlete){
		nextAthleteDiv.textContent = `PRECEDENT : ${nextAthlete.nom}`;
	}
	 nextAthleteDiv.classList.add("next-athlete-div");
	 nextAthleteDiv.addEventListener("click", () => {
        page_athlete(nextAthlete, listeAthletes, !isFirstAthlete);

    });
	 
	blank.appendChild(nextAthleteDiv);
}

const isFirstAthlete= true;

const myModal = new bootstrap.Modal('#modal')
const phone = document.getElementById("phone");
document.getElementById("menu-modal").onclick = () =>{
	myModal.show();
	phone.style.filter = "blur(1px)"

	myModal._element.addEventListener('hidden.bs.modal', () => {
        phone.style.filter = "";
    });
}


document.getElementById("retour-modal").onclick = () =>{
	myModal.hide();
}

document.getElementById("actu").onclick = () => {
	myModal.hide();
	page_actualite();
}

document.getElementById("credits").onclick = () => {
	myModal.hide();
	page_credits();
}

async function fetchAndProcessActuData() {

	const listeVideo = {}
	
	try {
	  const response = await fetch("./JSON/actu.json");
	  if (!response.ok) {
		throw new Error(`Erreur de réseau (statut ${response.status})`);
	  }
  
	  const data = await response.json();
	  for (const [numero, videos] of Object.entries(data)) {
		  listeVideo[numero] = videos;
		  console.log(videos); // pour tester
	  }
	} catch (error) {
	  console.error("Une erreur s'est produite lors de la récupération des vidéos :", error);
	}
	
	return listeVideo
}

async function page_actualite() {

	const listeVideoActu = await fetchAndProcessActuData();
	console.log(listeVideoActu);

	const blank = document.querySelector("#blank");
	blank.innerHTML = "";

	const retour = document.createElement("img");
	retour.src = "./Image/bouton-back.svg";
	retour.alt = "retour";
	retour.id = "retour";
	retour.onclick = () => {
		page_accueil();
	}

	blank.appendChild(retour);

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";
	divTitle.style.height = "20vh";

	const title = document.createElement("h1");
	title.id = "titleActualite";
	title.innerHTML = `les actualités`;

	//title.style.fontWeight = "bold";
	title.style.zIndex = "2";
	title.style.textTransform = "uppercase";

	divTitle.appendChild(title);
	blank.appendChild(divTitle);

	const divExplication = document.createElement("div");
	divExplication.style.display = "flex";
	divExplication.style.justifyContent = "center";
	divExplication.style.alignItems = "center";
	divExplication.style.alignContent = "center";
	divExplication.style.borderBottom = "solid 0.5vh #FFCE42"
	divExplication.style.width = "90vw";
	divExplication.style.paddingBottom = "2vh";
	divExplication.style.margin = "auto";

	const pExplication = document.createElement("p");
	pExplication.style.fontSize = "4vh";
	pExplication.style.textAlign = "center";
	pExplication.innerHTML = "Retrouvez les dernières actualités liées à nos joueurs bretons ci-dessous : ";

	divExplication.appendChild(pExplication);
	blank.appendChild(divExplication);

	const swiperActu = document.createElement("div");
	swiperActu.classList.add("Swiper2");
	swiperActu.style.height = "35vh !important";
	swiperActu.style.top = "50% "; 
    swiperActu.style.left = "50%"; 
    swiperActu.style.transform = "translate(-2vw, 8vh)";

	const swipperActuWrapper = document.createElement("div")
	swipperActuWrapper.classList.add("swiper-wrapper")

	swiperActu.appendChild(swipperActuWrapper);
	blank.appendChild(swiperActu);

	for (const [videoKey, videoPath] of Object.entries(listeVideoActu)) {
		console.log(`Chargement de la vidéo ${videoKey} depuis ${videoPath}`);

		const slide = document.createElement("div");
		slide.classList.add("swiper-slide");
		// slide.style.height = "40%";
		// //slide.style.width = "50%";
		// slide.style.float = "left"
		// slide.style.marginRight = "10px";
		// slide.style.marginTop = "15vh";
		// slide.style.backgroundColor = "#FBCB5D";

		const video = document.createElement("video");

		const divPartage = document.createElement("div");
		divPartage.style.display = "flex";
		divPartage.style.justifyContent = "center";
		divPartage.style.alignContent = "center";
		divPartage.style.backgroundColor = "#141456";
		divPartage.style.width = "15vw";
		divPartage.style.cursor = "pointer";

		const textPartage = document.createElement("p");
		textPartage.innerHTML = "PARTAGER";
		textPartage.style.marginTop = "1vh";
		textPartage.style.fontSize = "2vh";
		textPartage.style.color = "white";

		divPartage.addEventListener('click', function(e) {
			e.preventDefault();
			var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(`Un nouveau résultat des Jeux Olympiques vient de tomber ! Regarde cette vidéo récapitulative : ` + `https://hyblab.polytech.univ-nantes.fr/bretons-2/${videoPath}`) + "%20via%20Le%20Télégramme%20Des%20Scores";
			window.open(url, "Partage", "scrollbars=yes, width=640, top=0, left=0");
		})

		console.log(`Création de l'élément vidéo pour ${videoKey}`);
	
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.height = "100%";

		// video.src = videos[${}];
		// video.autoplay = true;
		// video.controls = true;
		video.controlsList = "nodownload";
		video.style.height = "100%";

		const sourceMP4 = document.createElement("source");
		sourceMP4.src = videoPath;
		sourceMP4.type = 'video/mp4';

		const sourceWebM = document.createElement("source");
		sourceWebM.src = videoPath.replace("mp4", ".webm");
		sourceWebM.type = 'video/webm';

		video.appendChild(sourceMP4);
		video.appendChild(sourceWebM);

		video.oncanplay = ()=>{
			console.log(`La vidéo ${videoKey} est prête à être lue.`);
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
				}
			});

			video.addEventListener("click", function () {
				playButton.style.opacity = 1;

				if (isPlaying) {
					playButtonImage.src = "./Image/picto-button-video/play.svg"; 
					video.pause();

					isPlaying = false;
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

			video.appendChild(sourceMP4);
			video.appendChild(sourceWebM);
			div.appendChild(video);
			divPartage.appendChild(textPartage);
			div.appendChild(divPartage);
			div.appendChild(playButton);
			slide.appendChild(div);
			swipperActuWrapper.appendChild(slide);

			console.log(`Vidéo ${videoKey} ajoutée à la page.`);

		}
	}

	const divPagination = document.createElement("div");
	divPagination.classList.add("swiper-pagination");
	divPagination.classList.add("pagin");

	swiperActu.appendChild(divPagination);

	const swiperActuInstance = new Swiper('.Swiper2', {
		direction: 'horizontal',
		//loop: true,
		mousewheel: true,
		//touch: true,
		slidesPerView: 3,
		//centeredSlides: true,
		slidesOffsetBefore: 28, 
    	slidesOffsetAfter: 28, 
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

}

function page_credits() {

	const blank = document.querySelector("#blank");
	blank.innerHTML = "";

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
	title.innerHTML = "LES CRÉDITS \n<span style='font-size:6vh'!important> HYBLAB<span style='color:#E20917'> 2024<span><span>";
	//title.style.fontWeight = "bold";
	title.style.fontSize = "7vh";
	title.style.zIndex = "2";
	title.style.position = "absolute";


	divTitle.appendChild(title);
	blank.appendChild(divTitle);


	
	const divSwipper = document.createElement("div");
	divSwipper.classList.add("credswiper");
	divSwipper.classList.add("swiper");


	const divSwipperWrapper = document.createElement("div");
	divSwipperWrapper.classList.add("swiper-wrapper");

	divSwipper.appendChild(divSwipperWrapper);

	blank.appendChild(divSwipper);


	["Nicolas","Salomé","Yeltaz","Kevin","Hugo","Isis","Hulduz","Titouan","Nathan","Aymen","Yiyang"].forEach(membre => {

		const slide = document.createElement("div");
		slide.classList.add("swiper-slide");
	
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.style.height = "100%";
		div.style.gap = "4vh";

		const iframe = document.createElement("img");
		iframe.style.objectFit = "cover";
		iframe.style.cursor = "pointer";
		iframe.style.display = "flex";
		iframe.style.justifyContent = "center";
		iframe.style.alignItems = "center";
		iframe.style.paddingTop = "10vh";
		iframe.style.width = "60vw";

		const imgPicto = document.createElement("img");


		switch (membre) {
			case "Nicolas":
				iframe.setAttribute("src", "./Image/picto-members/nicolas-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/telegramme.png");
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Salomé":
				iframe.setAttribute("src", "./Image/picto-members/salome-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/telegramme.png");
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Yeltaz":
				iframe.setAttribute("src", "./Image/picto-members/yeltaz-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/agr.png");
				imgPicto.style.width = "5vh";
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Kevin":
				iframe.setAttribute("src", "./Image/picto-members/kevin-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/agr.png");
				imgPicto.style.width = "5vh";
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Hugo":
				iframe.setAttribute("src", "./Image/picto-members/hugo-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/epjt.jpg");
				imgPicto.style.width = "5vh";
				iframe.onclick = () => {
					window.location.href = "https://www.linkedin.com/in/hugo-laulan-71b187231/";
				}
				break;
			case "Isis":
				iframe.setAttribute("src", "./Image/picto-members/isis-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/science-po.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Hulduz":
				iframe.setAttribute("src", "./Image/picto-members/hulduz-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/polytech.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "https://www.linkedin.com/in/hulduz-djanbekov-440318209/";
				}
				break;
			case "Titouan":
				iframe.setAttribute("src", "./Image/picto-members/titouan-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/polytech.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "https://www.linkedin.com/in/titouan-bahon-83b66522b/";
				}
				break;
			case "Nathan":
				iframe.setAttribute("src", "./Image/picto-members/nathan-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/polytech.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "https://www.linkedin.com/in/nathan-gantier-023b7b231/";
				}
				break;
			case "Aymen":
				iframe.setAttribute("src", "./Image/picto-members/aymen-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/polytech.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "";
				}
				break;
			case "Yiyang":
				iframe.setAttribute("src", "./Image/picto-members/yiyang-hyb.svg");
				imgPicto.setAttribute("src", "./Image/picto-credits/polytech.png");
				imgPicto.style.width = "8vh";
				iframe.onclick = () => {
					window.location.href = "https://www.linkedin.com/in/yiyang-shen-b21b872a2/";
				}
				break;
			default:
				break;
		}

		div.appendChild(iframe);
		div.appendChild(imgPicto);

		const Nomsmembres = document.createElement("div");
		Nomsmembres.style.color = "black";
		Nomsmembres.style.fontFamily = "Antonio";
		Nomsmembres.style.fontSize = "4vh";
		Nomsmembres.style.fontWeight = "bold";
		Nomsmembres.style.cursor = "pointer";
		Nomsmembres.style.width = "100%";
		Nomsmembres.style.textAlign = "center";
		Nomsmembres.style.textTransform = "uppercase";
		Nomsmembres.innerHTML = `${membre}`;

		div.appendChild(Nomsmembres);
	
		slide.appendChild(div);
	
		divSwipperWrapper.appendChild(slide);

		const divNextButton = document.createElement("div");
		divNextButton.classList.add("swiper-button-next");
		const divPreviousButton = document.createElement("div");
		divPreviousButton.classList.add("swiper-button-prev");

		divSwipper.appendChild(divNextButton);
		divSwipper.appendChild(divPreviousButton);

		const swiper = new Swiper('.credswiper', {
			// Optional parameters
			direction: 'horizontal',
			mousewheel: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});

	});

}

//const modal = document.getElementById("modal");modal.addEventListener()
page_accueil();
