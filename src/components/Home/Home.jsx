import React, { useEffect } from 'react';
import homeDots from './homeDots';
import Transition from '../../transition';
import { RandomReveal } from 'react-random-reveal';

const Home = () => {
  useEffect(() => {
    const cleanupDots = homeDots();
  
    // Cleanup on unmount
    return () => {
      cleanupDots();
    };
  }, []);

  return (
    <div className="home-container">
      <canvas className="connecting-dots"></canvas>
    </div>
  );
};

export default Transition(Home);
