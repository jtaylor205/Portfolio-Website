import React, { useEffect } from 'react';
import '../../css/Home.css';
import homeDots from './homeDots';
import Transition from '../transition';
import githubImg from '../../assets/github.png';
import linkedinImg from '../../assets/linkedin.png';
import resumeImg from '../../assets/resume.png';
import { RandomReveal } from 'react-random-reveal';

const Home = () => {
  useEffect(() => {
    const cleanupDots = homeDots();
    return () => {
      cleanupDots();
    };
  }, []);

  function downloadResume() {
    // URL of the PDF file
    const pdfUrl = '/resume.pdf';
    // Create a temporary <a> element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'resume.pdf';
    // Simulate a click on the link to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // Clean up resources after the download link is clicked
    document.body.removeChild(downloadLink);
}

const linkItems = [
  { title: "LINKEDIN", link: 'https://www.linkedin.com/in/jaedon-taylor-982316102/', imgSrc: linkedinImg, alt: "Linkedin" },
  { title: "GITHUB", link: 'https://github.com/jtaylor205', imgSrc: githubImg, alt: "Github" },
  { title: "RESUME", link: '#', imgSrc: resumeImg, alt: "Resume", onClick: downloadResume }, // Add onClick for resume
];


  return (
    <div className="home-container">
      <canvas className="connecting-dots"></canvas>
      <div className='heading'>
      <RandomReveal isPlaying duration={2} characters="Jaedon Taylor" />
        <div className= 'subHeading'>University of Florida Student</div>
        <div className= 'subHeading'>Computer Science - 2026</div>
        <div className='navigate-button'>View my work</div>
      </div>
      <div className='bottomButtons'>
  {linkItems.map((item, index) => (
    <a 
      href={item.link} 
      target={item.onClick ? '_self' : '_blank'} // Set target to _self if there's an onClick to avoid new tab
      rel={item.onClick ? undefined : "noopener noreferrer"} 
      key={index}
      onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined} // Attach the onClick handler
    >
      <img className='button-image' src={item.imgSrc} alt={item.alt} />
    </a>
  ))}
</div>

    </div>
  );
};

export default Transition(Home);
