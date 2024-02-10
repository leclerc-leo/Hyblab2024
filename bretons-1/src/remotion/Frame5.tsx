import './Frame5.css';

interface AthletePositions {
  [key: string]: string;
}

const athleteImagePositions: AthletePositions = {
  "Pierre Le Coq": "center center",
  "Marie Bolou": "center center",
  "Julie Bresset": "center center",
  "Laëtitia Le Corguillé": "center top"
};

interface pointeurPositions {
  top: string;
  left: string;
}

const pointeurImagePositions: { [key: string]: pointeurPositions } = {
  "Saint-Brieuc": { top: "77%", left: "47%" },
  "Quimper": { top: "86%", left: "23%" }
};


export const Frame5: React.FC<{ nom: string, age: string, sexe: string, sport: string, fun_fact: string, photo: string, record: string, ville: string }> = ({ nom, age, sexe, sport, fun_fact, photo, record, ville }) => {

  const imagePosition = athleteImagePositions[nom] || "center center";

  const { top, left } = pointeurImagePositions[ville] || { top: "50%", left: "50%" };

  const imageStyle = {
    top: top,
    left: left
  };

  return (
    <div className="container-frame5">
      <img src='/bretons-1/img/frame5.png' className="frame6-image"></img>
      <div className="identity">Mais qui est</div>
      <div className="identity-name">{nom} ?</div>
      <div className="record">Palmarès</div>
      <div className="record-texte">{record}</div>
      <img src='/bretons-1/img/BolBreton.svg' className="bols"></img>
      <img src={photo} style={{ objectFit: 'cover', objectPosition: imagePosition }} className="athlete-frame5" />
      <div className="infos-perso">
        <div className="age-frame5">{age}</div>
        <div className="taille-frame5">{sexe}</div>
        <div className="sport-frame5">{sport}</div>
        <img src={`/bretons-1/img/${sport}.svg`} className="sport-image"></img>
      </div>
      {nom === "Marie Bolou" ? (
        <>
          <div className="fun-fact">Fact :</div>
          <div className="fun-fact-texte">{fun_fact}</div>
        </>
      ) : (
        <>
          <div className="fun-fact">Fun fact :</div>
          <div className="fun-fact-texte">{fun_fact}</div>
        </>
      )}
      <img src='/bretons-1/img/Pointeur.png' style={imageStyle} className="pointeur"></img>
    </div>
  );
};