import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { PiX } from 'react-icons/pi';

const PushUpWord = ({ word }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // When the component mounts, split the word into letters and create spans for them
    setLetters(word.split('').map((char, index) => ({
      char,
      ref: React.createRef(),
    })));
  }, [word]);

  useEffect(() => {
    if (letters.length === 0) return;

    const timelines = letters.map((letterObj, index) => {
    const letterOut = letterObj.ref.current;
    const timeline = gsap.timeline({ paused: true });
    const direction = index % 2 === 0 ? -20 : 20;

    // Clone the letter
    const letterIn = letterOut.cloneNode(true);
    letterIn.style.position = 'absolute';
    letterIn.style.pointerEvents = 'none';
    letterIn.style.userSelect = 'none';
    letterOut.style.position = 'relative';
    letterOut.style.overflow = 'hidden';
    
    
    // Position the cloned letter exactly over the original letter
    letterIn.style.top = letterOut.offsetTop;
    letterIn.style.left = letterOut.offsetLeft + 'px';

    // Append the clone to the parent of the original letter
    letterOut.parentNode.style.position = 'relative';
    letterOut.parentNode.appendChild(letterIn);

    // Set up the animation timeline for this letter
    timeline.to(letterOut, { y: direction, duration: 0.5 })
            .fromTo(letterIn, { y: -direction}, { y: 0, duration: 0.5 }, 0);

    return timeline;
});
  
    // Assuming there's a parent element to attach the event listeners
    const parentElement = letters[0].ref.current.parentNode;
    parentElement.onmouseenter = () => {
        
      timelines.forEach(timeline => {
        timeline.restart();
        timeline.play();
      })
    };
    
  
  }, [letters]);
  
  return (
    <div className="nav-item" style={{ overflow: 'hidden' }}>
      {letters.map((letterObj, i) => (
        <span key={i} ref={letterObj.ref} className="letter" style={{ position: 'relative', marginBottom: '-2px', marginTop: '-2px' }}>
          {letterObj.char}
        </span>
      ))}
    </div>
  );
};

export default PushUpWord;
