import express from 'express';
import authenticated from './authenticated';

const app = express();

const successfulResponse = (res, userId) => {
  res.status(200).send({
    authenticated: true,
    userId,
  });
};

const unsuccessfulResponse = (res, userId) => {
  res.status(401).send({
    authenticated: false,
    userId,
    message: 'max_stream_limit_reached',
  });
};

app.get('/authenticate/:userId', (req, res) => {
  try {
    authenticated(req.params.userId);
    successfulResponse(res, req.params.userId);
  } catch (error) {
    unsuccessfulResponse(res, req.params.userId);
  }
});

export default app;
