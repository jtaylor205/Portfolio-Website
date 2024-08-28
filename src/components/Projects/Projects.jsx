import React, { useState } from 'react';
import '../../css/Projects.css';
import Transition from '../transition';
import { SiCoursera, SiCplusplus, SiCss3, SiGooglegemini, SiHtml5, SiJavascript, SiOpenai, SiPython, SiReact, SiSwift, SiNumpy, SiGithub } from "react-icons/si";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectList = [
    {
      title: "Solace",
      type: "Mobile App/AI",
      info: "Yes",
      link: "https://github.com/jtaylor205/solace",
      languages: <><SiReact /><SiJavascript /><SiGooglegemini/></>,
    }, 
    {
      title: "Minesweeper",
      type: "Game Development",
      info: "Yes",
      link: "https://github.com/jtaylor205/minesweeper",
      languages: <SiCplusplus />,
    },
    {
      title: "Food Fridge",
      type: "Mobile App",
      info: "Yes",
      link: "https://github.com/jtaylor205/food-fridge",
      languages: <SiSwift />,
    },
    {
      title: "Phone Guru",
      type: "Web Development/AI",
      info: "Yes",
      link: "https://github.com/jtaylor205/verizon-hack",
      languages: <><SiPython /><SiHtml5/><SiCss3/><SiJavascript/><SiOpenai/></>,
    },
    {
      title: "File System",
      type: "Operating Systems",
      info: "No",
      languages: <><SiCoursera/><SiCplusplus /></>,
    },
    {
      title: "Sudoku Generator",
      type: "Game Development",
      info: "Yes",
      link: "https://github.com/jtaylor205/sudoku",
      languages: <SiPython />,
    },
    {
      title: "Stock Market Trading Analyzer",
      type: "Data Analysis",
      info: "No",
      languages: <><SiPython /><SiNumpy /></>,
    },
    {
      title: "AVL Tree",
      type: "Data Structures",
      info: "No",
      languages: <SiCplusplus />,
    },
  ];

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className='projects-header'>My Projects</div>
      <div className='projects-grid'>
        {projectList.map((project, index) => (
          <div 
            key={index} 
            className='project-box' 
            onClick={() => handleCardClick(project)}
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
            <div className='project-languages'>{selectedProject.languages}</div>
            {selectedProject.link && (
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className='github-link modal-github-link'>
                <SiGithub />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Transition(Projects);
