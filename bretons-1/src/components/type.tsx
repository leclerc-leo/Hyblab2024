export type Athlete = {
  Sexe: string;
  Athlete: string;
  "Ville de naissance": string;
  "Date de naissance": string;
  "Club (ville)": string;
  "Gentilé": string;
  Palmares: string;
  "Etudes / Métier": string;
  "Fun fact": string;
  Photo: string;
};

export type Event = {
  IdEvent: number;
  Athlete: string;
  Sport: string;
  Epreuve: string;
  Epreuve__1: string;
  Rang: number;
  Gain: string;
  Olympiade: string;
  "Résultat (temps /points)": string;
  "Podium (nom + résultat)": string;
  Performance: string;
  "Nombre de médailles françaises": string;
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

export interface EventDataItem {
  IdEvent: number;
  Athlete: string;
  Sport: string;
  Epreuve: string;
  Epreuve__1: string;
  Rang: number;
  Gain: string;
  Olympiade: string;
  "Résultat (temps /points)": string;
  "Podium (nom + résultat)": string;
  Performance: string;
  "Nombre de médailles françaises": string;
};
