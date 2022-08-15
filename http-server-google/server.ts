import { Request, Response } from 'express';
import express from 'express';

import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/auth', async (req: Request, res: Response) => {
  console.log(`(http server google) Got message: ${req.body}`);

  res.send({
    authenticated: true,
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Server running at port: %d', PORT);
});
