import { useEffect, useState } from 'react';
import './Frame4.css';

export const Frame4: React.FC<{ text: string }> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(false);
      let delay = 40,
      delay_start = 0,
      contents,
      letters;
  
      let elem = document.getElementById("animatedtext")
      console.log(elem);
      contents = elem!.textContent!.trim();
      elem!.textContent = "";
      letters = contents.split("");
      elem!.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem!.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    }, []);
    return (
      <p id='animatedtext'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    );
};