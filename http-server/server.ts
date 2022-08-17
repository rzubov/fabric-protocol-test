import { Request, Response } from 'express';
import express from 'express';

import bodyParser from 'body-parser';
import helloController from '../controllers/hello';
import { Controller } from '../lib/Controller';
import { RemoteController } from '../lib/RemoteController';
import authController from '../controllers/auth';
import afterAuth from '../controllers/afterAuth';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async (req: Request, res: Response) => {
  console.log(`(http server) Got message from client: ${req.body.message}`);
  /*TODO: try to use both function and object and have single controller */
  const controller = new Controller(helloController);
  const remoteController = new RemoteController({
    protocol: 'grpc',
    host: '0.0.0.0:9090',
    controller: 'sayHello',
  });

  controller.setNext(remoteController);

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

app.post('/auth', async (req: Request, res: Response) => {
  console.log(
    `(http server) Got auth request from client: ${req.body.message}`
  );
  const controller = new Controller(authController);

  const remoteGoogleAuthController = new RemoteController({
    protocol: 'http',
    host: '0.0.0.0:8081',
    controller: 'auth',
    method: 'POST',
  });

  const remoteOktaAuthController = new RemoteController({
    protocol: 'http',
    host: '0.0.0.0:8082',
    controller: 'auth',
    method: 'POST',
  });

  const afterAuthController = new Controller(afterAuth);

  controller
    .setNextGroup([remoteGoogleAuthController, remoteOktaAuthController])
    .setNext(afterAuthController);

  const response = await controller.handle({
    data: {
      sessionId: req.body.sessionId,
    },
    metaData: {},
  });
  console.log(
    `(http server) Got value from helloController: ${JSON.stringify(response)}`
  );

  res.send({
    message: response,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server running at port: %d', PORT);
});
