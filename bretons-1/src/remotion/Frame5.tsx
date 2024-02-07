import './Frame5.css';

export const Frame5: React.FC<{ nom: string, age: string, sexe: string, sport: string, fun_fact: string, photo: string }> = ({ nom, age, sexe, sport, fun_fact, photo }) => {
    return (
        <div className="container-frame5">
            <img src='/bretons-1/img/frame5.png' className="frame6-image"></img>
            <div className="identity">La fiche identité</div>
            <div className="identity-name">de {nom}</div>
            <div className="record">Record</div>
            <div className="record-texte">Record texte</div>
            <img src='/bretons-1/img/BolBreton.svg' className="bols"></img>
            <img src={photo} className="athlete-frame5"></img>
            <div className="infos-perso">
                <div className="age-frame5">{age}</div>
                <div className="taille-frame5">{sexe}</div>
                <div className="sport-frame5">{sport}</div>
            </div>
            <div className="fun-fact">Fun fact :</div>
            <div className="fun-fact-texte">{fun_fact}</div>
        </div>
    );
};