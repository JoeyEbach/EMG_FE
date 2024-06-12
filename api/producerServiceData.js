import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get producer's producer services
const getProducersServices = (producerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producer_services/${producerId}`, {
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

// get single producer service
const singleProducerService = (psId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producer_services/single/${psId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// create producer service
const createProducerService = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producer_services/new`, {
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

// remove producer service
const removeProducerService = (producerServiceId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/producer_services/remove/${producerServiceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProducersServices,
  createProducerService,
  removeProducerService,
  singleProducerService,
};
