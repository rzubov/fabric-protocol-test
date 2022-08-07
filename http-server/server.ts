import { Request, Response } from 'express';
import express from 'express';

import grpcClient from './grpc-client';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async (req: Request, res: Response) => {
  console.log(`(http server) Got message from client: ${req.body.message}`);
  const response = await grpcClient.sayHello(req.body.message);
  console.log(
    `(http server) Got message from GRPC server: ${JSON.stringify(response)}`
  );
  res.send({
    serverId: '1',
    serverName: 'HTTP Server',
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running at port: %d', PORT);
});
