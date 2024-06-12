import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import {
  Col, Container, Image, Row,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteProject } from '../../api/projectData';
// eslint-disable-next-line import/no-extraneous-dependencies

export default function ProjectCard({ projObj }) {
  const [isCustomer, setIsCustomer] = useState(false);
  const { user } = useAuth();

  // if the user is a customer, we want to display the producer
  // if the user is a producer, we want to display the customer
  // so we'll need to check this in the useEffect

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projObj.id);
    }
  };

  useEffect(() => {
    if (user.id === projObj.customer.id) {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    }
  }, [projObj]);

  return (
    <div>
      <Link passHref href={(`/project/${projObj.id}`)}>
        <Container className="center">
          <Card className="projCard">
            <Card.Body>

              <Row>
                <Col xs={6}>
                  <Card.Text>
                    {isCustomer ? (
                      <>
                        <h4 className="info2">Producer:</h4>
                        <Image src={projObj.producer.image} alt={projObj.producer.name} roundedCircle style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <h5 className="info2 bold" style={{ marginLeft: '20px' }}>{projObj.producer.name}</h5>
                      </>
                    ) : (
                      <>
                        <h4 className="info2">Customer:</h4>
                        <Image src={projObj.customer.image} alt={projObj.customer.name} roundedCircle style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <h5 className="info2 bold" style={{ marginLeft: '20px' }}>{projObj.customer.name}</h5>
                      </>
                    )}
                    <Card.Title className="heading bold" style={{ color: '#C5C2C2' }}>{projObj.title}</Card.Title>
                  </Card.Text>
                </Col>

                <Col>
                  <Card.Title className="info" style={{ color: '#C5C2C2' }}>Started: {projObj.startDate} | {projObj.complete ? (<>Completed On: {projObj.endDate}</>) : (<>In Progress</>)}</Card.Title>
                  <Card.Text className="info2">
                    <p>Key: {projObj.key} | BPM: {projObj.bpm}</p>
                    <p>Worktape: {projObj.worktape}</p>
                  </Card.Text>
                  <h4 className="info2 bold">Services:</h4>
                  <p className="info" style={{ color: '#C5C2C2' }}>{projObj.services.map((s) => (
                    `${s.name}   |   $${s.price},   `
                  ))}
                  </p>
                  <h3 className="info2 bold">Total: ${projObj.total}</h3>
                  {!projObj.complete ? (
                    <>
                      <Link passHref href={(`/project/edit/${projObj.id}`)}>
                        <Button className="heading btn-outline-dark hov" style={{ marginRight: '10px', backgroundColor: '#6D818F' }} type="click" variant="primary">Update</Button>
                      </Link>
                      <Button className="heading btn-outline-dark btnRed hov" type="click" variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                  ) : null}
                </Col>

              </Row>
              {/* <Row>
                <Col>
                </Col>
              </Row> */}
            </Card.Body>
          </Card>
        </Container>
      </Link>
    </div>
  );
}

ProjectCard.propTypes = {
  projObj: PropTypes.shape({
    id: PropTypes.number,
    customer: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    producer: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    title: PropTypes.string,
    services: PropTypes.shape([{
      name: PropTypes.string,
    }]),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    complete: PropTypes.bool,
    key: PropTypes.string,
    bpm: PropTypes.number,
    notes: PropTypes.string,
    lyric: PropTypes.string,
    worktape: PropTypes.string,
    paymentType: PropTypes.string,
    total: PropTypes.number,
  }).isRequired,
};
