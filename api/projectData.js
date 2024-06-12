import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get producer's projects
const producerProjects = (producerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/producer/${producerId}`, {
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

// get customer's projects
const customerProjects = (customerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/customer/${customerId}`, {
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

// get single project
const singleProject = (projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// create project
const createProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/new`, {
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

// update project
const updateProject = (payload, projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/update/${projectId}`, {
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

// delete project
const deleteProject = (projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/delete/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// close project
const closeProject = (projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${projectId}/complete`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  producerProjects,
  customerProjects,
  singleProject,
  createProject,
  updateProject,
  deleteProject,
  closeProject,
};
