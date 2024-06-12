import React, { useEffect, useState } from 'react';
import {
  Button, Image, Form, Container,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../utils/context/authContext';
import { singleUser } from '../api/userData';
import { createProducerService, getProducersServices } from '../api/producerServiceData';
import ProducerServiceCard from '../components/cards/ProducerServiceCard';
import getServices from '../api/serviceData';

export default function Profile() {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ producerId: user.id, serviceId: -1, price: 0 });
  const [currentUser, setCurrentUser] = useState({});
  const [services, setServices] = useState(null);
  const [dropDown, setDropDown] = useState([]);
  const [show, setShow] = useState(false);
  document.querySelector('body').setAttribute('data-theme', 'site');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProducerService(formInput);
    setShow(false);
  };

  const servicesFilter = async () => {
    if (services !== null) {
      const allServices = await getServices();
      const filtered = await allServices.filter((as) => !services.some((s) => s.serviceId === as.id));
      setDropDown(filtered);
    }
  };

  useEffect(() => {
    singleUser(user.uid)?.then((u) => {
      setCurrentUser(u);
      getProducersServices(u.id)?.then(setServices);
    });
  }, [user, services]);

  useEffect(() => {
    servicesFilter();
  }, [services]);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={4}>
            <Image className="profile picBorder" src={currentUser.image} roundedCircle alt={currentUser.name} style={{ width: '180px', height: '170px', objectFit: 'cover' }} />
            <div className="profile">
              <h1 style={{ color: '#827026' }}>{currentUser.name}</h1>
              <h4>{currentUser.phone}</h4>
              <h4>{currentUser.email}</h4>
              <Link passHref href={`user/edit/${currentUser.id}`}>
                <Button className="btn-outline-dark hov2" style={{ backgroundColor: '#AB9C92' }}>Update Profile</Button>
              </Link>
            </div>
          </Col>

          <Col>
            {currentUser.isProducer && services !== null ? (
              <>
                <div>
                  <h5 className="myServices">My Services:</h5>
                  <Button className="btn-outline-dark heading hov2" style={{ backgroundColor: '#AB9C92' }} onClick={handleShow}>
                    Add A Service
                  </Button>

                  <Modal style={{ backgroundColor: 'black', color: 'white' }} show={show} onHide={handleClose}>
                    <Form onSubmit={handleSubmit}>
                      <Modal.Header closeButton>
                        <Modal.Title className="heading modalFloats">Add A Service</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <FloatingLabel className="info modalFloats">Service</FloatingLabel>
                        <Form.Select
                          aria-label="services"
                          name="serviceId"
                          className="modalFloats"
                          value={formInput.serviceId}
                          onChange={handleChange}
                          required
                        >
                          <option>Choose A Service</option>
                          {dropDown?.map((d) => (
                            <option value={d.id}>{d.name}</option>
                          ))}
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="price">
                          <FloatingLabel className="info modalFloats">Price</FloatingLabel>
                          <Form.Control
                            type="number"
                            placeholder="Price"
                            className="modalFloats"
                            name="price"
                            value={formInput.price}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn-outline-dark btnBlue heading hov2" type="submit">
                          Create Service
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </div>
                <div className="servicesCards">
                  {services.map((s) => (<ProducerServiceCard serviceObj={s} />))}
                </div>
              </>
            ) : null }
          </Col>
        </Row>
      </Container>
    </div>
  );
}
