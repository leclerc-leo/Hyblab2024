#!/bin/bash

# Création automatique des vidéos

read -p "Nom et prénom de l'athlète : " nom
read -p "Sexe : " sexe
read -p "Date : " date
read -p "Sport : " sport
read -p "Epreuve : " epreuve
read -p "Adversaire : " adv 
read -p "Score de la France : " scoreFr
read -p "Score des adversaires : " scoreAd
read -p "Anecdote match : " anec

if [ "$scoreFr" -gt "$scoreAd" ]; then
    result="V"
else
    result="D"
fi

node -p "
let data = require('./public/Donnée/match.json');

let match = {
    'Date': '$date',
    'Sport': '$sport',
    'Sexe': '$sexe',
    'Epreuve': '$epreuve',
    'Athlete': '$nom',
    'Resultat': $scoreFr,
    'Adversaire': '$adv',
    'Resultat_adversaire': $scoreAd,
    'Victoire_Défaite': '$result',
    'Anecdote_victoire': '$anec',
    'Anecdote_défaite': '$anec'
}
data.push(match);

console.log(JSON.stringify(data))
"  > "./public/Donnée/match2.json";

mv "./public/Donnée/match2.json" "./public/Donnée/match.json";

head -n -1 "./public/Donnée/match.json" > temp.txt ; mv temp.txt "./public/Donnée/match.json"

npx remotion render Video ../public/Videos/match-Football-4.mp4

node -p "
let data = require('../public/JSON/videos.json');

data.$sport.push('"match-$sport-4.mp4"');

console.log(JSON.stringify(data))
"  > "../public/JSON/videos2.json"

mv "../public/JSON/videos2.json" "../public/JSON/videos.json"

head -n -1 "../public/JSON/videos.json" > temp2.txt ; mv temp2.txt "../public/JSON/videos.json"
