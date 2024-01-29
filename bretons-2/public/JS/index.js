"use strict";

function page_accueil() {
	const blank = document.querySelector("#blank");
	blank.innerHTML = ""; // clear

	const divTitle = document.createElement("div");
	divTitle.id = "divTitle";
	divTitle.style.flexDirection = "column";
	divTitle.style.alignItems = "center";
	divTitle.style.paddingTop = "4rem";

	const title = document.createElement("h1");
	title.style.fontSize = "400%";
	title.innerHTML = "DÉCOUVREZ";
	title.style.width = "20rem";

	const subtitle = document.createElement("h2");
	subtitle.innerHTML = "NOTRE QUESTIONNAIRE POUR SUIVRE<br>CEUX QUE VOUS AIMEZ";
	subtitle.style.fontSize = "250%";
	subtitle.style.width = "20rem";
	subtitle.style.marginTop = "-10px";

	divTitle.appendChild(title);
	divTitle.appendChild(subtitle);
	
	blank.appendChild(divTitle);

	const divParagraphe = document.createElement("div");
	divParagraphe.style.display = "flex";
	divParagraphe.style.justifyContent = "center";
	divParagraphe.style.paddingTop = "2rem";
	divParagraphe.width = "100%";

	const paragraphe = document.createElement("p");
	paragraphe.style.width = "20rem";
	paragraphe.style.fontSize = "1rem";
	paragraphe.style.fontFamily = "Arial";
	paragraphe.innerHTML = "Découvrez et suivez vos sportifs bretons favoris dans leur parcours dans les Jeux Olympiques Paris 2024 !";

	divParagraphe.appendChild(paragraphe);
	blank.appendChild(divParagraphe);

	const divButton = document.createElement("div");
	divButton.style.display = "flex";
	divButton.style.justifyContent = "center";
	divButton.style.paddingTop = "2rem";

	const button = document.createElement("button");
	button.classList.add("btn");
	button.classList.add("btn-danger");
	button.setAttribute("style", "--bs-btn-font-size: 1.8rem;");
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
	title.id = "titleSport";
	title.innerHTML = "CHOISISSEZ<span style='color:red'>\nVOTRE SPORT<span>";
	title.style.fontWeight = "bold";
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
		button.setAttribute("style", "--bs-btn-font-size: 1.8rem;");
		button.textContent = sport;
		button.onclick = () => {
			page_athlete(sport);
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

function page_athlete(sport) {
	
	const athlete = {};

	fetch("./JSON/data.json")
	.then(response => response.json())
	.then(data => {
		for (const [a, dataAthlete] of Object.entries(data)) {
			if (dataAthlete.discipline == sport) {
				athlete[a] = dataAthlete;
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

		const divSwipper = document.createElement("div");
		divSwipper.classList.add("swiper");

		const divSwipperWrapper = document.createElement("div");
		divSwipperWrapper.classList.add("swiper-wrapper");

		divSwipper.appendChild(divSwipperWrapper);

		for (const [a, dataAthlete] of Object.entries(athlete)) {

			// const swiperSlide = document.createElement("div");
			// swiperSlide.classList.add("swiper-slide");
			// swiperSlide.style.width = "100%";
			// swiperSlide.style.height = "100%";

			// swiperSlide.textContent = a;






			// divSwipperWrapper.appendChild(swiperSlide);
		}

		blank.appendChild(divSwipper);

		const swiperConfig = {
			centeredSlides: true,
		  }

		new Swiper(".swiper",swiperConfig);



		// const section = document.createElement("section");
		// section.classList.add("splide");
		// section.setAttribute("aria-label", "Splide for athletes");
		// section.style.display = "flex";
		// section.style.alignItems = "center";
		// section.style.height = "100%";

		// const div2 = document.createElement("div");
		// div2.classList.add("splide__track");

		// const ul = document.createElement("ul");
		// ul.classList.add("splide__list");

		// for (const [a, dataAthlete] of Object.entries(athlete)) {
		// 	const li = document.createElement("li");
		// 	li.classList.add("splide__slide");
		// 	li.textContent = a;
		// 	li.style.textAlign = "center";

		// 	ul.appendChild(li);
		// }
		
		// div2.appendChild(ul);
		// section.appendChild(div2);
		// div.appendChild(section);
		// blank.appendChild(div);

		// var splide = new Splide( '.splide', {
		// 	type   : 'loop',
		// 	perPage: 3,
		// 	focus  : 'center',
		// 	wheel  : true,
		// });

		// splide.mount();
	});
}

const myModal = new bootstrap.Modal('#modal')
document.getElementById("menu-modal").onclick = () =>{
	myModal.show();
}

document.getElementById("retour-modal").onclick = () =>{
	myModal.hide();
}

page_accueil();
