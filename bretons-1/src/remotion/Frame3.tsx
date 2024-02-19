import { useEffect, useState } from 'react';
import './Frame3.css';

export const Frame3: React.FC<{ text: string }> = ({ text }) => {
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(false);
      setTimeout(function () {
        let delay = 100,
        delay_start = 0;
        let elem = document.getElementById("animatedtext");
          let contents,
          letters;
          contents = elem!.textContent!.trim();
          elem!.textContent = "";
          letters = contents.split("");
          elem!.style.visibility = 'visible';
          letters.forEach(function (letter, index_1) {
            setTimeout(function () {
              elem!.append(letter);
            }, delay_start + delay * index_1);
            });    
          delay_start += delay * letters.length;
        }, 2000)
    }, []);
    return (
      <div className="container">
        <img src='img/frame3.png' alt='background' className="search-image" />
        <div className="text-overlay" id='animatedtext'>{text}</div>
        <img src='img/souris3.png' className="mouse-cursor"></img>
      </div>
    );
};

