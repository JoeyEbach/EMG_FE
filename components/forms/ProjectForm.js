import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Col, Container, FloatingLabel, Image, Row,
} from 'react-bootstrap';
import { createProject, updateProject } from '../../api/projectData';
import { useAuth } from '../../utils/context/authContext';
import { getProducersServices, singleProducerService } from '../../api/producerServiceData';
import getKeys from '../../api/keyData';
import getPaymentTypes from '../../api/paymentTypeData';
import { getSingleProducer } from '../../api/userData';

const initialState = {
  title: '',
  keyId: -1,
  bpm: 0,
  notes: '',
  lyric: '',
  worktape: '',
  paymentTypeId: -1,
};

export default function ProjectForm({ projObj, producerId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [serviceIds, setServiceIds] = useState([]);
  const [producerServices, setProducerServices] = useState([]);
  const [producer, setProducer] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [keys, setKeys] = useState([]);
  const [payTypes, setPayTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: name === 'keyId' || name === 'bpm' || name === 'paymentTypeId' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formInput.producerId = producerId;
    formInput.customerId = user.id;
    const payload = { ...formInput, producerServiceIds: serviceIds };

    if (projObj.id) {
      updateProject(payload, projObj.id)?.then(() => router.push('/my-projects'));
    } else {
      createProject(payload)?.then(() => router.push('/my-projects'));
    }
  };

  const getServices = () => {
    if (producerId) {
      getProducersServices(producerId)?.then((ps) => {
        setProducerServices(ps);
        if (projObj.id) {
          const projectServiceIds = projObj.producerServices.map((service) => service.id);
          setServiceIds(projectServiceIds);
        }
      });
    }
  };

  const getProducer = () => {
    if (producerId) {
      getSingleProducer(producerId)?.then(setProducer);
    }
  };

  const orderTotal = async () => {
    let total = 0;
    const getTheServices = await Promise.all(serviceIds?.map(async (x) => (singleProducerService(x))));
    getTheServices.forEach((s) => {
      total += s.price;
    });

    setTotalPrice(total);
  };

  const dropDowns = () => {
    getKeys()?.then(setKeys);
    getPaymentTypes()?.then(setPayTypes);
  };

  const serviceChecked = (id) => serviceIds.includes(id);

  useEffect(() => {
    if (projObj.id) {
      setFormInput(projObj);
    } else {
      setFormInput(initialState);
    }
    dropDowns();
  }, [projObj]);

  useEffect(() => {
    getServices();
    getProducer();
  }, [producerId]);

  useEffect(() => {
    orderTotal();
  }, [serviceIds]);

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <h5 className="heading formHead" style={{ marginLeft: '110px' }}>Create Your New Project</h5>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="title">
                <FloatingLabel className="info labelFloats">Title</FloatingLabel>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  className="formWidth center"
                  name="title"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <FloatingLabel className="info labelFloats">Key</FloatingLabel>
              <Form.Select
                aria-label="key"
                name="keyId"
                value={formInput.keyId}
                onChange={handleChange}
                className="formWidth center"
                required
              >
                <option>Choose A Key</option>
                {keys?.map((k) => (
                  <option key={k.id} value={k.id}>{k.name}</option>

                ))}
              </Form.Select>

              <Form.Group style={{ marginTop: '15px' }} className="mb-3" controlId="bpm">
                <FloatingLabel className="info labelFloats">BPM</FloatingLabel>
                <Form.Control
                  type="number"
                  placeholder="BPM"
                  name="bpm"
                  className="formWidth center"
                  value={formInput.bpm}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="worktape">
                <FloatingLabel className="info labelFloats">Worktape</FloatingLabel>
                <Form.Control
                  type="text"
                  placeholder="Worktape"
                  name="worktape"
                  className="formWidth center"
                  value={formInput.worktape}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lyric">
                <FloatingLabel className="info labelFloats">Lyric</FloatingLabel>
                <Form.Control
                  as="textarea"
                  placeholder="Lyric"
                  name="lyric"
                  className="formWidth center"
                  value={formInput.lyric}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="notes">
                <FloatingLabel className="info labelFloats">Notes</FloatingLabel>
                <Form.Control
                  as="textarea"
                  placeholder="Notes"
                  name="notes"
                  className="formWidth center"
                  value={formInput.notes}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Container>
                <Row>
                  <Col xs={4}>
                    <h4 className="heading">Your producer is:</h4>
                    <p className="colorFont" style={{ fontSize: '30px' }}>{producer.name}</p>
                  </Col>
                  <Col>
                    {producer ? (
                      <>
                        <Image src={producer.image} alt={producer.name} roundedCircle style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Container>

              {producerServices.map((ps) => (
                <Form.Check
                  key={ps.id}
                  type="checkbox"
                  className="info2"
                  label={`${ps.service} - $${ps.price}`}
                  name="serviceId"
                  checked={serviceChecked(ps.id)}
                  onChange={() => {
                    const thisService = ps.id;
                    if (serviceIds.includes(thisService)) {
                      const newArray = serviceIds.filter((x) => x !== thisService);
                      setServiceIds(newArray);
                    } else {
                      setServiceIds((prev) => [...prev, thisService]);
                    }
                  }}
                />
              ))}
              <Form.Select
                aria-label="payType"
                name="paymentTypeId"
                value={formInput.paymentTypeId}
                onChange={handleChange}
                className="formWidth"
                style={{ marginTop: '20px' }}
                required
              >
                <option>Choose A Payment Type</option>
                {payTypes?.map((p) => (
                  <option key={p.id} value={p.id}>{p.type}</option>

                ))}
              </Form.Select>
              <h3 className="heading" style={{ marginTop: '20px' }}>Order Total: ${totalPrice}</h3>

              <Button className="btn-outline-dark btnRed heading" style={{ width: '400px', marginTop: '20px', color: 'white' }} type="submit">
                {projObj.id ? 'Update Order' : 'Place Order'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

ProjectForm.propTypes = {
  projObj: PropTypes.shape({
    id: PropTypes.number,
    customerId: PropTypes.number,
    title: PropTypes.string,
    producerId: PropTypes.number,
    producerServiceIds: PropTypes.arrayOf(PropTypes.number),
    producerServices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      price: PropTypes.number,
      producerId: PropTypes.number,
      serviceId: PropTypes.number,
    })),
    keyId: PropTypes.number,
    bpm: PropTypes.number,
    notes: PropTypes.string,
    lyric: PropTypes.string,
    worktape: PropTypes.string,
    paymentTypeId: PropTypes.number,
  }),
  producerId: PropTypes.number.isRequired,
};

ProjectForm.defaultProps = {
  projObj: initialState,
};
