import React, { useEffect, useRef } from 'react';
import '../../css/Home.css';
import homeDots from './homeDots';
import Transition from '../transition';
import githubImg from '../../assets/github.png';
import linkedinImg from '../../assets/linkedin.png';
import resumeImg from '../../assets/resume.png';
import { RandomReveal } from 'react-random-reveal';

const Home = ({menuOpen, setMenuOpen, navigateButtonRef }) => {
  useEffect(() => {
    const cleanupDots = homeDots();
    return () => {
      cleanupDots();
    };
  }, []);

  const linkItems = [
    { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor-982316102/', imgSrc: linkedinImg, alt: "Linkedin" },
    { title: "GITHUB", link: 'https://github.com/jtaylor205', imgSrc: githubImg, alt: "Github" },
    { title: "RESUME", link: '#', imgSrc: resumeImg, alt: "Resume"}, // Add onClick for resume
  ];

  return (
    <div className="home-container">
      <canvas className="connecting-dots"></canvas>
      <div className='heading'>
        <RandomReveal isPlaying duration={2} characters="Jaedon Taylor" />
        <div className= 'subHeading'>University of Florida Student</div>
        <div className= 'subHeading'>Computer Science</div>
        <div 
          className='navigate-button' 
          onClick={() => {
            console.log('Navigate button clicked'); // Debugging log
            setMenuOpen(!menuOpen);
            
          }} 
          ref={navigateButtonRef}  // Attach ref to navigate button
        >
          View my work
        </div>
      </div>
      <div className='bottomButtons'>
        {linkItems.map((item, index) => (
          <a 
            href={item.link} 
            target={item.onClick ? '_self' : '_blank'}
            rel={item.onClick ? undefined : "noopener noreferrer"} 
            key={index}
            onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
          >
            <img className='button-image' src={item.imgSrc} alt={item.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Transition(Home);
