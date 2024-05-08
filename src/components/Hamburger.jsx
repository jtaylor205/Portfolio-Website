import React, { useState } from 'react';

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;
