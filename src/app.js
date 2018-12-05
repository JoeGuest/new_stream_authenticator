import express from 'express';
import authenticated from './authenticated';

const app = express();

app.get('/authenticate/:userId', (req, res) => {
  const userAuthenticated = authenticated(req.params.userId);

  res.status(200).send({
    authenticated: userAuthenticated,
    userId: req.params.userId,
  });
});

export default app;
