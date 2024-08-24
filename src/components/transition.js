import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Transition = (OgComponent) => {
  return function WrappedComponent(props) {
    const [shouldTransition, setShouldTransition] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
      // Check if the page was loaded due to a navigation event or a refresh
      if (sessionStorage.getItem('navigate')) {
        setShouldTransition(true);
        sessionStorage.removeItem('navigate');
      }
    }, []);

    useEffect(() => {
      if (shouldTransition) {
        // Trigger showing the component after a delay or transition completion
        setTimeout(() => {
          setShowComponent(true);
        }, 3000); // Replace with your actual transition duration
      }
    }, [shouldTransition]);

    const [isReversing, setIsReversing] = useState(false);

    const handleAnimationComplete = () => {
      setIsReversing(true); // Start the reverse animation after the initial one completes
    };

    if (!shouldTransition) {
      return <OgComponent {...props} />;
    }

    return (
      <>
        {!showComponent || <OgComponent {...props} />}
        {!isReversing ? (
          <>
            {/* Creates 5 regtangles and sends them across the screen, and then reverses them */}
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="slide-in-gray"
                  initial={{ x: '100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'fixed',
                    top: `${index * 20}vh`,
                    left: 0,
                    width: '100%',
                    height: '20vh',
                    backgroundColor: 'gray',
                    zIndex: 1100 + index, // Increased zIndex
                  }}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1 + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'fixed',
                    top: `${index * 20}vh`,
                    left: 0,
                    width: '100%',
                    height: '20vh',
                    backgroundColor: '#0f0f0f',
                    zIndex: 1100 + index + 1, // Increased zIndex
                  }}
                  onAnimationComplete={() => {
                    if (index === 2) handleAnimationComplete();
                  }}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ x: '0%' }}
                  animate={{ x: '100%' }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'fixed',
                    top: `${index * 20}vh`,
                    left: 0,
                    width: '100%',
                    height: '20vh',
                    backgroundColor: '#0f0f0f',
                    zIndex: 1111 - index, // Increased zIndex
                  }}
                />
                <motion.div
                  className="slide-out-gray"
                  initial={{ x: '0%' }}
                  animate={{ x: '100%' }}
                  exit={{ x: '100%' }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2 + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'fixed',
                    top: `${index * 20}vh`,
                    left: 0,
                    width: '100%',
                    height: '34vh',
                    backgroundColor: 'gray',
                    zIndex: 1110 - index, // Increased zIndex
                  }}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </>
    );
  };
};

export default Transition;
