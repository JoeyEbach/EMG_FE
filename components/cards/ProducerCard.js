import React from 'react';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function ProducerCard({ producerObj }) {
  return (
    <div>
      <Card className="producerCard" style={{ width: '18rem', marginBottom: '20px' }}>
        <Card.Img variant="top" src={producerObj.image} style={{ width: '286px', height: '190px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title style={{ color: 'white' }}>{producerObj.name}</Card.Title>
          <Card.Text>
            <div className="space" style={{ color: '#C5C2C2' }}>
              <p>Email: {producerObj.email}</p>
              <p>Phone: {producerObj.phone}</p>
            </div>
            <h4 className="info2">I can do...</h4>
            <div className="scroll">
              {producerObj.services.map((s) => (
                s.active && (
                  <><h5>{s.name} - ${s.price}</h5></>
                )
              ))}
            </div>
            <Link passHref href={`project/new?producerId=${producerObj.id}`}>
              <Button type="click" className="btn-outline-dark btnBlue hov2" style={{ color: 'white' }}>Start A Project</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

ProducerCard.propTypes = {
  producerObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
      }),
    ),
  }).isRequired,
};
