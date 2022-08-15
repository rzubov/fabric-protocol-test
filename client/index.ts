import axios from 'axios';

(async () => {
  const response = await axios.post('http://localhost:8080', {
    message: 'Hello from client',
  });

  console.log(
    `(client) Got message from the server: ${JSON.stringify(response.data)}`
  );

  const authResponse = await axios.post('http://localhost:8080/auth', {
  });

  console.log(
    `(client) Got message from the auth: ${JSON.stringify(authResponse.data)}`
  );
})();
