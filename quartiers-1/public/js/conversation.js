"use strict";

function scrollSmoothlyToBottom() {
    let div = $("#villejean-conversation");

    div.animate({
        scrollTop: div.prop("scrollHeight")
    },1000);
};

function treatBubble(bubbleJson, i) {
    if (lastBubble["type"] == "choice") {
        time += 1000;
    } else {
        time += 1000*lastBubble["content"].length;
    }

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
    }, time);


    setTimeout(() => { 
        scrollSmoothlyToBottom();
    }, time);
}

function addBubble(speaker, contents) {
    let container;
    let bubble;
    let i = 0;

    if (speaker == "user") {
        container = '<div class="rp_user"><p class="user_name">'+ user_name +'</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                bubble = '<li class="cont_user anime_user">' + content.replace("${user_name}", user_name) + '</li>';
                list.innerHTML += bubble;

                setTimeout(() => { 
                    var element = document.querySelector(".anime_user");
                    element.classList.remove("anime_user");
                }, 1000 );

            }, 1000*i );
            i++;
        });

    } else {
        container = '<div class="rp_guide"><p class="name_guide">Guide</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                bubble = '<li class="cont_guide anime_guide">' + content.replace("${quartier}", quartier) + '</li>';
                list.innerHTML += bubble;

                setTimeout(() => { 
                    var element = document.querySelector(".anime_guide");
                    element.classList.remove("anime_guide");
                }, 1000);

            },1000*i );
            i++;
        });
    }
}

function addNameBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom"><label for="username_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="username_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';
    let placeholder = '<div class="choices-placeholder"><label for="placeholder_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="placeholder_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);
}

function saveUsername(event){
    if (event.key === 'Enter') {
        user_name = document.querySelector(".conversation #username_input").value;

        // remove all choices
        let choiceBubbles = $('.choices');
        choiceBubbles.remove();
        let choicePlaceholder = $('.choices-placeholder');
        choicePlaceholder.remove();

        addBubble(lastBubble["speaker"], lastBubble["content"]);
        scrollSmoothlyToBottom();

        setTimeout(() => { 
            conversationUnfold(lastBubble["next"][0]);
        }, 0);
    }
}

function addChoiceBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
        placeholder += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);
}

function choiceSelected(btnChoiceSelected){
    let textChoice = btnChoiceSelected.textContent || bouton.innerText; // get text content of the choiceBubble selected

    // remove all choices
    let choiceBubbles = $('.choices');
    choiceBubbles.remove();
    let choicePlaceholder = $('.choices-placeholder');
    choicePlaceholder.remove();
    
    addBubble("user", [lastBubble["content"][lastBubble["choicesLabel"].indexOf(textChoice)]]);
    scrollSmoothlyToBottom();

    conversationUnfold(lastBubble["next"][lastBubble["choicesLabel"].indexOf(textChoice)]);
}

function reloadConversation() {
    user_name = save["user_name"];
    quartier = save["quartier"];
    topic = save["topic"];
    time = save["time"];
    lastBubble = save["lastBubble"];

    conversation.empty();
    console.log(save["conversation"])
    conversation.append(save["conversation"]);
}

function saveConversation() {
    save["user_name"] = user_name;
    save["quartier"] = quartier;
    save["topic"] = topic;
    save["time"] = time;
    save["lastBubble"] = lastBubble;
    save["conversation"] = conversation.html();    
}

async function conversationUnfold(nextID) {
    let resp  = await fetch('./data/' + quartier.toLowerCase() + '/' + topic.toLowerCase() + '.json')
    let data = await resp.json();

    time = 0;
    let i = 0;
    let loopBreak = false;
    while (!loopBreak) {
        if (nextID == "Fin") {
            loopBreak = true;
        } else {
            treatBubble(data[nextID], i);
            lastBubble = data[nextID];

            // Si la bulle qu'on vient d'ajouter est un choix ou entrer le nom, on arrête
            if (data[nextID]["type"] == "nom" || data[nextID]["type"] == "choice") { 
                loopBreak = true;
            } else {
                nextID = data[nextID]["next"][0];
            }
        }

        i++;
    }
}

let conversation = $(".conversation");
let user_name = "Vous";
let quartier = "Villejean";
let topic = "start";
let time;
let lastBubble = {"content": []};

let save = {};


setTimeout(() => {
    conversationUnfold("Debut");
}, 1000);

const reload_button = document.querySelector(".reload");
reload_button.addEventListener("click", function() {
    reloadConversation();
});

const save_button = document.querySelector(".save");
save_button.addEventListener("click", function() {
    saveConversation();
});