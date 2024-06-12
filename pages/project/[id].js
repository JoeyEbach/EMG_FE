import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { singleProject } from '../../api/projectData';
import { useAuth } from '../../utils/context/authContext';
import ProjectServiceCard from '../../components/cards/ProjectServiceCard';

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [project, setProject] = useState({});
  const [isProducer, setIsProducer] = useState();
  document.querySelector('body').setAttribute('data-theme', 'site');

  const getProject = () => {
    if (id) {
      singleProject(id)?.then((p) => {
        setProject(p);
        if (user) {
          if (user.id === p.producer.id) {
            setIsProducer(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    getProject();
  }, [id, user]);

  return (
    <div className="projDetails">
      <div className="content">
        <div>
          {isProducer && isProducer === true ? (
            <>
              <h2>Your customer is:</h2>
              <Image src={project.customer?.image} alt={project.customer?.name} style={{ width: '150px', height: '200px', objectFit: 'cover' }} />
              <p>{project.customer?.name}</p>
            </>
          ) : (
            <>
              <h2>Your producer is:</h2>
              <Image src={project.producer?.image} alt={project.producer?.name} style={{ width: '150px', height: '200px', objectFit: 'cover' }} />
              <p>{project.producer?.name}</p>
            </>
          )}
          {!project.complete
            ? (
              <><Link passHref href={`/project/edit/${project.id}`}>Update</Link>
                <Link passHref href={`/project/complete/${project.id}`}>Complete</Link>
              </>
            )
            : null}
        </div>
        <div>
          <h3>{project.title}</h3>
          <p>Started: {project.startDate} | Completed: {project.complete ? project.endDate : 'In Progress'}</p>

          <p>Key: {project.key} | BPM: {project.bpm}</p>
          <p>Notes: {project.notes}</p>
          <p>Worktape: {project.worktape}</p>
          <p>Lyric:</p>
          <div className="lyric">{project.lyric}</div>

          <p>Project Total: ${project.total}</p>
        </div>
      </div>
      <div className="servicesSection">
        <h3 className="servicesHeading">Services:</h3>
        <div className="servicesCards">
          {project.services?.map((s) => (
            <ProjectServiceCard key={s.id} serviceObj={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
