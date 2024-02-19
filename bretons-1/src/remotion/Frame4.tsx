import { useEffect, useState } from 'react';
import './Frame4.css';

const rangToMedaille = (gain: string) => {
  switch (gain) {
    case "Or":
      return "médaille d'or _Or.svg_";
    case "Argent":
      return "médaille d'argent _Argent.svg_";
    case "Bronze":
      return "médaille de bronze _Bronze.svg_";
  }
};

const getSexe = (sexe: string) => {
  if (sexe == "F") {
    return "féminin"
  } else {
    return "masculine"
  }
}

const getImage = (sport: string) => {
  switch (sport) {
    case "Cyclisme":
      return "_Cyclisme.svg_"
    default:
      return "_Voile.svg_"
  }
}

export const Frame4: React.FC<{ Gentilé: string, gain: string, Epreuve: string, sexe: string, Sport: string, Epreuve_1: string }> = ({ Gentilé, gain, Epreuve, sexe, Sport, Epreuve_1 }) => {
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    setTimeout(function () {
      const element = document.querySelector('.containerText_f4') as HTMLElement;
      const elementImageRed = document.querySelector('.LogoRed') as HTMLElement;
      const elementImageJaune = document.querySelector('.LogoJaune') as HTMLElement;
      if (element != undefined) {
        element.style.transform = 'translateX(300vw)';
        elementImageJaune.style.transform = 'translateX(300vw)';
        elementImageRed.style.transform = 'translateX(300vw)';
      }
    }, 5500);
    let delay = 50,
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
      let stopImage: string = "";
      let start = false;
      let decalageImage = 0;
      letters.forEach(function (letter, index_1) {
        if (letter == "_") {
          if (stopImage != "") {
            var image = document.createElement("img");
            image.src = "img/" + stopImage;
            image.style.width = "110px";
            setTimeout(function () {
              elem?.appendChild(image);
            }, delay_start + delay * (index_1 - decalageImage));
            stopImage = "";
            start = false;
          } else {
            start = true;
          }
        } else {
          if (start) {
            stopImage += letter;
            decalageImage++;
          } else {
            setTimeout(function () {
              elem!.append(letter);
            }, delay_start + delay * (index_1 - decalageImage));
          }
        }
      });
      delay_start += delay * letters.length;
    }
  }, []);
  return (
    <div>
      <img className='containerimage LogoJaune'  src='img/logoFrame2Jaune.svg'></img>
      <div className='containerText_f4'>
        {gain === 'Qualifie' ? (
          <>
            <p className='animatedtext bold'>Prouesse !</p>
            <br></br>
            <p className='animatedtext'>{sexe === 'F' ? 'La' : 'Le'} {Gentilé} se {Epreuve_1}</p>
          </>
        ) : gain === '' ? (
          <>
            <p className='animatedtext'>{sexe === 'F' ? 'La' : 'Le'} {Gentilé} n'a pas réussi à se qualifier pour la {Epreuve_1} </p>
          </>
        ) : (
          <>
            <p className='animatedtext bold'>Prouesse !</p>
            <br></br>
            <p className='animatedtext'>{sexe === 'F' ? 'La' : 'Le'} {Gentilé} remporte la {rangToMedaille(gain)}</p>
          </>
        )}
        <p className='animatedtext'> en {Epreuve} {getSexe(sexe)} {getImage(Sport)}</p>
      </div>
      <img className='LogoRed' src='img/logoFrame2Red.svg'></img>
    </div>
  );

};