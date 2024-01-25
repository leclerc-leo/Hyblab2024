"use strict";

/* --- INIT --- */
let conversation = $(".conversation");
let arrowDown = $(".conversation-arrow-down");
let isTimeoutActive = false;

// jQuery Queue to manage speech bubbles implementation and avoid timeouts
let messageQueue = $({});

/* --- CONVERSATION FUNCTIONS --- */
/* Users speech bubble */
function addBubbleUser(content) {
    let responseBubbleUser = $('<div class="rp_user"><div><p class="name_user">Vous</p><div class="cont_user"><p>' + content + '</p></div></div></div>');
    conversation.append(responseBubbleUser);

    messageQueue.queue(function (next) {

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight());

        // Then show speech bubble
        responseBubbleUser.show( function () {
            next();
        });
    });
}
/* Guides speech bubbles */
function addBubbleGuide(content) {
    let responseBubbleGuide = $('<div class="rp_guide"><div><p class="name_guide">Guide</p><div class="cont_guide"><p>' + content + '</p></div></div></div>');
    conversation.append(responseBubbleGuide);

    messageQueue.queue(function (next) {

        // Scroll according to messages height
        scrollConversation(getLastBubbleHeight());

        // Then show speech bubble
        responseBubbleGuide.show(function () {
            next();
        });
    });
}

/* --- AUTOMATIC SCROLL FUNCTIONS --- */

/* Change scroll value of conversation div */
function scrollConversation(offset) {
    conversation.animate({
        scrollTop: '+=' + offset
    }, 500);
}

/* get last speech bubble height */
function getLastBubbleHeight() {
    let lastBubble = conversation.find('.rp_user:last, .rp_guide:last');
    return lastBubble.outerHeight(true);
}

/* --- IMPLEMENTATION --- */

// Initial speech bubbles
messageQueue.queue(function (next) {
    addBubbleGuide("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !");
    next();
});

messageQueue.queue(function (next) {
    addBubbleUser("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.");
    isTimeoutActive = false;
    next();
});

// Add speech bubbles
arrowDown.on("click", function () {
    if (!isTimeoutActive) {
        isTimeoutActive = true;

        messageQueue.queue(function (next) {
            addBubbleGuide("Et oui, il en existe plein ! Comme l’association Mosaïque par exemple, qui depuis 2003, s’est lancée dans l’aide aux devoirs. D’ailleurs, en 2023, ils ont aidé onze élèves à obtenir leur brevet des collèges. Bon je ne t’en dis pas plus, Natacha le raconte mieux que moi !");
            next();
        });

        messageQueue.queue(function (next) {
            addBubbleUser("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.");
            isTimeoutActive = false;
            next();
        });
    }
});