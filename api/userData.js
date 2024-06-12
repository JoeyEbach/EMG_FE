import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get all producers
const getProducers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/producers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// get single producer
const getSingleProducer = (producerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producers/${producerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// get producers by serviceId
const serviceProducers = (serviceId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producers/service/${serviceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// get single user
const singleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// create user
const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// update user
const updateUser = (payload, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProducers,
  singleUser,
  createUser,
  updateUser,
  serviceProducers,
  getSingleProducer,
};
