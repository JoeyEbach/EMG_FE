import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get all services
const getServices = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/services`, {
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

export default getServices;
