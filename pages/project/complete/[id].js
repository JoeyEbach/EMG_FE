import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { closeProject, singleProject } from '../../../api/projectData';

export default function CompleteProject() {
  const [project, setProject] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getProject = () => {
    if (id) {
      singleProject(id)?.then(setProject);
    }
  };

  const handleClick = () => {
    closeProject(id)?.then(() => router.push('/my-projects'));
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return (
    <div>
      <h1 className="heading center" style={{ marginTop: '225px', marginBottom: '20px' }}>Congratulations on wrapping up your project, {project.title}!</h1>
      <h5 className="heading center">Your total is ${project.total} and will be paid by {project.paymentType}.</h5>
      <Link passHref href={`/project/edit/${id}`}>
        <p className="center closeLink">Edit Payment Info</p>
      </Link>
      <p className="info center" style={{ marginBottom: '5px' }}>Are you sure you want to close this project? </p>
      <Button type="click" className="btn-outline-dark btnBlue center heading hov2" onClick={handleClick}>Close Project</Button>
    </div>
  );
}
