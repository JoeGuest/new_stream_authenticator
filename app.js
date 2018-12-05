import express from 'express';

const app = express();

app.get('/authenticate', (req, res) => {
  res.status(200).send({
    authenticated: true,
  });
});

export default app;
