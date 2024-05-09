import React from 'react';

const Hamburger = ({ menuOpen, setMenuOpen, className = '' }) => {
  return (
    <div className={`hamburger ${menuOpen ? 'open' : ''} ${className}`} onClick={() => setMenuOpen(!menuOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;
