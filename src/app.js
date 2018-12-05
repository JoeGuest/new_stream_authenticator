import express from 'express';
import authenticated from './authenticated';

const app = express();

const successfulResponse = (res, userId) => {
  res.status(200).send({
    authenticated: true,
    userId,
  });
};

const unsuccessfulResponse = (res, userId, message) => {
  res.status(401).send({
    authenticated: false,
    userId,
    message,
  });
};

app.get('/authenticate/:userId', async (req, res) => {
  const { params: { userId } } = req;

  try {
    await authenticated(userId);
    successfulResponse(res, userId);
  } catch (error) {
    unsuccessfulResponse(res, userId, error.message);
  }
});

export default app;
