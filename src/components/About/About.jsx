import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../css/About.css';
import Transition from '../transition';
import TypingEffect from './TypingEffect';
import Jaedon from '../../assets/jaedon.jpg';
import { SiCplusplus, SiCss3, SiHtml5, SiJavascript, SiPython, SiReact, SiSwift, SiGit, SiMysql } from "react-icons/si";

const About = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timersRef = useRef([]);

  const skillItems = useMemo(() => [
    { title: "C++", icon: SiCplusplus, alt: "C++", delay: 1350 },
    { title: "CSS", icon: SiCss3, alt: "CSS", delay: 1875 },
    { title: "HTML", icon: SiHtml5, alt: "HTML", delay: 3225 },
    { title: "JAVASCRIPT", icon: SiJavascript, alt: "JAVASCRIPT", delay: 1500 },
    { title: "PYTHON", icon: SiPython, alt: "PYTHON", delay: 3350 },
    { title: "REACT", icon: SiReact, alt: "REACT", delay: 2700 },
    { title: "GIT", icon: SiGit, alt: "GIT", delay: 1425 },
    { title: "SQL / MYSQL", icon: SiMysql, alt: "SQL / MYSQL", delay: 2425 },
    { title: "SWIFT", icon: SiSwift, alt: "SWIFT", delay: 2150 },
  ], []);

  const chunkedSkills = useMemo(() => [
    skillItems.slice(0, 3),
    skillItems.slice(3, 6),
    skillItems.slice(6, 9),
  ], [skillItems]);

  useEffect(() => {
    const timers = skillItems.map((item, index) => {
      return setTimeout(() => {
        setVisibleItems(prevVisibleItems => [...prevVisibleItems, index]);
      }, item.delay);
    });
  
    timersRef.current = timers;
  
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
                <skill.icon className="skill_icon" alt={skill.alt} />
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
