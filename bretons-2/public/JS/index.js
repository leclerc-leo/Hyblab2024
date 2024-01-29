"use strict";

const data = {
	"Football": {
		"Enzo Le Fée" : {
			"age" : 21,
			"lieuDeNaissance" : "Lorient",
			"discipline" : "Tournoi masculin",
			"club" : "Stade Rennais",
			"poste" : "Milieu de terrain",
			"photo" : "https://cdn-apps.letelegramme.fr/files/outils/2023/05/LE-FEE-Enzo-PH2-6776.JPG",
			"bio" : "",
		}
	},
	"Handball": {
		"Pauline Coatanea" : {
			"age" : 30,
			"lieuDeNaissance" : "Saint-Renan",
			"discipline" : "Tournoi féminin",
			"club" : "Brest Bretagne Handball Club",
			"poste" : "",
			"photo" : "https://cdn-apps.letelegramme.fr/files/outils/2023/05/COATANEA-Pauline-PH2-6776.JPG",
			"bio" : "La Renanaise faisait partie de l'aventure aux Jeux Olympiques de Tokyo, où les Bleues ont remporté leur premier titre olympique. Finaliste de la Ligue des champions avec Brest la même année, la Bretonne devra relever le défi de revenir au niveau à temps pour les Jeux de Paris après son congé maternité.",
		},
		"Romain Lagarde" : {
			"age" : 26,
			"lieuDeNaissance" : "Lorient",
			"discipline" : "Tournoi masculin",
			"club" : "Aix",
			"poste" : "",
			"photo" : "https://cdn-apps.letelegramme.fr/files/outils/2023/05/LAGARDE-Romain-min.jpg",
			"bio" : "D'abord remplaçant à Tokyo, Romain Lagarde a finalement intégré le groupe olympique en cours de tournoi, pour s'adjuger le titre de champion olympique en 2021, Formé à Nantes, le Ploemeurois est depuis 2021 l'un des pivots du Pays d'Aix Université Club.",
		}
	},
	"Volleyball": {
		"Jenia Grebennikov" : {
			"age" : 33,
			"lieuDeNaissance" : "Rennes",
			"discipline" : "Tournoi masculin",
			"club" : "Zenith St Pétersbourg",
			"poste" : "",
			"photo" : "https://cdn-apps.letelegramme.fr/files/outils/2023/05/GREBENNIKOV-Jenia.JPG",
			"bio" : "Jenia Grebennikov est probablement l'un des meilleurs libéros au monde. Formé à Rennes, il passe ensuite par l'Allemagne et l'Italie, avant de rejoindre, en 2021, le Zenit Saint-Pétersbourg, en Russie. Champion olympique avec les Bleus en 2021, il cherchera à remporter une deuxième médaille olympique de rang.",
		}
	}
};

function page_sport(){
	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";

	const title = document.createElement("h1");
	title.id = "titleSport";
	title.innerHTML = "Choisissez votre <span style='color:red'>sport !<span>";
	title.style.fontWeight = "bold";

	divTitle.appendChild(title);
	blank.appendChild(divTitle);

	const divSwipper = document.createElement("div");
	divSwipper.classList.add("swiper");

	const divSwipperWrapper = document.createElement("div");
	divSwipperWrapper.classList.add("swiper-wrapper");

	const divSwipperScrollbar = document.createElement("div");
	divSwipperScrollbar.classList.add("swiper-scrollbar");

	divSwipper.appendChild(divSwipperWrapper);
	divSwipper.appendChild(divSwipperScrollbar);

	blank.appendChild(divSwipper);

	const contenerSlide = document.querySelector(".swiper-wrapper");

	for (const [sport, athlete] of Object.entries(data)) {
		
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
		iframe.setAttribute("width", "100%");
		iframe.setAttribute("height", "80%");
		iframe.setAttribute("allowfullscreen", "");
		iframe.style.zIndex = "-1";

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
		button.setAttribute("style", "--bs-btn-font-size: 1.8rem;");
		button.textContent = sport;
		button.onclick = () => {
			page_athlete(athlete);
		}

		div.appendChild(button);
	
		slide.appendChild(div);
	
		contenerSlide.appendChild(slide);
	};

	const swiper = new Swiper('.swiper', {
		
		direction: 'horizontal',
		loop: true,
		mousewheel: true,
	
		// If we need pagination
		// pagination: {
		//   el: '.swiper-pagination',
		//   clickable: true,
		// }
	
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
	});
}

function page_athlete(athlete) {
    const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const button = document.createElement("button");
	button.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'/></svg> Retour";
	button.classList.add("btn");
	button.classList.add("btn-outline-dark");
	button.onclick = async () => {
		page_sport(data,page_athlete);
	}
	button.style.position = "relative";
	button.style.top = "10px";
	button.style.left = "10px";

	blank.appendChild(button);

	const div = document.createElement("div");
	div.style.height = "100%";

	const section = document.createElement("section");
	section.classList.add("splide");
	section.setAttribute("aria-label", "Splide for athletes");
	section.style.display = "flex";
	section.style.alignItems = "center";
	section.style.height = "100%";

	const div2 = document.createElement("div");
	div2.classList.add("splide__track");

	const ul = document.createElement("ul");
	ul.classList.add("splide__list");

	for (const [a, dataAthlete] of Object.entries(athlete)) {
		const li = document.createElement("li");
		li.classList.add("splide__slide");
		li.textContent = a;
		li.style.textAlign = "center";

		ul.appendChild(li);
	}
	
	div2.appendChild(ul);
	section.appendChild(div2);
	div.appendChild(section);
	blank.appendChild(div);

	var splide = new Splide( '.splide', {
		type   : 'loop',
		perPage: 3,
		focus  : 'center',
		wheel  : true,
	});

	splide.mount();
}

function page_accueil() {
	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";

	const title = document.createElement("h1");
	title.id = "titleHome";
	title.innerHTML = "<span style= 'text-transform:uppercase'><span style='font-size : 150%'>Découvrez</span> <br><span style='font-size : 95%'>notre questionnaire<br>pour suivre <br>ceux que vous aimez</span></span>";

	divTitle.appendChild(title);
	blank.appendChild(divTitle);

	const divParagraphe = document.createElement("div");
	div.id = "divParagraphe";

	const paragraphe = document.createElement("p");
	paragraphe.id = "paragrapheHome";
	paragraphe.innerHTML = "Découvrez et suivez vos sportifs bretons favoris dans leur parcours dans les Jeux Olympiques Paris 2024 !";

	divParagraphe.appendChild(paragraphe);
	blank.appendChild(divParagraphe);
}

page_accueil();