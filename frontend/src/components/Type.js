import React, { useState, useEffect } from 'react';

const Type = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => [...prev, text[index]]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span>
      {displayedText.map((char, idx) => 
        char === '\n' ? <br key={idx} /> : char
      )}
    </span>
  );
};

export default Type;
