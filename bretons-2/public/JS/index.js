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

	const title = document.createElement("h1");
	title.style.fontSize = "9vh";
	title.innerHTML = "supportez";
	title.style.width = "87%";
	title.style.textTransform = "uppercase";

	const subtitle = document.createElement("h2");
	subtitle.style.textTransform = "uppercase";
	subtitle.innerHTML = "les athlètes bretons !";
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
		// slide.style.height = "40%";
		// //slide.style.width = "50%";
		// slide.style.float = "left"
		// slide.style.marginRight = "10px";
		// slide.style.marginTop = "15vh";
		// slide.style.backgroundColor = "#FBCB5D";

		const video = document.createElement("video");

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
		// video.style.height = "100%";
		// video.style.border = "0.5px solid black"; //à modifier ?

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
	  const response = await fetch("./JSON/data.json");
	  if (!response.ok) {
		throw new Error(`Erreur de réseau (statut ${response.status})`);
	  }
  
	  const data = await response.json();
	  for (const [titleAthlete, athleteData] of Object.entries(data)) {
		if (athleteData.discipline === sport) {
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
			page_athlete(uniqueAthlete);
		}

		const imgAthlete = document.createElement("img");

		const divNomAthlete = document.createElement("div");
		divNomAthlete.style.backgroundColor = "#141456";
		divNomAthlete.style.cursor = "pointer";

		const nomAthlete = document.createElement("h1");
		nomAthlete.style.color = "white";
		nomAthlete.style.borderTop = "1px solid black";

		imgAthlete.src = uniqueAthlete.illustration;
    	imgAthlete.alt = uniqueAthleteName;

		nomAthlete.innerHTML = `${uniqueAthleteName}`;

		divNomAthlete.appendChild(nomAthlete);

		imagesContainer.appendChild(imgAthlete);

		imagesContainer.appendChild(divNomAthlete);

		divImgAthlete.appendChild(imagesContainer);

		blank.appendChild(divImgAthlete);

		divNomAthlete.onclick = () => {
			page_athlete(uniqueAthlete,listeAthletes);
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

			divImgAthlete.onclick = () => {
				page_athlete(athlete);
			}

			const imgAthlete = document.createElement("img");

			const divNomAthlete = document.createElement("div");
			divNomAthlete.style.backgroundColor = "#141456";
			divNomAthlete.style.cursor = "pointer";

			const nomAthlete = document.createElement("h1");
			nomAthlete.style.color = "white";
			nomAthlete.style.borderTop = "1px solid black";

			imgAthlete.src = athlete.illustration;
			imgAthlete.alt = athleteName;

			nomAthlete.innerHTML = `${athleteName}`;

			divNomAthlete.appendChild(nomAthlete);

			imagesContainer.appendChild(imgAthlete);

			imagesContainer.appendChild(divNomAthlete);

			divImgAthlete.appendChild(imagesContainer);

			blank.appendChild(divImgAthlete);

			divNomAthlete.onclick = () => {
				page_athlete(athlete, listeAthletes);
			}
		}
		
	}

}

function page_athlete(athlete,listeAthletes) {
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
    imgAthlete.src = athlete.photo;
    imgAthlete.alt = athlete.nom;
		imgAthlete.className = "img_at_pg_at"
		const imgdiv = document.createElement("div");
		imgdiv.className = "img_div_pg_at"
		imgdiv.appendChild(imgAthlete)

    const nomAthlete = document.createElement("h2");
    nomAthlete.textContent = athlete.nom.split(" ")[0];
		nomAthlete.style = "font-size:58px"
		const prenomAthlete = document.createElement("h2");
    prenomAthlete.textContent = athlete.nom.split(" ")[1];
		prenomAthlete.style = "color:red;font-size:58px"

		const ele_fleche = document.createElement("img");
		ele_fleche.src = "./Image/fleche-3.svg"
		ele_fleche.className = "ele_fleche"
		const ele_sardine = document.createElement("img");
		ele_sardine.src = "./Image/sardine.svg"
		ele_sardine.className = "ele_sardine"


		const nomdiv = document.createElement("div");
		nomdiv.className = "nom_div_pg_at"
		nomdiv.appendChild(nomAthlete)
		nomdiv.appendChild(prenomAthlete)
		nomdiv.appendChild(ele_fleche)
		nomdiv.appendChild(ele_sardine)

		

    const ageAthlete = document.createElement("p");
    ageAthlete.textContent = `Âge : ${athlete.age}`;

    const lieuNaissance = document.createElement("p");
    lieuNaissance.textContent = `Lieu de naissance : ${athlete.lieuDeNaissance}`;

    const disciplineAthlete = document.createElement("p");
    disciplineAthlete.textContent = `Discipline : ${athlete.discipline}`;

		const img_post = document.createElement("img")
		img_post.src = "./Image/poste.svg"
		img_post.style = "width:30px;float:left;margin-right:20px"
    const posteAthlete = document.createElement("p");
    posteAthlete.textContent = `Poste : ${athlete.poste}`;
		const div_post = document.createElement("div")
		div_post.className = "box_p_c"
		div_post.appendChild(img_post)
		div_post.appendChild(posteAthlete)
		
		const img_club = document.createElement("img")
		img_club.src = "./Image/club.svg"
		img_club.style = "width:30px;float:left;margin-right:20px"
    const clubAthlete = document.createElement("p");
    clubAthlete.textContent = `Club : ${athlete.club}`;
		const div_club = document.createElement("div")
		div_club.className = "box_p_c"
		div_club.appendChild(img_club)
		div_club.appendChild(clubAthlete)

		

    const bioAthlete = document.createElement("p");
    bioAthlete.textContent = athlete.bio;

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
		divDetails.appendChild(txtdiv);
		divDetails.appendChild(txtdiv2);
		divDetails.appendChild(txtdiv3);

    
    blank.appendChild(divDetails);

	const nextAthleteDiv = document.createElement("div");
	const listeAthletesArray = Object.values(listeAthletes);
	const currentIndex = listeAthletesArray.findIndex(item => item.nom === athlete.nom);
	const nextIndex = (currentIndex + 1) % listeAthletesArray.length;
	const nextAthlete = listeAthletesArray[nextIndex];
	 nextAthleteDiv.textContent = `SUIVANT : ${nextAthlete.nom}`;
	 nextAthleteDiv.classList.add("next-athlete-div");
	 nextAthleteDiv.addEventListener("click", () => {

        page_athlete(nextAthlete, listeAthletes);

    });
 
	 blank.appendChild(nextAthleteDiv);

	console.log("AYMEN");
	console.log(athlete);
	console.log(listeAthletes);
}


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

function page_actualite() {

	const blank = document.querySelector("#blank");
	blank.innerHTML = "";

}

function page_credits() {

	const blank = document.querySelector("#blank");
	blank.innerHTML = "";

}

//const modal = document.getElementById("modal");modal.addEventListener()
page_historique("Handball");

