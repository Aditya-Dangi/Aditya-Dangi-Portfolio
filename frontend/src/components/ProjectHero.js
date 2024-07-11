import React from 'react';
import './ProjectHeroStyle.css'; // Import your CSS styles
import ProjectImg from '../assets/ProjectHeroImg.jpeg'; // Import your project image
import projectsData from "../json/projects.json"; // Import your projects data

// Import all images statically
import gameImg from '../assets/game.jpg';
import wordleCloneImg from '../assets/wordle-clone.jpg';
import fyleProjectImg from '../assets/fyle-project.jpg';

// Map image file names to imported images
const images = {
  'game.jpg': gameImg,
  'wordle-clone.jpg': wordleCloneImg,
  'fyle-project.jpg': fyleProjectImg,
};

const ProjectHero = () => {
  return (
    <div className='project-container'>
      <div className='project-container-top'>
        <img className='project-img' src={ProjectImg} alt="Project Hero" />
        <h1 className='project-heading'>
          Projects
        </h1>
      </div>
      <div className='project-container-bottom'>
        {projectsData.map((project, index) => (
          <div key={index} className='project-box'>
            <div className='project-box-top'>
              <img className='project-box-img' src={images[project.image]} alt={`Project ${index + 1}`} />
            </div>
            <div className='project-box-bottom'>
              <div className='project-box-title'>
                {project.title}
              </div>
              <div className='project-box-description'>
                {project.description}
              </div>
              <div>
                <a href={project.demoLink} target='_blank' rel="noopener noreferrer" className="project-button demo">Demo</a>
                <a href={project.codeLink} target='_blank' rel="noopener noreferrer" className="project-button code">Code</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectHero;
