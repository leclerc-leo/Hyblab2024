import { useEffect, useState } from 'react';
import './Frame4.css';

export const Frame4: React.FC<{ text: string }> = ({ text }) => {
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
      console.log(text);
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
        <p className='animatedtext bold'>La Briochine</p><p className='animatedtext'> remporte la première </p><p className='animatedtext bold'>médaille  d'or _Or.svg_</p><p className='animatedtext'> en </p><p className='animatedtext bold'>VTT féminin _velo.svg_</p>
      </div>
    );
};