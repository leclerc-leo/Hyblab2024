export type Athlete = {
    Sport: string;
    Sexe: string;
    Epreuve: string;
    Athlete: string;
    Epreuve__1: string;
    Rang: number;
    Gain: string;
    Olympiade: string;
    "Ville de naissance": string;
    "Date de naissance": string;
    "Club (ville)": string;
    "Gentilé": string;
    "Résultat (temps /points)": string;
    "Podium (nom + résultat)": string;
    Performance: string;
    "Nombre de médailles françaises": string;
    Palmares: string;
    "Etudes / Métier": string;
    "Fun fact": string;
    Photo: string;
  };
  
  export type Video = {
    id: string;
    title: string;
    subtitle: string;
    srcPhoto: string;
    description: string;
  };
  
  export type VideoListItemProps = {
    video: Video;
  };
  