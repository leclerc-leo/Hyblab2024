"use strict";

function scrollSmoothlyToBottom() {
    let div = $("#villejean-conversation");

    div.animate({
        scrollTop: div.prop("scrollHeight")
    }, 1000);
};

function treatBubble(bubbleJson) {
    console.log(lastBubble);
    if (lastBubble["type"] == "choice" || lastBubble["type"] == "topicChoice") {
        time += 1000;
    } else {
        time += 1100*lastBubble["content"].length;
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
        if (bubbleJson["type"] == "topicChoice") {
            addTopicBubble(bubbleJson);
        }
        if (bubbleJson["type"] == "quit") {
            addQuitBubble(bubbleJson);
        }
    }, time);
}

function addBubble(speaker, contents) {
    let container;
    let bubble;
    let i = 0;
    let dictionary = {
        "${user_name}": user_name,
        "${quartier}": quartier,
        "${video_begin}": "<iframe class=\"videos\" src=\"",
        "${video_end}": "\" title=\"YouTube video player\" frameborder=\"0\"></iframe>",
        "${image_begin}": "<img class=\"conversation_image\" src=\"img/images_conversation/" + quartier.toLocaleLowerCase() + "/",
        "${image_end}": "\">"
    }

    if (speaker == "user") {
        container = '<div class="rp_user"><p class="user_name">'+ user_name +'</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                for (const [key, value] of Object.entries(dictionary)) {
                    content = content.replace(key, value);
                }

                bubble = '<li class="cont_user anime_user">' + content + '</li>';
                list.innerHTML += bubble;

                setTimeout(() => { 
                    var element = document.querySelector(".anime_user");
                    element.classList.remove("anime_user");
                }, 1000 );

                scrollSmoothlyToBottom();
            }, 1100*i);
            i++;
        });

    } else {
        container = '<div class="rp_guide"><p class="name_guide">Guide</p><ul></ul></div>';
        conversation.append(container);
        let list = document.querySelector(".conversation div:last-of-type ul:last-of-type");

        contents.forEach(content => {
            setTimeout(() => { 
                for (const [key, value] of Object.entries(dictionary)) {
                    content = content.replace(key, value);
                }

                bubble = '<li class="cont_guide anime_guide">' + content + '</li>';
                list.innerHTML += bubble;
                scrollSmoothlyToBottom();

                setTimeout(() => { 
                    var element = document.querySelector(".anime_guide");
                    element.classList.remove("anime_guide");
                }, 1000);

            }, 1100*i);
            i++;
        });
    }
}

function addNameBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom"><label for="username_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="username_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';
    let placeholder = '<div class="choices-placeholder"><label for="placeholder_input">' + bubbleJson["choicesLabel"][0] + '<input type="text" id="placeholder_input" class="input" name="username_input" required minlength="2" maxlength="20" size="10" onkeydown="saveUsername(event)"/> ! </label></div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    saveConversation();
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

        conversationUnfold(lastBubble["next"][0]);
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

    scrollSmoothlyToBottom();
    saveConversation();
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

function addTopicBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="topicSelected(this)">'+ textContentChoice + '</button>';
        placeholder += '<button class="choice-bubbles" onclick="topicSelected(this)">'+ textContentChoice + '</button>';
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    saveConversation();
}

function topicSelected(btntopicSelected){
    let textChoice = btntopicSelected.textContent;

    nextTopic = textChoice.toLowerCase();

    let choiceBubbles = $('.choices');
    choiceBubbles.remove();
    let choicePlaceholder = $('.choices-placeholder');
    choicePlaceholder.remove();

    addBubble("user", [lastBubble["content"][lastBubble["choicesLabel"].indexOf(textChoice)]]);
    scrollSmoothlyToBottom();

    conversationUnfold(lastBubble["next"][lastBubble["choicesLabel"].indexOf(textChoice)]);
}


function addQuitBubble(bubbleJson) {
    let choiceBubblesContent = '<div class="choices anime_bottom">';
    let placeholder = '<div class="choices-placeholder">';

    bubbleJson["choicesLabel"].forEach(textContentChoice => {
        choiceBubblesContent += '<button class="choice-bubbles" onclick="changeTopic()">'+ textContentChoice + '</button>';
        placeholder += '<button class="choice-bubbles" onclick="changeTopic()">'+ textContentChoice + '</button>';
    });
    choiceBubblesContent += '</div>';
    placeholder += '</div>';

    conversation.append(placeholder);
    conversation.append(choiceBubblesContent);

    scrollSmoothlyToBottom();
    saveConversation();
}

function changeTopic() {
    time = 0;
    lastBubble = {"content": []};
    topic = nextTopic;

    conversation.empty();
    backgroundTransition();
    setTimeout(() => { 
        conversationUnfold("Debut");
    }, 1000);
}

function saveConversation() {
    save.user_name = user_name;
    save.quartier = quartier;
    save.topic = topic;
    save.nextTopic = nextTopic;
    save.time = time;
    save.lastBubble = lastBubble;
    save.conversation = conversation.html();

    sessionStorage.setItem("save", JSON.stringify(save));

    console.log("saved");
}

function reloadConversation() {
    save = JSON.parse(sessionStorage.getItem("save"));

    user_name = save.user_name;
    quartier = save.quartier;
    topic = save.topic;
    nextTopic = save.nextTopic;
    time = save.time;
    lastBubble = save.lastBubble;

    conversation.empty();
    conversation.append(save.conversation);

    scrollSmoothlyToBottom();

    console.log("reloaded");
}

async function conversationUnfold(nextID) {
    let resp  = await fetch('./data/' + quartier.toLowerCase() + '/' + topic.toLowerCase() + '.json')
    let data = await resp.json();

    time = 0;
    let i = 0;
    let loopBreak = false;
    while (i < 10 && !loopBreak) {
        if (nextID == "Fin") {
            loopBreak = true;
        } else {
            treatBubble(data[nextID]);
            lastBubble = data[nextID];

            // Si la bulle qu'on vient d'ajouter est un choix ou entrer le nom, on arrête
            if (data[nextID]["type"] == "nom" || data[nextID]["type"] == "choice" || data[nextID]["type"] == "topicChoice") { 
                loopBreak = true;
            } else {
                nextID = data[nextID]["next"][0];
            }
        }
        i++;
    }
}

let conversation = $(".conversation");
let quartier = "Villejean";
let topic = "bienvenue";
let nextTopic = "bienvenue";
let time = 0;
let lastBubble = {"content": []};
let save = {};

let user_name = sessionStorage.getItem("user_name");
let start;
if (user_name == null) {
    start = "Debut";
} else {
    start = "Binvenue1";
}

backgroundTransition();
setTimeout(() => {
    if (sessionStorage.getItem("save") == null) {
        conversationUnfold(start);
    } else {
        reloadConversation();
    }
}, 1000);

const save_button = document.querySelector(".save");
save_button.addEventListener("click", function() {
    saveConversation();
});
const reload_button = document.querySelector(".reload");
reload_button.addEventListener("click", function() {
    reloadConversation();
});