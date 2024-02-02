import './Frame5.css';

export const Frame5: React.FC<{ nom: string, age: string, taille: string, sport: string, fun_fact: string, fun_fact_texte: string }> = ({ nom, age, taille, sport, fun_fact, fun_fact_texte }) => {
    return (
        <div className="container-frame5">
            <img src='/bretons-1/img/frame6.svg' className="frame6-image"></img>
            <h1>La fiche identité de {nom} </h1>
            <img src='/bretons-1/img/athlete/JDE1.png' alt="Athlete" className="athlete-frame5" />
            <div className="infos-perso">
                <div className="age-frame5">{age}</div>
                <div className="taille-frame5">{taille}</div>
                <div className="sport-frame5">{sport}</div>
            </div>
            <div className="fun-fact">
                <h2>{fun_fact}</h2>
                <p>{fun_fact_texte}</p>
            </div>
        </div>
    );
};