import { Request, Response } from 'express';
import express from 'express';

import bodyParser from 'body-parser';
import { Controller } from '../lib/Controller';
import chainEnd from '../controllers/chainEnd';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/auth', async (req: Request, res: Response) => {
  console.log(`(http server okta) Got message: ${req.body}`);

  res.send({
    authenticated: false,
  });
});

app.post('/chain', async (req: Request, res: Response) => {
  const controller = new Controller(chainEnd);
  res.send(await controller.handle({ data: {}, metaData: {} }));
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log('Server running at port: %d', PORT);
});
