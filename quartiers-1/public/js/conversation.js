"use strict";

// Liste des quartiers implémentés 
// true = disponible
// false = indisponible
let quartier_dispo = {
    "villejean": true,
    "st_martin": false,
    "maurepas": false,
    "bourg_eveque": false,
    "cleunay": false,
    "centre": false,
    "thabor": false,
    "jeanne_darc": false,
    "sud_gare": false,
    "francisco": false,
    "brequigny": false,
    "le_blosne": false
}

// Fonction pour scroller automatiquement en bas de la conversation de manière lisse
function scrollSmoothlyToBottom() {
    let div = $("#villejean-conversation");

    div.animate({
        scrollTop: div.prop("scrollHeight")
    }, 1000);
};

// Fonction principale pour traiter les bulles
function treatBubble(bubbleJson) {
    // On ajoute du temps en fonction de la taille et du type de la bulle
    if (lastBubble["type"] == "choice" || lastBubble["type"] == "topicChoice") {
        time += 2000;
    } else {
        time += 2100*lastBubble["content"].length;
    }

    canChange = false; // On bloque la possibilité de changer de thème pendant l'ajout des bulles

    // On traite la bulle dans bonne fonction en fonction de son type
    setTimeout(() => { 
        if (bubbleJson["type"] == "bubble") {
            addBubble(bubbleJson["speaker"], bubbleJson["content"]);
        }
        if (bubbleJson["type"] == "nom") {
            addNameBubble(bubbleJson);
        }
        if (bubbleJson["type"] == "choice") {
            addChoiceBubble(bubbleJson);
        }
        if (bubbleJson["type"] == "topicChoice") {
            addTopicBubble(bubbleJson);
        }
        if (bubbleJson["type"] == "quit") {
            addQuitBubble(bubbleJson);
        }

        if (bubbleJson["type"] != "bubble") {
            canChange = true; // ON débloque la possibilité de changer de thème
        }
    }, time);
}

// Fonction pour ajouter une bulle de dialogue guide ou utilisateur
function addBubble(speaker, contents) {
    let container;
    let bubble;
    let i = 0;
    let conv_dico = { // "Dictionnaire" pour remplacer toutes les balises dans les bulles du JSON
        "${user_name}": user_name,
        "${quartier}": quartier_dico[quartier],
        "${lieu}": data["Lieux"][nextTopic],
        "${video_begin}": "<iframe class=\"videos\" src=\"",
        "${video_end}": "\" title=\"YouTube video player\" frameborder=\"0\"></iframe>",
        "${image_begin}": "<div style='width:200px'><img class=\"conversation_image\" src=\"img/images_conversation/" + quartier.toLocaleLowerCase() + "/",
        "${image_end}": "\"></div>",
        "${lien_video_begin}": "<a class=\"lien-conv\" href=\"./reportages\">",
        "${lien_video_end}": "</a>",
        "${lien_portrait_begin}": "<a class=\"lien-conv\" href=\"./interview\">",
        "${lien_portrait_end}": "</a>"
    }

    // Cas des bulles utilisateur
    if (speaker == "user") {
        container = '<div class="rp_user"><p class="user_name">'+ user_name +'</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                for (const [key, value] of Object.entries(conv_dico)) {
                    content = content.replace(key, value);
                }

                bubble = '<li class="cont_user anime_user">' + content + '</li>';
                list.innerHTML += bubble; // Ajout de l'élément HTML

                setTimeout(() => { 
                    var element = document.querySelector(".anime_user");
                    element.classList.remove("anime_user"); // On enlève la classe d'animation pour éviter les bugs d'animation
                }, 2000 );

                scrollSmoothlyToBottom();
            }, 2100*i);
            i++;
        });
    // Cas des bulles guide
    } else {
        container = '<div class="rp_guide"><p class="name_guide">Stéphane</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                for (const [key, value] of Object.entries(conv_dico)) {
                    content = content.replace(key, value);
                }

                bubble = '<li class="cont_guide anime_guide">' + content + '</li>';
                list.innerHTML += bubble;// Ajout de l'élément HTML
                scrollSmoothlyToBottom();

                setTimeout(() => { 
                    var element = document.querySelector(".anime_guide");
                    element.classList.remove("anime_guide"); // On enlève la classe d'animation pour éviter les bugs d'animation
                }, 2000);

            }, 2100*i);
            i++;
        });
    }
}

// Fonction pour ajouter la bulle de demande de nom
function addNameBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom"><label for="username_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="username_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';
    let placeholder = '<div class="choices-placeholder"><label for="placeholder_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="placeholder_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    time = 0;
    saveConversation(); // On sauvegarde la conversation
}

// Fonction activée lorsque le nom est saisi
function saveUsername(event){
    if (event.key === 'Enter' && document.querySelector(".conversation #username_input").value.length > 0) {
        user_name = document.querySelector(".conversation #username_input").value;

        // On supprime les éléments de saisi de nom
        let choiceBubbles = $('.choices');
        choiceBubbles.remove();
        let choicePlaceholder = $('.choices-placeholder');
        choicePlaceholder.remove();

        // On ajoute la bulle de réponse
        addBubble(lastBubble["speaker"], lastBubble["content"]);
        scrollSmoothlyToBottom();

        // On continue le déroulé de la conversation
        conversationUnfold(lastBubble["next"][0]);
    }
}

