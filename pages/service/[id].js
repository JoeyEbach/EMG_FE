import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { serviceProducers } from '../../api/userData';
import getServices from '../../api/serviceData';
import ProducerCard from '../../components/cards/ProducerCard';

export default function FindProducers() {
  const [producers, setProducers] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  document.querySelector('body').setAttribute('data-theme', 'site');

  const getService = async (serviceId) => {
    const services = await getServices();
    const thisService = services?.find((s) => s.id === Number(serviceId));
    setServiceName(thisService.name || '');
  };

  useEffect(() => {
    if (id) {
      serviceProducers(Number(id))?.then(setProducers);
      getService(id);
    }
  }, [id]);

  return (
    <div>
      <h1 className="heading profile">Producers who can do: {serviceName}</h1>
      <Link passHref href="/services">
        <p className="backLink">Back to Services</p>
      </Link>
      <div className="producerCards">
        {producers[0] ? (
          <>
            {producers?.map((p) => (<ProducerCard key={p.id} producerObj={p} />))}
          </>
        ) : (
          <h1>Sorry. No producers were found.</h1>
        )}
      </div>
    </div>
  );
}
