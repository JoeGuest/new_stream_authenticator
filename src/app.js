import express from 'express';
import authenticationService from './services/authenticationService';

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
    await authenticationService(userId);
    successfulResponse(res, userId);
  } catch (error) {
    unsuccessfulResponse(res, userId, error.message);
  }
});

export default app;