// Fonction pour ajouter une bulle de choix
function addChoiceBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
        placeholder += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    // On ajoute les éléments HTML
    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    time = 0;
    saveConversation(); // On sauvegarde la conversation
}

// Fonction activée lorsque le choix est fait
function choiceSelected(btnChoiceSelected){
    let textChoice = btnChoiceSelected.textContent || bouton.innerText; // get text content of the choiceBubble selected

    // On supprime les éléments de choix
    let choiceBubbles = $('.choices');
    choiceBubbles.remove();
    let choicePlaceholder = $('.choices-placeholder');
    choicePlaceholder.remove();
    
    // On ajoute la bulle de réponse
    addBubble("user", [lastBubble["content"][lastBubble["choicesLabel"].indexOf(textChoice)]]);
    scrollSmoothlyToBottom();

    // On continue le déroulé de la conversation
    conversationUnfold(lastBubble["next"][lastBubble["choicesLabel"].indexOf(textChoice)]); 
}

// Fonction pour ajouter la bulle de choix de thème
function addTopicBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        if (textContentChoice.toLocaleLowerCase() == topic) {
            choiceBubblesContent += '<button class="choice-bubbles greyed" onclick="topicSelected(this)">'+ textContentChoice + '</button>';
        } else {
            choiceBubblesContent += '<button class="choice-bubbles" onclick="topicSelected(this)">'+ textContentChoice + '</button>';
        }
        placeholder += '<button class="choice-bubbles" onclick="topicSelected(this)">'+ textContentChoice + '</button>';        
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    // Ajout des éléments HTML
    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    time = 0;
    saveConversation(); // On sauvegarde la conversation
}

// Fonction activée lorsque le choix de thème est fait
function topicSelected(btntopicSelected){
    let textChoice = btntopicSelected.textContent;

    nextTopic = textChoice.toLowerCase();

    // On supprimer les éléments de choix
    let choiceBubbles = $('.choices');
    choiceBubbles.remove();
    let choicePlaceholder = $('.choices-placeholder');
    choicePlaceholder.remove();

    // On ajoute la bulle de réponse
    addBubble("user", [lastBubble["content"][lastBubble["choicesLabel"].indexOf(textChoice)]]);
    scrollSmoothlyToBottom();

    // On continue le déroulé de la conversation
    conversationUnfold(lastBubble["next"][lastBubble["choicesLabel"].indexOf(textChoice)]);
}

// Fonction pour ajouter la bulle pour quitter le thème actuel et accéder au nouveau
function addQuitBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="changeTopic()">'+ textContentChoice.replace("${lieu}", data["Lieux"][nextTopic]) + '</button>';
        placeholder += '<button class="choice-bubbles" onclick="changeTopic()">'+ textContentChoice + '</button>';
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    // Ajout des éléments HTML
    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    time = 0;
    saveConversation(); // On sauvegarde la conversation
}

// Fonction activée lorsque on change de thème
function changeTopic() {
    time = 0; // On réinitialise le temps
    lastBubble = {"content": []}; // On réinitialise la bulle précédente
    topic = nextTopic; // On change le thème

    conversation.empty(); // On vide la conversation
    backgroundTransition(); // On fait défiler l'image de fond
    titleTransition(); // On fait défiler le titre du thème
    setTimeout(() => { 
        conversationUnfold("Debut"); // Après 1 seconde on poursuit la conversation
    }, 1000);
}

// Sauvegarde de la conversation dans le cache du navigateur
function saveConversation() {
    save.user_name = user_name;
    save.quartier = quartier;
    save.topic = topic;
    save.nextTopic = nextTopic;
    save.time = time;
    save.lastBubble = lastBubble;
    save.conversation = conversation.html();

    sessionStorage.setItem("save", JSON.stringify(save));
    sessionStorage.setItem("saveExist", true);

    console.log("Saved");
}

// Chargement de la sauvegarde de la conversation
async function reloadConversation() {
    
        save = JSON.parse(sessionStorage.getItem("save"));

        user_name = save.user_name;
        quartier = save.quartier;
        topic = save.topic;
        nextTopic = save.nextTopic;
        time = save.time;
        lastBubble = save.lastBubble;

        let resp  = await fetch('./data/' + quartier.toLowerCase() + '/' + topic.toLowerCase() + '.json')
        data = await resp.json();

        // Ajout du fond
        const new_img = document.createElement("img");
        new_img.src = "img/backgrounds/" + quartier.toLocaleLowerCase() + "/" + topic + "." + extension;
        document.querySelector(".background-container").appendChild(new_img);

        // Ajout du titre
        const new_title = document.createElement("h1");
        new_title.innerHTML =  topic_dico[topic];
        new_title.classList.add("topic-title");
        new_title.classList.add("title-in");
        document.querySelector("#guide-chemin").appendChild(new_title);

        // On vide la conversation et on remet les bulles de la sauvegarde
        conversation.empty();
        conversation.append(save.conversation);

        scrollSmoothlyToBottom();

        console.log("Reloaded ");
}

