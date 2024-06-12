import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get keys
const getKeys = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/keys`, {
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

export default getKeys;
