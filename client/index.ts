import axios from 'axios';

(async () => {
  const response = await axios.post('http://localhost:8080', {
    message: 'Hello from client',
  });
  const { sessionId } = response.data;
  console.log(
    `(client) Got message from the server: ${JSON.stringify(response.data)}`
  );


  const authResponse = await axios.post('http://localhost:8080/auth', {
    sessionId,
  });

  console.log(
    `(client) Got message from the auth: ${JSON.stringify(authResponse.data)}`
  );

  const chainResponse = await axios.post('http://localhost:8080/chain', {});

  console.log(
    `(client) Got message from the auth: ${JSON.stringify(chainResponse.data)}`
  );
})();
