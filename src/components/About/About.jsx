import React, { useState, useMemo } from 'react';
import '../../css/About.css';
import Transition from '../transition';
import TypingEffect from './TypingEffect';

import { SiCplusplus, SiCss3, SiHtml5, SiJavascript, SiPython, SiReact, SiSwift, SiGit, SiMysql, SiC, SiGooglecloud, SiJirasoftware } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { FaDatabase, FaNodeJs } from "react-icons/fa";
import { GrSwift } from "react-icons/gr";
import aboutPhoto from '../../assets/aboutPhoto.jpeg';

const About = () => {
  const languages = useMemo(() => [
    { title: "PYTHON", icon: SiPython, alt: "PYTHON" },
    { title: "C", icon: SiC, alt: "C" },
    { title: "C++", icon: SiCplusplus, alt: "C++" },
    { title: "SQL", icon: TbSql, alt: "SQL" },
    { title: "JAVASCRIPT", icon: SiJavascript, alt: "JAVASCRIPT" },
    { title: "HTML", icon: SiHtml5, alt: "HTML" },
    { title: "CSS", icon: SiCss3, alt: "CSS" },
    { title: "SWIFT", icon: GrSwift, alt: "SWIFT" },
  ], []);

  const frameworks = useMemo(() => [
    { title: "REACT", icon: SiReact, alt: "REACT" },
    { title: "FIRESTORE", icon: FaDatabase, alt: "FIRESTORE" },
    { title: "NODE.JS", icon: FaNodeJs, alt: "NODE.JS" },
    { title: "SWIFTUI", icon: SiSwift, alt: "SWIFTUI" },
  ], []);

  const devTools = useMemo(() => [
    { title: "GIT", icon: SiGit, alt: "GIT" },
    { title: "GOOGLE CLOUD", icon: SiGooglecloud, alt: "GOOGLE CLOUD" },
    { title: "JIRA", icon: SiJirasoftware, alt: "JIRA" },
    { title: "MYSQL", icon: SiMysql, alt: "MYSQL" },
  ], []);

  return (
    <>
      <div className='flex flex-col justify-between pr-2 w-[100vw]'>
      <div className="relative top-8 left-8 text-7xl font-semibold leading-none m-0 p-0">
        Hello, I'm Jaedon!
      </div>
      
      <div className='flex flex-row w-[100%]'>
        <div className='flex-col w-[100%]'>
        <div className="flex mb-6">
          <div className="w-80 h-80 ml-40 mt-20 rounded-lg overflow-hidden border border-white/10 ring-4 ring-white/20">
            <img
              src={aboutPhoto}
              alt="About"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className='info-section'>
        <TypingEffect text={"School: University of Florida"} speed={75}/>
        <TypingEffect text={"Graduation Year: 2026"} speed={75} />
        <TypingEffect text={"Currently: SWE intern @ Datadog"} speed={75}/>
       
        </div>
        </div>
        <div className='skills-section'>
          <div className="skills_box flex flex-col justify-start items-start p-8 pt-0 gap-y-4">
            <h2 className="mt-0 mb-2">Languages</h2>
            <div className="skills_grid">
              {languages.map((lang, idx) => (
                <div key={idx} className="skills_item">
                  <lang.icon className="skill_icon" />
                </div>
              ))}
            </div>
          </div>
          <div className="skills_box flex flex-col justify-start items-start p-8 pt-0 gap-y-4">
            <h2 className="mt-0 mb-2">Frameworks</h2>
            <div className="skills_grid">
              {frameworks.map((framework, idx) => (
                <div key={idx} className="skills_item">
                  <framework.icon className="skill_icon" />
                </div>
              ))}
            </div>
          </div>
          <div className="skills_box flex flex-col justify-start items-start p-8 pt-0 gap-y-4">
            <h2 className="mt-0 mb-2">Developer Tools</h2>
            <div className="skills_grid">
              {devTools.map((tool, idx) => (
                <div key={idx} className="skills_item">
                  <tool.icon className="skill_icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      {/* <Timeline /> */}
      </div>
    </>
  );
}

export default Transition(About);
