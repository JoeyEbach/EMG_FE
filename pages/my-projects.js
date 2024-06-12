import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { customerProjects, producerProjects } from '../api/projectData';
import ProjectCard from '../components/cards/ProjectCard';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  document.querySelector('body').setAttribute('data-theme', 'site');

  const getProjects = () => {
    if (user.isProducer) {
      producerProjects(user.id)?.then(setProjects);
    } else {
      customerProjects(user.id)?.then(setProjects);
    }
  };

  useEffect(() => {
    getProjects();
  }, [user, projects]);

  return (
    <div>
      <h1 className="heading top">Current Projects</h1>
      <div className="projectCards">
        {projects.map((p) => (
          !p.complete && (
          <ProjectCard key={p.id} projObj={p} />
          )
        ))}
      </div>
      <h1 className="heading top"> Completed Projects</h1>
      <div className="projectCards">
        {projects.map((p) => (
          p.complete && (
          <ProjectCard key={p.id} projObj={p} />
          )
        ))}
      </div>
    </div>
  );
}
