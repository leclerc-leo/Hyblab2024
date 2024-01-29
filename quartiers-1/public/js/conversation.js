"use strict";

/* --- INIT --- */
let conversation = $(".conversation");
let arrowDown = $(".conversation-arrow-down");
let isTimeoutActive = false;

/* --- CONVERSATION FUNCTIONS --- */
/* Users speech bubble */
function addBubbleUser(content) {
    conversation.queue(function (next) {
        let responseBubbleUser = $('<div class="rp_user"><p class="name_user">Vous</p><div class="cont_user"><p>' + content + '</p></div></div>');// put content into html
        conversation.append(responseBubbleUser);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_user'));

        responseBubbleUser.show();
        setTimeout(next, 750);
    });
}
/* Guides speech bubbles */
function addBubbleGuide(content) {
    conversation.queue(function (next) {
        let responseBubbleGuide = $('<div class="rp_guide"><p class="name_guide">Guide</p><div class="cont_guide"><p>' + content + '</p></div></div>');// put content into html
        conversation.append(responseBubbleGuide);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_guide'));

        // Then show speech bubble
        responseBubbleGuide.show();
        setTimeout(next, 750);
    });
}
/* choice bubbles */
function addChoiceBubble(content) {
    conversation.queue(function (next) {
        // put content into html
        let choiceBubblesContent = '<div class="choices">';
        content.forEach(textContentChoice => {
            choiceBubblesContent += '<button class="choice-bubbles" onclick="choiceSelected(this)">'+ textContentChoice + '</button>';
        });
        choiceBubblesContent += '</div>';
        
        let choiceBubbles = $(choiceBubblesContent);
        conversation.append(choiceBubbles);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.choices'));

        // Then show speech bubble
        choiceBubbles.show();
        setTimeout(next, 750);
    });
}

function addVideo(content) {
    conversation.queue(function (next) {
        // put content into html
        let video = $('<div class="rp_guide"><p class="name_guide">Guide</p><iframe class="videos" src="https://www.youtube.com/embed/4wR5ubwNarE?si=bT3NZbn262FIpfp2&start=193&end=294&controls=0" title="YouTube video player" frameborder="0"></iframe></div>');
        
        conversation.append(video);// add html to conversation div

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight('.rp_guide'));

        // Then show speech bubble
        video.show();
        setTimeout(next, 750);
    });
}

function choiceSelected(btnChoiceSelected){
    let textChoice = btnChoiceSelected.textContent || bouton.innerText;

    let choiceBubbles = $('.choices');
    choiceBubbles.remove();

    addBubbleUser(textChoice);

    addBubbleGuide("Très bien maintenant choisi un choix parmi ces choix:");

    addChoiceBubble(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4"]);

}

/* --- AUTOMATIC SCROLL FUNCTIONS --- */

/* Change scroll value of conversation div */
function scrollConversation(offset) {
    conversation.animate({
        scrollTop: '+=' + offset
    }, 500);
}

/* get last speech bubble height */
function getLastBubbleHeight(typeBubble) {
    let lastBubble = conversation.find(typeBubble+':last');
    return lastBubble.outerHeight(true);
}

/* --- IMPLEMENTATION --- */

// Initial speech bubbles

addBubbleGuide("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !");
addBubbleUser("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.");
addVideo(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4"]);

conversation.dequeue();
// Add speech bubbles
arrowDown.on("click", function () {
    if (!isTimeoutActive) {
        isTimeoutActive = true;

        addBubbleGuide("Et oui, il en existe plein ! Comme l’association Mosaïque par exemple, qui depuis 2003, s’est lancée dans l’aide aux devoirs. D’ailleurs, en 2023, ils ont aidé onze élèves à obtenir leur brevet des collèges. Bon je ne t’en dis pas plus, Natacha le raconte mieux que moi !");
        addChoiceBubble(["Ceci est le choix 1","Ceci est le choix 2","Ceci est le choix 3","Ceci est le choix 4"]);
        
        conversation.dequeue();
        isTimeoutActive = false;
    }
});