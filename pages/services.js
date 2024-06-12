import React, { useEffect, useState } from 'react';
import getServices from '../api/serviceData';
import ServiceCard from '../components/cards/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  document.querySelector('body').setAttribute('data-theme', 'site');

  const getAllServices = () => {
    getServices()?.then(setServices);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="servicesCards">
      {services.map((s) => (
        <ServiceCard key={s.id} serviceObj={s} />
      ))}
    </div>
  );
}