// Fonction pour lire le json contenant les dialogues et qui traite les bulles à partir de la valeur apssée en paramètre
async function conversationUnfold(nextID) {
    // On récupère la conversation dans le bon fichier JSON
    let resp  = await fetch('./data/' + quartier.toLowerCase() + '/' + topic.toLowerCase() + '.json')
    data = await resp.json();

    time = 0;
    let i = 0;
    let loopBreak = false;
    while (i < 100 && !loopBreak) { // On limite la boucle à 100 pour éviter de faire planter le navigateur en cas de boucle non désirée
        if (nextID === "Fin") {
            loopBreak = true; // On met fin à la boucle lorsqu'on arrive à la dernière bulle intitulée "Fin"
        } else {
            treatBubble(data[nextID]); // On traite la prochaine bulle
            lastBubble = data[nextID]; // On sauvegarde la bulle qui servira de bulle précédente

            // Si la bulle qu'on vient d'ajouter est un choix ou entrer le nom, on arrête
            if (data[nextID]["type"] === "nom" || data[nextID]["type"] === "choice" || data[nextID]["type"] === "topicChoice") { 
                loopBreak = true;
            } else {
                nextID = data[nextID]["next"][0];
            }
        }
        i++;
    }
}

// Correspondance entre le nom de code et le vrai nom des thèmes
let topic_dico = {
    "culture": "culture",
    "commerce": "commerces",
    "education": "éducation",
    "habitat": "habitat",
    "portrait": "portrait",
    "sport": "sport",
    "bienvenue": "bienvenue"
}

// Correspondance entre le nom de code et le vrai nom des quartiers
let quartier_dico = {
    "villejean": "Villejean",
    "st_martin": "Nord-St Martin",
    "maurepas": "Maurepas-Patton",
    "bourg_eveque": "Bourg L'Evêque-La Touche Moulin du Comte",
    "cleunay": "Cleunay-Arsenal-Redon",
    "centre": "Centre",
    "thabor": "Thabor-St Hélier",
    "jeanne_darc": "Jeanne d'Arc-Longs Champs-Atalante Beaulieu",
    "sud_gare": "Sud-gare",
    "francisco": "Francisco Ferrer-Vern-Poterie",
    "brequigny": "Bréquigny",
    "le_blosne": "Le Blosne",
    "autres": "Indisponible",
}
// On récupère le nom du quartier sélectionné dans la carte
let quartier = sessionStorage.getItem("quartier");

// Initialisation de variables
let data;
let conversation = $(".conversation");
let topic = sessionStorage.getItem("topic");
let nextTopic = "bienvenue";
let time = 0;
let lastBubble = {"content": []};
let save = {};
let extension = "svg";
let canChange = true;

// On regarde s'il y a déjà un user_name
let user_name = sessionStorage.getItem("user_name");
let start;
if (user_name == null) {
    user_name = "Vous";
    start = "Debut";
} else {
    start = "Bienvenue1";
}

// Si le quartier n'est pas encore implémenté (ce cas ne devrait plus arrivé car le bouton est maintenant bloqué pour les quartiers indisponible)
if (quartier_dispo[quartier] === false || quartier == undefined) {
    quartier = "autres";
    start = "Debut";
    extension = "png";
    nextTopic = "aucun"

    document.querySelectorAll(".undefinedElement").forEach(element => {
        element.remove();
    });

    console.log("Indisponible");
}

// Ajout du fond animé et du titre bienvenue si c'est la première fois que l'utilisateur arrive
if (sessionStorage.getItem("saveExist") === null) {
    const new_img = document.createElement("div");
    new_img.id = "background-animation";
    document.querySelector(".background-container").appendChild(new_img);

    const new_title = document.createElement("h1");
    new_title.innerHTML =  topic_dico[topic];
    new_title.classList.add("topic-title");
    new_title.classList.add("title-in");
    document.querySelector("#guide-chemin").appendChild(new_title);
}

// On met le nom du quartier dans les titres 
document.querySelectorAll(".quartier-titre").forEach(element => {
    element.innerHTML = quartier_dico[quartier];
});

// Ajout des event listener sur les boutons de thème du menu burger
document.querySelectorAll(".topicButton").forEach(button => {
    button.addEventListener("click", function(event) {
        closeNav();
        if (canChange) {
            nextTopic = event.target.dataset.topic;
            changeTopic();
        }
    });
});

// On attend un peu avant de lancer la conversation
setTimeout(() => {
    // Si c'est la première fois qu'on arrive, 
    if (sessionStorage.getItem("save") == null || !quartier_dispo[quartier]) {
        conversationUnfold(start);
    // Sinon on recharge la sauvegarde
    } else {
        reloadConversation();
    }
    guide_coucou_animation.stop();
    guide_coucou_animation.play();
}, 1000);