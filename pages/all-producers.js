import React, { useEffect, useState } from 'react';
import { getProducers } from '../api/userData';
import ProducerCard from '../components/cards/ProducerCard';

export default function AllProducers() {
  const [producers, setProducers] = useState([]);
  document.querySelector('body').setAttribute('data-theme', 'site');

  const getAllProducers = () => {
    getProducers()?.then(setProducers);
  };

  useEffect(() => {
    getAllProducers();
  }, []);

  return (
    <div>
      <div className="producerCards">
        {producers.map((p) => (
          <ProducerCard key={p.id} producerObj={p} />
        ))}
      </div>
    </div>
  );
}
