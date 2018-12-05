import express from 'express';

const app = express();

app.get('/authenticate/:userId', (req, res) => {
  const authenticated = userId => (userId === '12345');

  res.status(200).send({
    authenticated: authenticated(req.params.userId),
    userId: req.params.userId,
  });
});

export default app;
