import { useEffect, useState } from 'react';
import './Frame4.css';

export const Frame4: React.FC<{ text: string }> = ({ text }) => {
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
      console.log(text);
      setIsLoading(false);
      let delay = 20,
      delay_start = 0,
      contents,
      letters;
  
      let elem = document.getElementById("animatedtext")
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
            image.src = "/bretons-1/img/"+stopImage+".png";
            image.style.width = "50px";
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
    }, []);
    return (
      <>
        <p id='animatedtext'>Prouesse ! \n La Briochine remporte la première médaille d'or en VTT féminin.</p>
      </>
    );
};