import { Request, Response } from 'express';
import express from 'express';

import bodyParser from 'body-parser';
import helloController from '../controllers/hello';
import { Controller } from '../lib/Controller';
import { RemoteController } from '../lib/RemoteController';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async (req: Request, res: Response) => {
  console.log(`(http server) Got message from client: ${req.body.message}`);
  const controller = new Controller(helloController);
  const remoteController = new RemoteController({
    protocol: 'grpc',
    host: '0.0.0.0:9090',
    controller: 'sayHello',
  });

  controller
    .setNext(remoteController);

  const response = await controller.handle({
    data: {
      message: req.body.message,
    },
    metaData: {
      serverId: '1',
      serverName: 'HTTP Server',
    },
  });
  console.log(
    `(http server) Got value from helloController: ${JSON.stringify(response)}`
  );
  res.send(response);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running at port: %d', PORT);
});
