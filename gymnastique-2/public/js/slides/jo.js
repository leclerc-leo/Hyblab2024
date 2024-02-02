"use strict";

const card_quand = document.getElementById('card-quand');
const card_ou = document.getElementById('card-ou');
const card_gym = document.getElementById('card-gym');
const card_anecdote = document.getElementById('card-anecdote');

const text_quand = document.querySelector('#card-quand > div:nth-child(1) > p:nth-child(2');
const text_ou = document.querySelector('#card-ou > div:nth-child(1) > p:nth-child(2');
const text_gym = document.querySelector('#card-gym > div:nth-child(1) > p:nth-child(2');
const text_anecdote = document.querySelector('#card-anecdote > div:nth-child(1) > p:nth-child(2');

card_quand.addEventListener('click', () => { 
    if (!card_quand.classList.contains("actif")) {
        card_ou.classList.add("hidden");
        card_gym.classList.add("hidden");
        card_anecdote.classList.add("hidden");

        card_quand.classList.add("actif");
        text_quand.classList.remove("hidden");
    }
    else {
        card_ou.classList.remove("hidden");
        card_gym.classList.remove("hidden");
        card_anecdote.classList.remove("hidden");

        card_quand.classList.remove("actif");
        text_quand.classList.add("hidden");
    }
});

card_ou.addEventListener('click', () => { 
    if (!card_ou.classList.contains("actif")) {
        card_quand.classList.add("hidden");
        card_gym.classList.add("hidden");
        card_anecdote.classList.add("hidden");

        card_ou.classList.add("actif");
        text_ou.classList.remove("hidden");
    }
    else {
        card_quand.classList.remove("hidden");
        card_gym.classList.remove("hidden");
        card_anecdote.classList.remove("hidden");

        card_ou.classList.remove("actif");
        text_ou.classList.add("hidden");
    }
});

card_gym.addEventListener('click', () => { 
    if (!card_gym.classList.contains("actif")) {
        card_ou.classList.add("hidden");
        card_quand.classList.add("hidden");
        card_anecdote.classList.add("hidden");

        card_gym.classList.add("actif");
        text_gym.classList.remove("hidden");
    }
    else {
        card_ou.classList.remove("hidden");
        card_quand.classList.remove("hidden");
        card_anecdote.classList.remove("hidden");

        card_gym.classList.remove("actif");
        text_gym.classList.add("hidden");
    }
});

card_anecdote.addEventListener('click', () => { 
    if (!card_anecdote.classList.contains("actif")) {
        card_ou.classList.add("hidden");
        card_gym.classList.add("hidden");
        card_quand.classList.add("hidden");

        card_anecdote.classList.add("actif");
        text_anecdote.classList.remove("hidden");
    }
    else {
        card_ou.classList.remove("hidden");
        card_gym.classList.remove("hidden");
        card_quand.classList.remove("hidden");

        card_anecdote.classList.remove("actif");
        text_anecdote.classList.add("hidden");
    }
});