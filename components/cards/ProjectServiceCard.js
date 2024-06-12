import React from 'react';
import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function ProjectServiceCard({ serviceObj }) {
  return (
    <Card className="heading serviceCard" style={{ width: '286px', marginBottom: '20px' }}>
      <Card.Img variant="top" src={serviceObj.image} style={{ height: '158px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{serviceObj.service}</Card.Title>
        <Card.Text className="info2">
          {serviceObj.description}
        </Card.Text>
        <h3 style={{ color: '#C5C2C2' }}>${serviceObj.price}</h3>
      </Card.Body>
    </Card>
  );
}

ProjectServiceCard.propTypes = {
  serviceObj: PropTypes.shape({
    id: PropTypes.number,
    service: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
