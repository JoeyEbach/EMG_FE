import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { createUser, updateUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  phone: '',
  email: '',
  image: '',
  isProducer: false,
  uid: '',
};

function RegisterForm({ userObj }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.uid = user.uid;

    if (userObj.id) {
      updateUser(formData, userObj.id)?.then(() => router.push('/profile'));
    } else {
      createUser(formData)?.then(() => router.push('/profile'));
    }
  };

  useEffect(() => {
    if (userObj.id) {
      setFormData(userObj);
    } else {
      setFormData(initialState);
    }
  }, [userObj]);

  return (
    <Form onSubmit={handleSubmit}>
      {userObj.id ? <h1 className="regHead center">Update Your Account</h1> : <h1 className="regHead center">Create An Account</h1>}
      <Form.Group className="mb-3" controlId="name">
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          className="formWidth center"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Control
          type="text"
          placeholder="Phone Number"
          className="formWidth center"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          type="text"
          placeholder="Email"
          className="formWidth center"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Control
          type="text"
          placeholder="Image Url"
          className="formWidth center"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="switch"
          label="Are you a producer offering services?"
          className="heading center"
          name="isProducer"
          checked={formData.isProducer}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              isProducer: e.target.checked,
            }));
          }}
        />
      </Form.Group>

      <Button className="btn-outline-dark btnBlue heading center submit submitHov" type="submit">
        {userObj.id ? 'Update Account' : 'Create Account'}
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    isProducer: PropTypes.bool,
  }),
};

RegisterForm.defaultProps = {
  userObj: initialState,
};

export default RegisterForm;
