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


## A supprimer

Ces instructions ne sont la que pour vous guider dans le développement de vos pages web. Elles seront à supprimer pour la soumission finale de votre code.

Le dossier de votre projet contient un squelette de code que vous devez modifier. 

- La partie `serveur.js`  ne doit a priori pas être touchée, si vous avez des entrées d'API à ajouter il faudra le faire dans le dossier `api`.
- Le dossier `public`  contient la partie statique de votre site. Par défaut le fichier index.html charge un fichier `style.css` qui est destiné au format mobile (portrait). Si votre porteur de projet demande un site desktop, vous pouvez vous baser sur l'exemple `index-desktop.html` et le CSS associé `style-desktop.css` qui propose une page au format paysage.

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

Si votre projet nécessite des instructions spécifiques pour son déploiement, merci d'ajouter des explications ici.
