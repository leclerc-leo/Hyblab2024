"use strict";

const card_quand = document.getElementById('card-quand');
const card_ou = document.getElementById('card-ou');
const card_gym = document.getElementById('card-gym');
const card_anecdote = document.getElementById('card-anecdote');

card_quand.addEventListener('click', () => { 
    console.log('cliqué sur photo_quand');

    if (!card_quand.classList.contains("actif")) {
        

        card_ou.classList.add("hidden");
        card_gym.classList.add("hidden");
        card_anecdote.classList.add("hidden");

        card_quand.classList.add("actif");
    }
    else {
        card_ou.classList.remove("hidden");
        card_gym.classList.remove("hidden");
        card_anecdote.classList.remove("hidden");
        
        card_quand.classList.remove("actif");
    }
    

});
