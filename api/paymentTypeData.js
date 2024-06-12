import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;

//get payment types
const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/payment-types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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
  .catch(reject)
});

export default getPaymentTypes;
