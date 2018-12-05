import express from 'express';

const app = express();

app.get('/authenticate/:userId', (req, res) => {
  res.status(200).send({
    authenticated: true,
  });
});

export default app;
