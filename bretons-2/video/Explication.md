# Explication Remotion

Nous avons utilisé Remotion en Javascripte et non en typescripte, mais cela ne change pas grand chose. 
Lien de la documentation de Remotion : https://www.remotion.dev/docs/ 

## Installation

Pour créer un projet avec Remotion, il faut tout d'abord avoir Node.js installé sur votre machine.
Ensuite, il faut lancer la commande suivante : 
```bash
npm init video
```
Cela va créer un projet Remotion, le programme va vous demander le nom du projet, si vous voulez utiliser un template (nous avons utilisé le Hellozorld Jqvqscript) puis cq vq installez les dépendances nécessaires.

## Structure du projet

Le projet est composé de plusieurs fichiers et dossiers, mais le dossier 'src' est le dossier principal ou vous allez travailler.
Dans se dossier il y a : 
- Root.jsx : c'est le fichier principal de vos vidéos, c'est ici que vous allez définir la durée de vos vidéos, le nombre de fps, etc.
- Et un dossier par vidéo que vous voulez créer. Dans ces dossiers, il y a un fichier 'index.js' qui est le fichier principal de la vidéo, c'est ici que vous allez définir le contenu de votre vidéo. Vous pouvez aussi mettre dans ce dossier d'autre fichier .jsx permettant de stocker des éléments de votre vidéo. 

## Explication de Root.jsx

La fonction calculateMetadata permet de récupérer les éléments des différents JSON (grâce notamment à la fonction fetch) et de les stocker dans des variables qui seront ensuite envoyées vers la vidéo souhaitée.
La fonction RemotionRoot contient les vidéos que vous voulez créer. Vous pouvez en ajouter autant que vous voulez, pour créer une vidéo il suffit de rajouter une ligne de code comme celle-ci : 
```jsx
<Composition 
    id="Video1" // Nom de votre vidéo
    component={Video1} // Nom de la variable contenant votre video que vous aurez importer en haut de votre fichier (import Video1 from './Video1')
    durationInFrames={100} // Durée de votre vidéo en frame
    fps={30} // Nombre de frame par seconde
    width={1920} // Largeur de votre vidéo
    height={1080}  // Hauteur de votre vidéo
    defaultProps={{}} // Propriété par défaut de votre vidéo
    calculateMetaData={calculateMetadata} // Permet d'envoyé les éléments des différents JSON dans votre vidéo (Pas obligatoire, peux etre remplacer par defaultProps)
/>
```

## Explication de index.jsx

Dans ce fichier, vous allez définir le contenu de votre vidéo. Vous pouvez utiliser des éléments de votre vidéo stocker dans d'autres fichiers .jsx, mais il faut les importer en haut de votre fichier.
Il faut exporter une fonction qui va contenir le contenu de votre vidéo, cette fonction prendra en paramètre les éléments importés par le fichier Root.jsx (dans défaut props ou calculateMetaData). La fonction retournera un élément JSX qui sera en partie en HTML CSS avec des éléments de Remotion.

## Explication des animations

Documentation des animations : https://www.remotion.dev/docs/animating-properties
Pour faire des animations,il faut tout d'abord choisir le type d'animation (https://www.remotion.dev/docs/transforms), puis il faut utiliser la fonction interpolate qui permet de faire des animations dans le temps. Il faut ensuite choisir l'élément que l'on va animé et mettre dans cet élément un paramètre style qui contiendra l'animation. 
```jsx
<div style={{
    transform: `translateY(${interpolate(0, 100, 0, 100, frame)}px)`, // Animation de translation en Y
    opacity: interpolate(0, 1, 0, 100, frame), // Animation d'opacité
    fontSize: interpolate(0, 100, 0, 100, frame), // Animation de taille de police
    color: interpolateColors(0, 100, {r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, frame), // Animation de couleur
}}>
```

## Explication des décalages

Pour faire des décalages, il faut utiliser l'élément Sequence, cet élément qui s'utilise comme un élément HTML permettent de faire des décalages. Il faut lui donner en paramètre le nombre de frames de décalage que l'on veut et le nombre de frames où les éléments qui sont un l'intérieur s'afficheront. 
```jsx
<Sequence from={0} durationInFrames={100}>
    <Text>Texte 1</Text>
    <Text>Texte 2</Text>
</Sequence>
```

## Explication des images

Pour ajouter des images, il faut utiliser l'élément Img qui s'utilise comme un élément HTML. En paramètre il faut lui donner le chemin de l'image que l'on veut afficher, mais avec la fonction 'staticFile' qui permet de récupérer directement les fichiers dans le dossier 'public' à la racine de votre projet.
```jsx
<Img src={staticFile('/image.png')} />
```

# Lancer remotion studio

Pour lancer remotion studio, il faut lancer la commande suivante à la racine de votre projet : 
```bash
npm run start
```

# Lancer le rendu de la vidéo

Pour lancer le rendu de la vidéo, il faut lancer la commande suivante à la racine de votre projet : 
```bash
remotion render Nom_Video dossier_de_la_video/nom_Video.mp4
```
Vous pouvez aussi lancer le rendu dans remotion studio en cliquant sur le bouton render en bas à droite de la page.