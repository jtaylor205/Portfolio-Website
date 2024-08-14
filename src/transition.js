import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Transition = (OgComponent) => {
  return function WrappedComponent() {
    const [isReversing, setIsReversing] = useState(false);

    const handleAnimationComplete = () => {
      setIsReversing(true); // Start the reverse animation after the initial one completes
    };

    return (
      <>
        <OgComponent />
        {!isReversing ? (
          <>
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="slide-in"
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 1,
                  delay: index * 0.2, // Staggered delay for each rectangle
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: 'fixed',
                  top: `${index * 33.33}vh`, // Each rectangle takes up one-third of the screen height
                  left: 0,
                  width: '100%',
                  height: '33.33vh', // Adjust the height of each rectangle
                  backgroundColor: index % 2 === 0 ? 'blue' : 'gray', // Alternating colors
                  zIndex: 10 - index,
                }}
                onAnimationComplete={() => {
                  if (index === 2) handleAnimationComplete(); // Trigger reversal only after the last rectangle finishes
                }}
              />
            ))}
          </>
        ) : (
          <>
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="slide-out"
                initial={{ x: '0%' }}
                animate={{ x: '100%' }} // Move off the screen to the left
                exit={{ x: '100%' }}
                transition={{
                  duration: 1,
                  delay: index * 0.2, // Staggered delay for each rectangle
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: 'fixed',
                  top: `${index * 33.33}vh`, // Each rectangle takes up one-third of the screen height
                  left: 0,
                  width: '100%',
                  height: '33.33vh', // Adjust the height of each rectangle
                  backgroundColor: index % 2 === 0 ? 'blue' : 'gray', // Alternating colors
                  zIndex: 10 - index,
                }}
              />
            ))}
          </>
        )}
      </>
    );
  };
};

export default Transition;
