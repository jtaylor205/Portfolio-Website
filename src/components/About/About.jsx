import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../css/About.css';
import Transition from '../../transition';
import TypingEffect from './TypingEffect';
import cppImg from '../../assets/c++.png';
import htmlImg from '../../assets/html.png';
import gitImg from '../../assets/git.png';
import cssImg from '../../assets/css.png';
import sqlImg from '../../assets/sql.png';
import swiftImg from '../../assets/swift.png';
import swiftUIImg from '../../assets/swiftui.png';
import reactImg from '../../assets/reactjs.png';
import pythonImg from '../../assets/python.png';
import jsImg from '../../assets/javascript.png';
import Jaedon from '../../assets/jaedon.jpg';

const About = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timersRef = useRef([]); // Store timers to clear them later

  const skillItems = useMemo(() => [
    { title: "C++", image: cppImg, alt: "C++", delay: 1350 },
    { title: "CSS", image: cssImg, alt: "CSS", delay: 1875 },
    { title: "HTML", image: htmlImg, alt: "HTML", delay: 3625 },
    { title: "JAVASCRIPT", image: jsImg, alt: "JAVASCRIPT", delay: 1500 },
    { title: "PYTHON", image: pythonImg, alt: "PYTHON", delay: 3350 },
    { title: "REACT", image: reactImg, alt: "REACT", delay: 2700 },
    { title: "GIT", image: gitImg, alt: "GIT", delay: 1425 },
    { title: "SQL", image: sqlImg, alt: "SQL", delay: 2425 },
    { title: "SWIFT", image: swiftImg, alt: "SWIFT", delay: 2150 },
    { title: "SWIFTUI", image: swiftUIImg, alt: "SWIFTUI", delay: 3075 },
  ], []);

  const chunkedSkills = useMemo(() => [
    skillItems.slice(0, 3),
    skillItems.slice(3, 7),
    skillItems.slice(7, 10),
  ], [skillItems]);

  useEffect(() => {
    skillItems.forEach((item, index) => {
      const timer = setTimeout(() => {
        setVisibleItems(prevVisibleItems => [...prevVisibleItems, index]);
      }, item.delay);
      timersRef.current.push(timer);
    });

    // Cleanup timers on unmount to avoid memory leaks
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, [skillItems]);

  return (
    <>
      <div className='about-header'>
        <TypingEffect text={"Hello, I'm Jaedon!"} />
      </div>
      <div className='about-container'>
        <div className='description-container'>
          <img className='description-image' src={Jaedon} alt="Jaedon Taylor" />
          <div className='description-text'>
            I am an undergraduate Computer Science student with a minor in Economics at the University of Florida. 
            With a strong foundation in software development and project management, I’ve taken on roles that allow me to contribute both
            technically and strategically. Whether coding, leading teams, or adapting to new challenges, I’m passionate about leveraging 
            technology to solve real-world problems and drive innovation.
          </div>
        </div>
        <div className="skills_container">
          {chunkedSkills.map((row, rowIndex) => (
            <div className="skills_row" key={rowIndex}>
              {row.map((skill, index) => (
                <div
                  className={`skills_item ${visibleItems.includes(rowIndex * chunkedSkills[0].length + index) ? 'visible' : ''}`}
                  key={index}
                  style={{ transitionDelay: `${skill.delay}ms, transform 0ms` }}
                >
                  <img src={skill.image} alt={skill.alt} />
                  <div className="skill_name">{skill.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Transition(About);
