import React from 'react';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ServiceCard({ serviceObj }) {
  return (
    <Card className="heading serviceCard" style={{ width: '286px', marginBottom: '20px' }}>
      <Card.Img variant="top" src={serviceObj.image} style={{ height: '158px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title style={{ color: 'white' }}>{serviceObj.name}</Card.Title>
        <Card.Text className="info2" style={{ color: '#C5C2C2' }}>
          {serviceObj.description}
        </Card.Text>
        <Link passHref href={`/service/${serviceObj.id}`}>
          <Button className="btn-outline-dark btnBlue hov2" style={{ color: 'white' }}>Find Producers</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

ServiceCard.propTypes = {
  serviceObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
