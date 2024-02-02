import { useEffect, useState } from 'react';
import './Frame4.css';

const rangToMedaille = (rang: number) => {
  switch(rang) {
      case 1:
          return "médaille d'or _Or.svg_";
      case 2:
          return "médaille d'argent _Argent.svg_";
      case 3:
          return "médaille de bronze _Bronze.svg_";
  }
};

const getSexe = (sexe: string) => {
  if(sexe == "F") {
    return "feminin"
  } else {
    return "masculine"
  }
}

const getImage = (sport: string) => {
  switch(sport) {
    case "Cyclisme":
      return "_velo.svg_"
    default:
      return ""
  }
}

export const Frame4: React.FC<{ Gentilé: string, rang:number, Epreuve: string, sexe:string, Sport:string }> = ({ Gentilé, rang, Epreuve, sexe, Sport }) => {
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(false);
      let delay = 20,
      delay_start = 0;
      let paragraphe = document.getElementsByClassName("animatedtext");
      for (var i = 0; i < paragraphe.length; i++) {
        let elem = paragraphe[i] as HTMLElement;
        let contents,
        letters;
        contents = elem!.textContent!.trim();
        elem!.textContent = "";
        letters = contents.split("");
        elem!.style.visibility = 'visible';
        let stopImage:string = "";
        let start = false;
        letters.forEach(function (letter, index_1) {
          if(letter=="_") {
            if(stopImage != "") {
              var image = document.createElement("img");
              image.src = "/bretons-1/img/"+stopImage;
              image.style.width = "110px";
              setTimeout(function () {
                elem?.appendChild(image);
              }, delay_start + delay * index_1);
              stopImage = "";
              start = false;
            } else {
              start = true;
            }
          } else {
            if(start) {
              stopImage += letter;
            } else {
              setTimeout(function () {
                elem!.append(letter);
              }, delay_start + delay * index_1);
            }
          }
        });    
        delay_start += delay * letters.length;
      }
    }, []);
    return (
      <div className='containerText_f4'>
        <p className='animatedtext bold'>Prouesses !</p>
        <br></br>
        <p className='animatedtext bold'>{sexe === 'F' ? 'La' : 'Le'} {Gentilé}</p><p className='animatedtext'> remporte la </p><p className='animatedtext bold'>{rangToMedaille(rang)}</p><p className='animatedtext'> en </p><p className='animatedtext bold'>{Epreuve} {getSexe(sexe)} {getImage(Sport)}</p>
      </div>
    );
};