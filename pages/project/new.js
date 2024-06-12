import React from 'react';
import { useRouter } from 'next/router';
import ProjectForm from '../../components/forms/ProjectForm';

export default function NewProject() {
  const router = useRouter();
  const { producerId } = router.query;
  const thisId = Number(producerId);
  document.querySelector('body').setAttribute('data-theme', 'site');

  return (
    <ProjectForm producerId={thisId} />
  );
}
