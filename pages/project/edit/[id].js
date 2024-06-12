import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { singleProject } from '../../../api/projectData';
import ProjectForm from '../../../components/forms/ProjectForm';

export default function UpdateProject() {
  const [thisProject, setThisProject] = useState({});
  const [producerId, setProducerId] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    singleProject(id).then((sp) => {
      setThisProject(sp);
      setProducerId(sp.producerId);
    });
  }, [id]);

  return (
    <ProjectForm projObj={thisProject} producerId={producerId} />
  );
}
