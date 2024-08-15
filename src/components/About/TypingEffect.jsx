import  { useState, useEffect } from 'react';

const useTypingEffect = (text, speed = 90) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

const TypingEffect = ({ text, speed }) => {
    const displayText = useTypingEffect(text, speed);
  
    return <p>{displayText}</p>;
  };
  
  export default TypingEffect;