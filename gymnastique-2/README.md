# Descriptif du projet

Porteur de projet : La Nouvelle République

Sujet : Gymnastique 2

Nom d'équipe : La MezzaGym

Participants : 

- AGR :
  - Clémence Faber
  - Mathys Benard

- EPJT :
  - Victoire Renard Dewynter

- Polytech :  
  - Laure Boudaud
  - Léo Leclerc
  - Guillaume Polizzi
  - Octave Daudin
  - Bastien Baudouin

- SciencesPo : 
  - Juliette Pirot-Berson

## Instructions de développements

### Ajout d'une page pour une catégorie
```html
<section class="swiper-slide">
  ...
  <a class="category-button" id="histoire-button" style="top: 25%; left: 25%;">
    Histoire</a>
  <div id="histoire-page" class="category-page swiper hidden">
    <p>Hello World !</p>
  </div>
  ...
</section>
```

Lors de l'ajout d'une catégory, un boutton doit être ajouté dans la section de la slide concernée, le boutton devra avoir un id "<nomdepage>-button".
Ensuite une div avec l'id "<nomdepage>-page" devra être ajoutée juste après le boutton, cette div contiendra le contenu de la page.

## Instructions de déploiement

Il n'y a pas de déploiement supplémentaire à faire, le server.js de la racine du projet permet de servir les fichiers statiques du projet.
Nous n'avons pas de library externe ormis express, il n'y a donc pas de dépendance à installer.
