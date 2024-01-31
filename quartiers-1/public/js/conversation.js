"use strict";

/* --- INIT --- */
let conversation = $(".conversation");
let arrowDown = $(".conversation-arrow-down");
let user_name = "Vous";
let quartier = "Villejean";
let topic = "start";


/* --- OTHER FUNCTIONS --- */


function scrollSmoothlyToBottom() {
    let div = $("#villejean-conversation");

    div.animate({
        scrollTop: div.prop("scrollHeight")
    },1000);
};

function treatBubble(bubbleJson, i) {
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
    }, 1000*i + 1000);

    setTimeout(() => { 
        scrollSmoothlyToBottom();
    }, 900);
}

function addBubble(speaker, content) {
    let bubbles;

    if (speaker == "user") {
        bubbles = '<div class="rp_user"><p class="user_name">'+ user_name +'</p><ul>';

        content.forEach(content => {
            bubbles += '<li class="cont_user">' + content.replace("${user_name}", user_name) + '</li>';
        });
    } else {
        bubbles = '<div class="rp_guide"><p class="name_guide">Guide</p><ul>';
        content.forEach(content => {
            bubbles += '<li class="cont_guide">' + content.replace("${quartier}", quartier) + '</li>';
        });
    }

    bubbles += '</ul></div>';
    conversation.append(bubbles);// add html to conversation div
}

function addNameBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices"><label for="username_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="username_input" name="username_input" placeholder="votre nom" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';
        
    conversation.append(choiceBubblesContent);// add html to conversation div
}

function saveUsername(event){
    if (event.key === 'Enter') {
        user_name = document.getElementById("username_input").value;

        // remove all choices
        let choiceBubbles = $('.choices');
        choiceBubbles.remove();

        addBubble(lastBubble["speaker"], lastBubble["content"]);
                
        conversation_fonction(lastBubble["next"][0]);
    }
}

function addChoiceBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
    });

    choiceBubblesContent += '</div>';
    
    conversation.append(choiceBubblesContent);// add html to conversation div
}

function choiceSelected(btnChoiceSelected){
    let textChoice = btnChoiceSelected.textContent || bouton.innerText; // get text content of the choiceBubble selected

    // remove all choices
    let choiceBubbles = $('.choices');
    choiceBubbles.remove();

    addBubble("user", [lastBubble["content"][lastBubble["choicesLabel"].indexOf(textChoice)]])

    conversation_fonction(lastBubble["next"][lastBubble["choicesLabel"].indexOf(textChoice)]);
}

async function conversation_fonction(nextID) {
    let resp  = await fetch('./data/' + quartier.toLowerCase() + '/' + topic.toLowerCase() + '.json')
    let data = await resp.json();

    let i = 0;
    let loopBreak = false;
    while (!loopBreak) {
        if (nextID == "Fin") {
            loopBreak = true;
        } else {
            treatBubble(data[nextID], i);
            lastBubble = data[nextID];

            // Si la prochaine bulle est "Fin" on arrête
            if (data[nextID]["type"] == "nom" || data[nextID]["type"] == "choice") { // Si la bulle qu'on vient d'ajouter est un choix ou entrer le nom, on arrête
                loopBreak = true;
            } else {
                nextID = data[nextID]["next"][0];
            }
        }

        i++;
    }
}

let lastBubble;
conversation_fonction("Debut");
