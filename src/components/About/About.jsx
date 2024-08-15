import React, { useState, useEffect, useRef, useMemo } from 'react';
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

const About = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timersRef = useRef([]); // Store timers to clear them later

  const skillItems = useMemo(() => [
    { title: "C++", image: cppImg, alt: "C++", delay: 100 },
    { title: "CSS", image: cssImg, alt: "CSS", delay: 325 },
    { title: "HTML", image: htmlImg, alt: "HTML", delay: 775 },
    { title: "JAVASCRIPT", image: jsImg, alt: "JAVASCRIPT", delay: 250 },
    { title: "PYTHON", image: pythonImg, alt: "PYTHON", delay: 700 },
    { title: "REACT", image: reactImg, alt: "REACT", delay: 550 },
    { title: "GIT", image: gitImg, alt: "GIT", delay: 175 },
    { title: "SQL", image: sqlImg, alt: "SQL", delay: 475 },
    { title: "SWIFT", image: swiftImg, alt: "SWIFT", delay: 400 },
    { title: "SWIFTUI", image: swiftUIImg, alt: "SWIFTUI", delay: 625 },
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
    <div>
      <TypingEffect text={"Hello, I'm Jaedon!"} />
      <div className="skills_container">
        {chunkedSkills.map((row, rowIndex) => (
          <div className="skills_row" key={rowIndex}>
            {row.map((skill, index) => (
              <div
                className={`skills_item ${visibleItems.includes(rowIndex * chunkedSkills[0].length + index) ? 'visible' : ''}`}
                key={index}
                style={{ transitionDelay: `${skill.delay}ms` }}
              >
                <img src={skill.image} alt={skill.alt} />
                <div className="skill_name">{skill.title}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transition(About);
