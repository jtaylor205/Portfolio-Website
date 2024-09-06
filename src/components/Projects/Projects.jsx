import React, { useState, useEffect } from 'react';
import '../../css/Projects.css';
import Transition from '../transition';
import mineSweepeerImg1 from '../../assets/minesweeper1.png';
import mineSweepeerImg2 from '../../assets/minesweeper2.png';
import sudokuImg1 from '../../assets/sudoku1.png';
import sudokuImg2 from '../../assets/sudoku2.png';
import fridgeImg1 from '../../assets/foodFridge1.png';
import fridgeImg2 from '../../assets/foodFridge2.png';
import fridgeImg3 from '../../assets/foodFridge3.png';
import guruImg1 from '../../assets/phoneGuru1.png';
import guruImg2 from '../../assets/phoneGuru2.png';
import solaceImg1 from '../../assets/solace1.png';
import solaceImg2 from '../../assets/solace2.png';
import solaceImg3 from '../../assets/solace3.png';
import { SiCplusplus, SiCss3, SiGooglegemini, SiHtml5, SiJavascript, SiOpenai, SiPython, SiReact, SiSwift, SiNumpy, SiGithub, SiIcloud, SiFirebase, SiLinux, SiSfml, SiC} from "react-icons/si";

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectList = [
    {
      title: "Solace",
      type: "Mobile App / AI",
      info: "Yes",
      link: "https://github.com/jtaylor205/solace",
      screen: "Mobile",
      images: [solaceImg1, solaceImg2, solaceImg3],
      bio: "Mental Wellness Application harnessing the power of generative AI to empower users in achieving their daily goals, maintaining a personal journal, and engaging in meaningful conversations with an AI therapist.",
      languages: <><SiReact /><SiJavascript /><SiGooglegemini/><SiFirebase/></>,
    }, 
    {
      title: "Minesweeper",
      type: "Game Development",
      info: "Yes",
      link: "https://github.com/jtaylor205/minesweeper",
      images: [mineSweepeerImg1, mineSweepeerImg2],
      screen: "Computer",
      bio: "The beloved puzzle game developed in C++ using the SFML library, featuring a built-in timer and a local leaderboard to track and celebrate your best times.",
      languages: <><SiCplusplus /><SiSfml/></>,
    },
    {
      title: "Food Fridge",
      type: "Mobile App",
      info: "Yes",
      link: "https://github.com/jtaylor205/food-fridge",
      images: [fridgeImg1, fridgeImg2, fridgeImg3],
      screen: "Mobile",
      bio: "A SwiftUI application where users can efficiently manage their food inventory by storing items in a 'Fridge', create recipes using ingredients from their fridge and easily generate shopping lists.",
      languages: <><SiIcloud /><SiSwift /></>,
    },
    {
      title: "Phone Guru",
      type: "Web Development / AI",
      info: "Yes",
      link: "https://github.com/jtaylor205/verizon-hack",
      images: [guruImg1, guruImg2],
      screen: "Computer",
      bio: "A web-based application that assists users in finding the perfect phone. Utilizing AI, phone guru analyzes user preferences and provides personalized recommendations, guaranteeing the best possible phone for the user.",
      languages: <><SiPython /><SiHtml5/><SiCss3/><SiJavascript/><SiOpenai/></>,
    },
    {
      title: "Sudoku Generator",
      type: "Game Development",
      info: "Yes",
      images: [sudokuImg1, sudokuImg2],
      link: "https://github.com/jtaylor205/sudoku",
      screen: "Computer",
      bio: "A Sudoku generator that creates boards based on chosen difficulty levels. Leveraging Pygame, users can sketch, delete, and submit answers as they attempt to solve the puzzle.",
      languages: <SiPython />,
    },
    {
      title: "File System",
      type: "Operating Systems",
      info: "No",
      bio: "A userspace filesystem daemon using the FUSE API, designed to read from and write to WAD files. Also utilizes a C++ library for parsing and manipulating WAD file headers, descriptors, and lump data.",
      languages: <><SiC/><SiCplusplus /><SiLinux/></>,
    },
    
    {
      title: "Stock Market Trading Analyzer",
      type: "Data Analysis",
      info: "No",
      bio: "Analyzed market data using financial indicators to identify trading opportunities. Implemented and optimized trading algorithms, using Python and libraries like Pandas, NumPy, and Backtest.py, to backtest historical data and refine effective trading strategies",
      languages: <><SiPython /><SiNumpy /></>,
    },
    {
      title: "AVL Tree",
      type: "Data Structures",
      info: "No",
      bio: "Implemented in C++ that allows for insertion, deletion, balancing, pre-order, in-order, and post-order traversal of nodes within the tree.",
      languages: <SiCplusplus />,
    },
  ];

  useEffect(() => {
    const preloadAllImages = async () => {
      const imagePromises = projectList.flatMap(project => 
        project.images ? project.images.map(preloadImage) : []
      );
      await Promise.all(imagePromises);
    };

    preloadAllImages();
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className='projects-header'>My Projects</div>
      <div className='projects-description'>
        <p>Below is a collection of some of the projects I've worked on throughout my personal and academic career.</p>
      </div>
      <div className='projects-grid'>
        {projectList.map((project, index) => (
          <div 
            key={index} 
            className='project-box' 
            onClick={() => handleCardClick(project)}
            style={{ '--animation-delay': `${project.delay}ms` }}
          >
            <div className='project-title'>{project.title}</div>
            <div className='project-type'>{project.type}</div>
            <div className='project-languages'>{project.languages}</div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className='github-link' onClick={(e) => e.stopPropagation()}>
                <SiGithub />
              </a>
            )}
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleModalClose}>✕</button>
            <div className='project-title'>{selectedProject.title}</div>
            <div className='project-type'>{selectedProject.type}</div>
            {selectedProject.images && (
              <div className='project-images'>
                {selectedProject.images.map((image, index) => (
                  <img key={index} src={image} alt={`${selectedProject.title} screenshot ${index + 1}`} className= {selectedProject.screen === 'Mobile' ? 'project-image-mobile' : 'project-image-computer'} />
                ))}
              </div>
            )}
            <div className='project-bio'>{selectedProject.bio}</div>
            <div className='project-languages'>{selectedProject.languages}</div>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className='github-link modal-github-link'>
                <SiGithub size={40} />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Transition(Projects);
