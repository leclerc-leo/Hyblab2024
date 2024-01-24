"use strict";

const conversation = document.getElementById('conversation');

// Add reply into the conversation
function addSpeechBubble(content, sender) {
    
    let rp = document.createElement('div');
    let rp_content = document.createElement('div');
    let name = document.createElement('p');
    let cont = document.createElement('div');
    let text= document.createElement('p');
    
    // Content according to sender
    if (sender === 'guide') {
        rp.classList.add('rp_guide');
        name.classList.add('name_guide');
        cont.classList.add('cont_guide');

        name.textContent = "Guide";
    } else if (sender === 'user') {
        rp.classList.add('rp_user');
        name.classList.add('name_user');
        cont.classList.add('cont_user');

        name.textContent = "Vous";
    }

    // Add text content
    text.textContent = content;

    rp_content.appendChild(name);
    cont.appendChild(text);
    rp_content.appendChild(cont);
    rp.appendChild(rp_content);
    conversation.appendChild(rp);

    // Fait défiler automatiquement la conversation pour afficher le nouveau message
    conversation.scrollTop = conversation.scrollHeight;
}

// Test ajouts
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');
addSpeechBubble("Bonjour, bienvenue au quartier de XXXXXX, je peux te guider !", 'guide');
addSpeechBubble("Salut! Merci de m'accueillir. J'aimerais en savoir plus sur le quartier.", 'user');
addSpeechBubble("Bien sûr! Quels sont vos centres d'intérêt spécifiques?", 'guide');


